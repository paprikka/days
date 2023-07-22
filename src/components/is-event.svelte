<script lang="ts">
	import type { RenderableEvent } from '../routes/types';

	export let event: RenderableEvent;
	import { createEventDispatcher } from 'svelte';
	import Md from './md.svelte';
	const dispatch = createEventDispatcher<{
		select: RenderableEvent;
	}>();
	const handleSelect = () => {
		dispatch('select', event);
	};
</script>

<button
	id={event.start}
	on:click={handleSelect}
	class="is-event"
	class:has-description={!!event.desc}><Md inline content={event.name} /></button
>

<style>
	button {
		display: inline;
		appearance: none;
		font-family: inherit;
		border: none;
		color: var(--color-text);
		font-size: 1rem;
		margin: 0;
	}

	.is-event {
		background-color: rgba(253, 39, 11, 0.1);
		padding: 0.25em 1ch 0.4em;
		position: relative;
		top: -0.1em;
		border-radius: 0.25rem;
		line-height: 1;
	}

	.is-event:hover {
		background-color: rgba(253, 39, 11, 0.3);
	}

	.is-event:not(.has-description) {
		pointer-events: none;
	}
	.is-event.has-description {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
