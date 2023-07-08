<script lang="ts">
	import { browser } from '$app/environment';

	import Description from '../components/description.svelte';
	import type { Day } from './+page.server.js';

	// TODO: always start 2 weeks before the first entry
	const startDate = new Date('1987-06-07');
	startDate.setHours(0, 0, 0, 0);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const deathDate = new Date('2057-07-07');
	deathDate.setHours(0, 0, 0, 0);

	function getDaysBetweenDates(fromDate: Date, toDate: Date): Date[] {
		let dateArray = [];
		let currentDate = new Date(fromDate);

		while (currentDate <= toDate) {
			dateArray.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return dateArray;
	}

	export let data;

	$: days = getDaysBetweenDates(startDate, deathDate);

	let selectedDay: Day;

	$: {
		if (browser) {
			document.body.style.overflow = selectedDay ? 'hidden' : '';
		}
	}
</script>

<header>
	<h1>Days</h1>
	<details hidden>
		<summary>About</summary>
		<p>
			My life in days, inspired by Buster Benson's <a
				href="https://busterbenson.com/life-in-weeks"
				target="_blank">Life in Weeks</a
			>
			(but appropriately over-engineered). Feel free to
			<a href="https://githubcom" target="_blank">fork it</a>, but please remember, I'm still
			working on it.
		</p>
	</details>
</header>
<article>
	<div class="days">
		{#each days as day (day.getTime())}
			{#if data.myDays[day.getTime()]}
				<button
					on:click={() => {
						selectedDay = data.myDays[day.getTime()];
					}}
					class:is-event={data.myDays[day.getTime()]}
					class:has-description={!!data.myDays[day.getTime()].desc}
				>
					{data.myDays[day.getTime()].name}
				</button>
			{:else if day.getMonth() === 4 && day.getDate() === 7}
				<time class="is-life" datetime={day.toISOString()}>({day.getFullYear() - 1988})</time>
			{:else}
				<time
					class="is-life"
					class:is-today={day.getTime() === today.getTime()}
					class:is-future={day.getTime() > today.getTime()}
					datetime={day.toISOString()}
				>
					·
				</time>
			{/if}
		{/each}
	</div>
</article>

<Description bind:day={selectedDay} />

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

	summary {
		opacity: 0.5;
		cursor: pointer;
	}

	article {
		line-height: 2;
	}

	.days {
		display: block;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.days time,
	.days button {
		display: inline-block;
	}

	.days button {
		appearance: none;
		font-family: inherit;
		border: none;
		color: var(--color-text);
		font-size: 1rem;
	}

	.is-life {
		color: var(--color-life);
		font-family: monospace;
		padding: 0 0.2rem;
		user-select: none;
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
