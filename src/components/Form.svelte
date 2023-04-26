<script lang="ts">
  import { enhance } from '$app/forms'
  import { setScreenshot, setStatus, store } from '../stores'

  import FormButton from './FormButton.svelte'
  import FormField from './FormField.svelte'
  import FormGroup from './FormGroup.svelte'
</script>

<form
  class="form card"
  method="post"
  use:enhance={() => {
    setStatus('generating')
    setScreenshot(null)

    return ({ result }) => {
      setStatus(result.type)
      if (result.type === 'success') setScreenshot(result.data?.screenshot)
    }
  }}
>
  <FormGroup id="targetUrl" label="Site URL" width="full">
    <FormField
      id="targetProtocol"
      type="select"
      label="Target protocol"
      options={[
        { label: 'http://', value: 'http' },
        { label: 'https://', value: 'https' },
      ]}
    />
    <FormField id="targetUrl" label="Target URL" placeholder="example.com" />
  </FormGroup>
  <FormField id="fileWidth" type="number" label="Width (in pixels)" min={0} />
  <FormField id="fileHeight" type="number" label="Height (in pixels)" min={0} />
  <FormField id="fullPage" type="checkbox" label="Full page" width="full" />
  <FormField
    id="fileType"
    type="select"
    label="Format"
    options={[
      { label: 'JPG', value: 'jpeg' },
      { label: 'PNG', value: 'png' },
      { label: 'WEBP', value: 'webp' },
    ]}
  />
  <FormField id="fileQuality" type="number" label="Quality" min={0} max={100} />
  <FormField
    id="captureDelay"
    type="number"
    label="Delay before capture (in seconds)"
    min={0}
    max={120}
    width="full"
  />
  <FormButton type="submit" width="full" isDisabled={$store.status === 'generating'}>
    Capture
  </FormButton>
</form>

<style lang="scss">
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
