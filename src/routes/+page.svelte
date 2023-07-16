<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import Description from '../components/description.svelte';
	import IsLife from '../components/is-life.svelte';
	import Md from '../components/md.svelte';
	import { calculateDays } from './calculate-days';
	import type { RenderableDay } from './types';
	import IsMarker from '../components/is-marker.svelte';
	import IsEvent from '../components/is-event.svelte';

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

	let selectedDay: RenderableDay;
	let selectedDate: Date;

	$: {
		if (browser) {
			document.body.style.overflow = selectedDay ? 'hidden' : '';
		}
	}

	onMount(() => {
		const lastEl = document.querySelector('#end-of-content');

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				window.umami?.trackEvent('reach:end');
				observer.disconnect();
			});
		});

		lastEl && observer.observe(lastEl);
	});
</script>

<header>
	<h1>Days</h1>
	<p>
		<a href="https://sonnet.io" target="_blank">My</a> life in days, inspired by Buster Benson's
		<a href="https://busterbenson.com/life-in-weeks" target="_blank">Life in Weeks</a>
		(but appropriately over-engineered).
		<br />
		Feel free to
		<a href="https://github.com/paprikka/days" target="_blank">fork it</a>, but please be gentle,
		it's still the first iteration.
	</p>
</header>
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
			{:else}<IsLife {day} />{/if}
		{/each}
		<span id="end-of-content" />
	</div>
</article>

<Description bind:day={selectedDay} bind:date={selectedDate} />

<style>
	h1 {
		font-size: 3rem;
		font-weight: 500;
		margin-bottom: 0;
	}

	header {
		padding: 0 0 1rem;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

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
