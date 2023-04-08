<script>
  import { store } from '../stores/index'

  import Form from '../components/Form.svelte'
  import Notification from '../components/Notification.svelte'
  import Screenshot from '../components/Screenshot.svelte'
  import './styles.css'
</script>

<svelte:head>
  <title>Fleximple Webshot</title>
</svelte:head>

<div class="container">
  <header class="app-header">
    <p class="app-eyebrow">Fleximple</p>
    <h1 class="app-title">Webshot</h1>
  </header>
  <main class="app-main">
    <Form />
    {#if $store.status !== 'idle'}
      <Notification status={$store.status} />
    {/if}
    {#if $store.status === 'success' && $store.screenshot}
      <Screenshot />
    {/if}
  </main>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 30rem;
    margin: 10vh auto 5vh;
    padding: 1rem;
    position: relative;
  }

  .app-header {
    text-align: center;
    line-height: 1;
    text-transform: uppercase;
  }

  .app-eyebrow {
    font-family: var(--font-secondary);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .app-title {
    font-size: 3rem;
    font-weight: 700;
  }

  .app-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
</style>
