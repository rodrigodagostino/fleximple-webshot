<script lang="ts">
	import { store } from '../stores/index';
	import { fly, fade } from 'svelte/transition';

	const currentDate = new Date();
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
		String(currentDate.getSeconds()).padStart(2, '0');
	const fileName = `screenshot_${formattedDate}_${$store.settings.targetUrl}.${
		$store.settings.fileType === 'jpeg' ? 'jpg' : $store.settings.fileType
	}`;
	const screenshotDataUri = $store.screenshot
		? `data:image/${$store.settings.fileType};base64,${$store.screenshot}`
		: null;
</script>

<a
	class="screenshot card"
	href={screenshotDataUri}
	download={fileName}
	in:fly={{ y: 32, duration: 400, delay: 400 }}
	out:fade={{ duration: 400 }}
>
	<div class="screenshot__overlay">
		<span class="button">Download</span>
	</div>
	<img
		src={screenshotDataUri}
		width={$store.settings.fileWidth}
		height={$store.settings.fileHeight}
		alt="Screenshot taken from {$store.settings.targetUrl}"
	/>
</a>

<style lang="scss">
	.screenshot {
		grid-column: 1/-1;
		grid-row: 3;
		position: relative;

		&:focus,
		&:hover {
			.screenshot__overlay {
				opacity: 1;
			}
		}

		&__overlay {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			padding: 2rem;
			position: absolute;
			top: 0;
			left: 0;
			background: repeating-linear-gradient(
				-45deg,
				rgba(35, 38, 59, 0.4),
				rgba(35, 38, 59, 0.4) 0.75rem,
				rgba(35, 38, 59, 0.32) 0.75rem,
				rgba(35, 38, 59, 0.32) 1.5rem
			);
			opacity: 0;
			transition: opacity 0.4s;
			z-index: 1;
		}
	}
</style>
