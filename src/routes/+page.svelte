<script lang="ts">
	import { browser } from '$app/environment';

	import Description from '../components/description.svelte';
	import EndOfContent from '../components/end-of-content.svelte';
	import Header from '../components/header.svelte';
	import IsEvent from '../components/is-event.svelte';
	import IsLife from '../components/is-life.svelte';
	import IsMarker from '../components/is-marker.svelte';
	import { calculateDays } from './calculate-days';
	import type { RenderableDay, RenderableEvent } from './types';

	// TODO: always start 2 weeks before the first entry
	const startDate = new Date('1987-06-07');
	const today = new Date();
	const endDate = new Date('2057-07-08');

	export let data;
	const renderableDays: RenderableDay[] = calculateDays({
		from: startDate,
		to: endDate,
		events: data.myDays,
		today
	});

	let selectedDay: RenderableEvent;
	let selectedDate: Date;

	$: {
		if (browser) {
			document.body.style.overflow = selectedDay ? 'hidden' : '';
		}
	}
</script>

<Header />
<article>
	<!-- TODO: use keys -->
	<div class="days">
		{#each renderableDays as day (day.start)}
			{#if day.type === 'event'}
				<IsEvent
					event={day}
					on:select={(event) => {
						selectedDay = event.detail;
						selectedDate = new Date(event.detail.start);
					}}
				/>
			{:else if day.type === 'marker'}
				<IsMarker marker={day} />
			{:else}
				<IsLife {day} />
			{/if}
		{/each}
		<EndOfContent />
	</div>
</article>

<Description bind:day={selectedDay} bind:date={selectedDate} />

<style>
	article {
		line-height: 2;
	}

	.days {
		display: block;
		flex-wrap: wrap;
		padding: 0;
		margin: 0;
		list-style: none;
		background-color: var(--color-bg-fade);
		position: relative;
	}

	.days::before {
		z-index: -1;
		pointer-events: none;
		content: '';
		height: calc(var(--fade-height) * 2);
		position: absolute;
		left: 0;
		right: 0;
		top: calc(var(--fade-height) * -2);
		background: linear-gradient(transparent, var(--color-bg-fade) var(--fade-height));
	}

	.days::after {
		pointer-events: none;
		content: '';
		height: var(--fade-height);
		position: absolute;
		left: 0;
		right: 0;
		bottom: calc(var(--fade-height) * -1);
		background: linear-gradient(var(--color-bg-fade), transparent);
	}
</style>
