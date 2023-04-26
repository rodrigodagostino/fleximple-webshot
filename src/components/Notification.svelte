<script lang="ts">
  import type { IStore } from '../stores'
  import { fly, fade } from 'svelte/transition'

  export let status: IStore['status'] = 'idle'
</script>

{#if status === 'generating'}
  <div
    class="notification notification--{status}"
    in:fly={{ y: 32, duration: 400, delay: 400 }}
    out:fade={{ duration: 400 }}
  >
    <svg viewBox="0 0 512 512" class="notification__icon" aria-hidden="true">
      <path
        fill="currentColor"
        d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
      />
    </svg>
    <span>Generating screenshot…</span>
  </div>
{/if}
{#if status === 'success'}
  <div
    class="notification notification--{status}"
    in:fly={{ y: 32, duration: 400, delay: 400 }}
    out:fade={{ duration: 400 }}
  >
    <svg viewBox="0 0 512 512" class="notification__icon" aria-hidden="true">
      <path
        fill="currentColor"
        d="m173.898 439.404-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
      />
    </svg>
    <span>Screenshot generated successfully.</span>
  </div>
{/if}
{#if status === 'error' || status === 'failure'}
  <div
    class="notification notification--{status}"
    in:fly={{ y: 32, duration: 400, delay: 400 }}
    out:fade={{ duration: 400 }}
  >
    <svg viewBox="0 0 352 512" class="notification__icon" aria-hidden="true">
      <path
        fill="currentColor"
        d="m242.72 256 100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
      />
    </svg>
    <span>An error ocurred while generating the screenshot.</span>
  </div>
{/if}

<style lang="scss">
  .notification {
    grid-column: 1/-1;
    grid-row: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    padding: 1rem;
    box-shadow: var(--box-shadow-2);

    &__icon {
      width: auto;
      height: 1rem;
      margin-right: 0.75rem;
    }

    &--generating {
      color: var(--sky-800);
      background-color: var(--sky-100);

      .notification__icon {
        animation: rotate 1.2s linear infinite;
      }
    }

    &--success {
      color: var(--green-800);
      background-color: var(--green-100);
    }

    &--error,
    &--failure {
      color: var(--red-800);
      background-color: var(--red-100);
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
