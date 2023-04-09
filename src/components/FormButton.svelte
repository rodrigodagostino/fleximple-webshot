<script lang="ts">
  export let type: 'button' | 'submit' = 'button'
  export let width: 'auto' | 'full' = 'auto'
  export let isDisabled = false
</script>

<button {type} class="form-button" class:full-width={width === 'full'} disabled={isDisabled}>
  <slot />
</button>

<style lang="scss">
  .form-button {
    width: 100%;
    background-color: var(--gray-800);
    border-color: var(--gray-800);
    border-radius: 0.25rem;
    outline: none;
    font-family: var(--font-main);
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--white);
    text-transform: uppercase;
    transition: background-color 0.24s, border 0.24s, opacity 0.24s;

    &.full-width {
      grid-column: 1/-1;
    }

    &:focus:not(:disabled),
    &:hover:not(:disabled) {
      background-color: var(--indigo-500);
      border-color: var(--indigo-500);
    }

    &:focus:not(:disabled) {
      outline: 0.25rem solid var(--indigo-200);
    }

    &:active:not(:disabled) {
      background-color: var(--indigo-600);
      border-color: var(--indigo-600);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
</style>
