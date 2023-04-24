<script lang="ts">
  import { setScreenshot, setStatus } from '../stores'
  import FormButton from './FormButton.svelte'
  import FormField from './FormField.svelte'
  import FormGroup from './FormGroup.svelte'

  const requestScreenshot = async (event: Event) => {
    setStatus('generating')
    setScreenshot(null)

    const formEl = event.target as HTMLFormElement
    const data = new FormData(formEl)

    const response = await fetch(formEl.action, {
      method: 'POST',
      body: data,
    })
      .then((data) => {
        setStatus('success')
        return data.json()
      })
      .catch((error) => {
        setStatus('error')
        console.error('Error:', error)
      })

    if (response) setScreenshot(response.screenshot)
  }
</script>

<form class="form card" on:submit|preventDefault={requestScreenshot} action="/api/screenshot">
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
    <FormField id="targetUrl" label="Target URL" />
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
  <FormButton type="submit" width="full">Capture</FormButton>
</form>

<style lang="scss">
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
