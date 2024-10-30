import puppeteer from 'puppeteer';

import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { ISettings } from '../stores';
import { HCAPTCHA_SECRET_KEY } from '$env/static/private';
import { PUBLIC_HCAPTCHA_SITE_KEY } from '$env/static/public';

export const load: PageServerLoad = ({ cookies }) => {
	const settings = cookies.get('webshotSettings');
	const parsedSettings: ISettings | undefined = settings && JSON.parse(settings);

	return {
		settings: parsedSettings,
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const targetProtocol = String(formData.get('targetProtocol')) as ISettings['targetProtocol'];
		const targetUrl = String(formData.get('targetUrl'));
		const fileWidth = Number(formData.get('fileWidth'));
		const fileHeight = Number(formData.get('fileHeight'));
		const fullPage = Boolean(formData.get('fullPage'));
		const fileType = String(formData.get('fileType')) as ISettings['fileType'];
		const fileQuality = Number(formData.get('fileQuality'));
		const captureDelay = Number(formData.get('captureDelay'));
		const hCaptchaResponse = String(formData.get('h-captcha-response'));

		/**
		 * Verify captcha.
		 */
		const hCaptchaVerifyBody = new URLSearchParams({
			response: hCaptchaResponse,
			secret: HCAPTCHA_SECRET_KEY,
			sitekey: PUBLIC_HCAPTCHA_SITE_KEY,
		}).toString();

		const hCaptchaVerifyResponse = await fetch('https://hcaptcha.com/siteverify', {
			method: 'POST',
			credentials: 'omit',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: hCaptchaVerifyBody,
		});

		const hCaptchaVerifyData = await hCaptchaVerifyResponse.json();

		if (!hCaptchaVerifyData.success) {
			throw error(400, 'There was an error during hCaptcha verification.');
		}

		/**
		 * Generate screenshot.
		 */
		const settings: ISettings = {
			targetProtocol,
			targetUrl,
			fileWidth,
			fileHeight,
			fullPage,
			fileType,
			fileQuality,
			captureDelay,
		};

		cookies.set('webshotSettings', JSON.stringify(settings), { path: '/' });

		// Start browser.
		const browser = await puppeteer.launch({
			headless: true,
			ignoreDefaultArgs: ['--disable--extensions'],
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});

		// Open page.
		const page = await browser.newPage();
		await page.goto(`${targetProtocol}://${targetUrl}`, { waitUntil: 'load', timeout: 0 });
		await page.setViewport({
			width: fileWidth,
			height: fileHeight,
		});
		if (fullPage) {
			await page.evaluate(() =>
				window.scrollTo({
					top: document.body.clientHeight,
					behavior: 'smooth',
				})
			);
		}

		// Execute delay (and transform the delay value to milliseconds).
		await new Promise((res) => setTimeout(res, captureDelay * 1000));

		// Take the screenshot.
		const screenshot = await page.screenshot({
			encoding: 'base64',
			fullPage: fullPage,
			...(fileType === 'jpeg' || fileType === 'webp' ? { quality: fileQuality } : null),
			type: fileType,
		});

		// Close browser.
		await browser.close();

		return {
			success: true,
			screenshot,
		};
	},
};
