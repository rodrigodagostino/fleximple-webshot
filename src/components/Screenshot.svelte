<script lang="ts">
  import { store } from '../stores/index'
  import { fly, fade } from 'svelte/transition'

  const currentDate = new Date()
  const formattedDate =
    currentDate.getFullYear() +
    '-' +
    String(currentDate.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(currentDate.getDate()).padStart(2, '0') +
    '-at-' +
    String(currentDate.getHours()).padStart(2, '0') +
    '-' +
    String(currentDate.getMinutes()).padStart(2, '0') +
    '-' +
    String(currentDate.getSeconds()).padStart(2, '0')
  const fileName = `screenshot_${formattedDate}_${$store.settings.targetUrl}.${
    $store.settings.fileType === 'jpeg' ? 'jpg' : $store.settings.fileType
  }`
  const screenshotDataUri = $store.screenshot
    ? `data:image/${$store.settings.fileType};base64,${$store.screenshot}`
    : null
</script>

<div
  class="screenshot card"
  in:fly|local={{ y: 32, duration: 320 }}
  out:fade|local={{ duration: 320 }}
>
  <a href={screenshotDataUri} download={fileName}>
    <img
      src={screenshotDataUri}
      width={$store.settings.fileWidth}
      height={$store.settings.fileHeight}
      alt="Screenshot taken from {$store.settings.targetUrl}"
    />
  </a>
</div>
