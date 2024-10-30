<script lang="ts">
	import type { ISettings } from '../stores';

	export let id: keyof ISettings;
	export let label: string;
	export let width: 'half' | 'full' = 'half';
</script>

<div class="form-group" class:full-width={width === 'full'}>
	<label for={id} class="form-group__label">{label}</label>
	<div class="form-group__fields">
		<slot />
	</div>
</div>

<style lang="scss">
	.form-group {
		&.full-width {
			grid-column: 1/-1;
		}

		&__label {
			display: inline-block;
			font-size: 0.875rem;
		}

		&__fields {
			display: flex;
		}

		:global(.form-field) {
			&:first-child {
				flex: 0 1 auto;
				margin-right: -1px;

				:global(.form-field__input),
				:global(.form-field__select) {
					border-radius: 0.25rem 0 0 0.25rem;
				}
			}

			&:last-child {
				flex: 1;

				:global(.form-field__input),
				:global(.form-field__select) {
					border-radius: 0 0.25rem 0.25rem 0;
				}
			}
		}

		:global(.form-field__label) {
			display: none !important;
		}
	}
</style>
