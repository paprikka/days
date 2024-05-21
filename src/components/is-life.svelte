<script lang="ts">
	import type { RenderableGap } from '../routes/types';

	export let day: RenderableGap;

	$: text = Array(day.duration).fill('·').join('​');
	$: isFuture = new Date(day.start).getTime() > new Date().getTime();
</script>

<span class:is-future={isFuture}>{text}</span>

<style>
	span {
		display: inline;
		color: var(--color-life);
		font-family: monospace;
		letter-spacing: 0.5ch;
		user-select: none;
		-webkit-user-select: none;
		cursor: default;
		word-break: break-all;
		padding-inline-start: 0.5ch;
	}

	span:first-child {
		padding-inline-start: 0;
	}

	.is-future {
		color: var(--color-future);
	}
</style>
