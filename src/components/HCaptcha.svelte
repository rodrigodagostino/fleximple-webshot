<script lang="ts">
  import { PUBLIC_HCAPTCHA_SITE_KEY } from '$env/static/public'
  import { setIsVerified } from '../stores'

  const hCaptchaAction = (node: HTMLDivElement) => {
    hcaptcha = window.hcaptcha
    if (hcaptcha.render) {
      hcaptcha.render('h-captcha', {
        sitekey: PUBLIC_HCAPTCHA_SITE_KEY,
        callback: () => setIsVerified(true),
      })
    }

    return {
      destroy() {
        hcaptcha.remove()
      },
    }
  }
</script>

<svelte:head>
  <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<div id="h-captcha" class="h-captcha" use:hCaptchaAction />

<style lang="scss">
  .h-captcha {
    grid-column: 1/-1;
    justify-self: center;
  }
</style>
