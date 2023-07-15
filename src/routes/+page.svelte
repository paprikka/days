<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import Description from '../components/description.svelte';
	import Md from '../components/md.svelte';
	import type { Day } from './+page.server.js';
	import { getDayID } from './get-day-id';
	import { calculateDays, type RenderableDay } from './calculate-days';
	import IsLife from '../components/is-life.svelte';

	// TODO: always start 2 weeks before the first entry
	const startDate = new Date('1987-06-07');
	const today = new Date();
	const deathDate = new Date('2057-07-08');

	export let data;
	const renderableDays: RenderableDay[] = calculateDays(startDate, deathDate, data.myDays);

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
				<button
					on:click={() => {
						selectedDay = day;
						selectedDate = new Date(day.start);
					}}
					class="is-event"
					class:has-description={!!day.desc}><Md inline content={day.name} /></button
				>
			{:else}<IsLife {day} />{/if}
		{/each}

		<!-- {#each days as dayID (dayID)}
			{#if data.myDays[dayID]}
				
			{:else if dayID.endsWith('05-07')}
				<time class="is-life">({parseInt(dayID.split('-')[0]) - 1988})</time>
			{:else}
				<time
					class="is-life"
					class:is-today={dayID === getDayID(today)}
					class:is-future={new Date(dayID).getTime() > today.getTime()}
				>
					·
				</time>
			{/if}
		{/each} -->
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

	.days button {
		display: inline;
		appearance: none;
		font-family: inherit;
		border: none;
		color: var(--color-text);
		font-size: 1rem;
		margin: 0;
	}

	.is-life {
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
