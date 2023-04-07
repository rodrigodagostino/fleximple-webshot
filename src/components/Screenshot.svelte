<script>
  import { store } from '../stores/index'
  import { fly, fade } from 'svelte/transition'

  $: fileUrl = `/screenshots/${$store.fileName}`
</script>

<div
  class="screenshot card"
  in:fly|local={{ y: 32, duration: 320 }}
  out:fade|local={{ duration: 320 }}
>
  <a href={fileUrl} target="_blank" download={$store.fileName}>
    <img
      src={fileUrl}
      width={$store.settings.fileWidth}
      height={$store.settings.fileHeight}
      alt="Screenshot taken from {$store.settings.targetUrl}"
    />
  </a>
</div>
