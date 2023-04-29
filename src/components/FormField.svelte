<script lang="ts">
  import { camelCase, debounce } from 'lodash'
  import { setSetting, type ISettings, store } from '../stores'

  export let id: keyof ISettings
  export let type: 'text' | 'number' | 'checkbox' | 'select' = 'text'
  export let label: string
  export let placeholder: string | null = null
  export let min: number | null = null
  export let max: number | null = null
  export let options: { label: string; value: string }[] | undefined = undefined
  export let width: 'auto' | 'full' = 'auto'

  const handleOnChange = (event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement
      const setting = camelCase(target.name) as keyof ISettings
      const value = target.type === 'checkbox' ? target.checked : target.value

      setSetting(setting, value)
    }
  }
</script>

<div class="form-field" class:full-width={width === 'full'}>
  {#if type === 'text'}
    <label for={id} class="form-field__label">{label}</label>
    <input
      {id}
      {type}
      name={id}
      class="form-field__input"
      {placeholder}
      {min}
      value={$store.settings[id]}
      on:change={debounce(handleOnChange, 400)}
    />
  {:else if type === 'number'}
    <label for={id} class="form-field__label">{label}</label>
    <input
      {id}
      {type}
      name={id}
      class="form-field__input"
      {placeholder}
      {min}
      {max}
      value={$store.settings[id]}
      on:change={debounce(handleOnChange, 400)}
    />
  {:else if type === 'select'}
    <label for={id} class="form-field__label">{label}</label>
    <select {id} name={id} class="form-field__select" on:change={debounce(handleOnChange, 400)}>
      {#if options}
        {#each options as { label, value }}
          <option {value} selected={value === $store.settings[id]}>{label}</option>
        {/each}
      {/if}
    </select>
  {:else if type === 'checkbox'}
    <input
      {id}
      {type}
      name={id}
      class="form-field__checkbox"
      checked={!!$store.settings[id]}
      on:change={debounce(handleOnChange, 400)}
    />
    <label for={id} class="form-field__label">{label}</label>
  {/if}
</div>

<style lang="scss">
  .form-field {
    &.full-width {
      grid-column: 1/-1;
    }

    &.align-center {
      justify-self: center;
    }

    .form-field__label {
      display: inline-block;
      font-size: 0.875rem;

      & + .form-field__input,
      & + .form-field__select {
        margin-top: 0.25rem;
      }
    }

    .form-field__input,
    .form-field__select {
      border: 1px solid var(--gray-200);
      border-radius: 0.25rem;
      width: 100%;
      height: 2.25rem;
      padding: 0.25rem 0.5rem;
      outline: none;
      transition: color 0.24s, background-color 0.24s, border 0.24s;
      position: relative;

      &::placeholder {
        color: var(--gray-400);
      }

      &:focus {
        border-color: var(--indigo-500);
        outline: 0.25rem solid var(--indigo-200);
        z-index: 1;
      }

      &:disabled {
        color: var(--gray-400);
        background-color: var(--gray-100);
      }
    }
  }
</style>
