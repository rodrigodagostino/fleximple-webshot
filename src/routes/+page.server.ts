import puppeteer from 'puppeteer'

import type { Actions } from './$types'
import type { ISettings } from '../stores'

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData()

    const targetProtocol = String(formData.get('targetProtocol')) as ISettings['targetProtocol']
    const targetUrl = String(formData.get('targetUrl'))
    const fileWidth = Number(formData.get('fileWidth'))
    const fileHeight = Number(formData.get('fileHeight'))
    const fullPage = Boolean(formData.get('fullPage'))
    const fileType = String(formData.get('fileType')) as ISettings['fileType']
    const fileQuality = Number(formData.get('fileQuality'))
    const captureDelay = Number(formData.get('captureDelay'))

    // Start browser.
    const browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ['--disable--extensions'],
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    // Open page.
    const page = await browser.newPage()
    await page.goto(`${targetProtocol}://${targetUrl}`, { waitUntil: 'load', timeout: 0 })
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

    // Execute delay (and transform the delay value to milliseconds).
    await new Promise((res) => setTimeout(res, captureDelay * 1000))

    // Take the screenshot.
    const screenshot = await page.screenshot({
      encoding: 'base64',
      fullPage: fullPage,
      ...(fileType === 'jpeg' || fileType === 'webp' ? { quality: fileQuality } : null),
      type: fileType,
    })

    // Close browser.
    await browser.close()

    return {
      success: true,
      data: {
        settings: {
          targetProtocol,
          targetUrl,
          fileWidth,
          fileHeight,
          fullPage,
          fileType,
          fileQuality,
          captureDelay,
        },
        screenshot,
      },
    }
  },
}
