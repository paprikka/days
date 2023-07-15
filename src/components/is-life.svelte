<script lang="ts">
	import type { RenderableUneventfulDay } from '../routes/calculate-days';

	export let day: RenderableUneventfulDay;

	$: text = Array(day.duration).fill('·').join('');
	$: isFuture = new Date(day.start).getTime() > new Date().getTime();

	// $: isToday
</script>

<span class:is-future={isFuture}>{text}</span>

<style>
	span {
		display: inline;
		color: var(--color-life);
		font-family: monospace;
		letter-spacing: 0.5ch;
		user-select: none;
		word-break: break-all;
	}

	.is-today {
		color: var(--color-link);
		animation: animateHeart 1s infinite;
	}

	@keyframes animateHeart {
		0% {
			scale: calc(3 * 0.8);
		}
		5% {
			scale: calc(3 * 0.9);
		}
		10% {
			scale: calc(3 * 0.8);
		}
		15% {
			scale: calc(3 * 1);
		}
		50% {
			scale: calc(3 * 0.8);
		}
		100% {
			scale: calc(3 * 0.8);
		}
	}

	.is-future {
		color: var(--color-future);
	}
</style>
