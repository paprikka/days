<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Day } from '../routes/+page.server';

	export let day: Day | undefined;

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	$: title = day ? new Intl.DateTimeFormat('en-US', options).format() : '';
</script>

{#if day}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div class="overlay" on:click={() => (day = undefined)} role="dialog" aria-modal="true">
		<aside>
			<h2>{title}</h2>
			{day.desc}

			<p class="close-info">Click anywhere to close</p>
		</aside>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-bg);
	}

	aside {
		background-color: var(--color-bg);
		max-width: 40ch;
		padding: 1rem;
		/* border: 2px solid; */
	}

	h2 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0 0 0.75rem;
	}

	.close-info {
		opacity: 0.7;
		font-size: 0.85rem;
	}
</style>
