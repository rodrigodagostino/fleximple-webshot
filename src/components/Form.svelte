<script lang="ts">
  import { camelCase } from 'lodash'
  import { setFileName, setSetting, setStatus, store, type ISettings } from '../stores'

  const handleOnChange = ({ target }: Event) => {
    if (target) {
      const setting = camelCase(
        (target as HTMLInputElement | HTMLSelectElement).name
      ) as keyof ISettings
      const value =
        (target as HTMLInputElement | HTMLSelectElement).type === 'checkbox'
          ? (target as HTMLInputElement).checked
          : (target as HTMLInputElement | HTMLSelectElement).value

      setSetting(setting, value)
    }
  }
</script>

<form class="form card">
  <div class="form-control full-width">
    <label for="target-url" class="form-label">Site URL</label>
    <div class="form-field-group">
      <select
        id="target-protocol"
        name="target-protocol"
        class="form-field"
        value={$store.settings.targetProtocol}
        on:change={handleOnChange}
      >
        <option value="http">http://</option>
        <option value="https">https://</option>
      </select>
      <input
        id="target-url"
        type="text"
        name="target-url"
        class="form-field"
        placeholder="example.com"
        bind:value={$store.settings.targetUrl}
        on:change={handleOnChange}
        required
      />
    </div>
  </div>
  <div class="form-control">
    <label for="file-width" class="form-label">Width (in pixels)</label>
    <input
      id="file-width"
      type="number"
      name="file-width"
      class="form-field"
      value={$store.settings.fileWidth}
      on:change={handleOnChange}
    />
  </div>
  <div class="form-control">
    <label for="file-height" class="form-label">Height (in pixels)</label>
    <input
      id="file-height"
      type="number"
      name="file-height"
      class="form-field"
      disabled={$store.settings.fullPage}
      value={$store.settings.fileHeight}
      on:change={handleOnChange}
    />
  </div>
  <div class="form-control full-width">
    <input
      id="full-page"
      type="checkbox"
      name="full-page"
      class="form-field"
      checked={$store.settings.fullPage}
      on:change={handleOnChange}
    />
    <label for="full-page" class="form-label">Full page</label>
  </div>
  <div class="form-control">
    <label for="file-type" class="form-label">Format</label>
    <select
      id="file-type"
      name="file-type"
      class="form-field"
      value={$store.settings.fileType}
      on:change={handleOnChange}
    >
      <option value="jpeg">JPG</option>
      <option value="png">PNG</option>
      <option value="webp">WEBP</option>
    </select>
  </div>
  <div class="form-control">
    <label for="file-quality" class="form-label">Quality</label>
    <input
      id="file-quality"
      type="number"
      name="file-quality"
      class="form-field"
      value={$store.settings.fileQuality}
      on:change={handleOnChange}
    />
  </div>
  <div class="form-control full-width">
    <label for="capture-delay" class="form-label">Delay before capture (in seconds)</label>
    <input
      id="capture-delay"
      type="number"
      name="capture-delay"
      class="form-field"
      value={$store.settings.captureDelay}
      on:change={handleOnChange}
    />
  </div>
  <div class="form-control full-width">
    <button type="submit" class="form-button">Capture</button>
  </div>
</form>

<style lang="scss">
  .form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-control {
    &.full-width {
      grid-column: 1/-1;
    }

    &.align-center {
      justify-self: center;
    }

    .form-label {
      display: inline-block;
      font-size: 0.875rem;

      & + .form-field,
      & + .form-field-group {
        margin-top: 0.25rem;
      }
    }

    .form-field:not([type='checkbox']) {
      border: 1px solid var(--gray-200);
      border-radius: 0.25rem;
      width: 100%;
      height: 2.25rem;
      padding: 0.25rem 0.5rem;
      outline: none;
      transition: color 0.24s ease, background-color 0.24s ease, border 0.24s ease;

      &::placeholder {
        color: var(--gray-400);
      }

      &:focus {
        border-color: var(--indigo-500);
        box-shadow: 0 0 0 0.25rem var(--indigo-200);
        z-index: 1;
      }

      &:disabled {
        color: var(--gray-400);
        background-color: var(--gray-100);
      }
    }

    .form-field-group {
      display: flex;

      .form-field {
        &:first-child {
          width: auto;
          margin-right: -1px;
          border-radius: 0.25rem 0 0 0.25rem;
        }

        &:last-child {
          flex: 1;
          border-radius: 0 0.25rem 0.25rem 0;
        }
      }
    }

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
      transition: background-color 0.24s ease, border 0.24s ease, opacity 0.24s ease;

      &:focus {
        box-shadow: 0 0 0 0.25rem var(--indigo-200);
      }

      &:focus:not(:disabled),
      &:hover:not(:disabled) {
        background-color: var(--indigo-500);
        border-color: var(--indigo-500);
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
  }
</style>
