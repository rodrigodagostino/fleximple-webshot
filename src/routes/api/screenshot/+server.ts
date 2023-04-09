import puppeteer from 'puppeteer'

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import type { ISettings } from '../../../stores'

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData()

  const targetProtocol = String(formData.get('targetProtocol'))
  const targetUrl = String(formData.get('targetUrl'))
  const fileWidth = Number(formData.get('fileWidth'))
  const fileHeight = Number(formData.get('fileHeight'))
  const fullPage = Boolean(formData.get('fullPage'))
  const fileType = String(formData.get('fileType')) as ISettings['fileType']
  const fileQuality = Number(formData.get('fileQuality'))
  const captureDelay = Number(formData.get('captureDelay'))

  // Start Browser
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable--extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  // Open page
  const page = await browser.newPage()
  await page.goto(`${targetProtocol}://${targetUrl}`, {
    waitUntil: 'networkidle0',
  })
  await page.setViewport({
    width: fileWidth,
    height: fileHeight,
  })
  if (fullPage) {
    await page.evaluate(() =>
      window.scrollTo({
        top: document.body.clientHeight,
        behavior: 'smooth',
      })
    )
  }
  // Convert value to milliseconds.
  await new Promise((r) => setTimeout(r, captureDelay * 1000))

  // Take a screenshot
  const screenshot = await page.screenshot({
    type: fileType,
    ...(fileType === 'jpeg' || fileType === 'webp' ? { quality: fileQuality } : null),
    fullPage: fullPage,
    encoding: 'base64',
  })

  // Close browser
  await browser.close()

  return json({
    success: true,
    screenshot,
  })
}
