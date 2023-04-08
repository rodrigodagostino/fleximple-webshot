import puppeteer from 'puppeteer'

import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST = (async ({ request }) => {
  const {
    targetProtocol,
    targetUrl,
    fileWidth,
    fileHeight,
    fullPage,
    fileType,
    fileQuality,
    captureDelay,
  } = await request.json()

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
    width: parseInt(fileWidth),
    height: parseInt(fileHeight),
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
  await page.waitForTimeout(captureDelay * 1000)

  // Take a screenshot
  const screenshot = await page.screenshot({
    type: fileType,
    ...(fileType === 'jpeg' || fileType === 'webp' ? { quality: parseInt(fileQuality) } : null),
    fullPage: fullPage,
    encoding: 'base64',
  })

  // Close browser
  await browser.close()

  return json({
    success: true,
    screenshot,
  })
}) satisfies RequestHandler
