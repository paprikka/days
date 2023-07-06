<script lang="ts">
	const startDate = new Date('1987-10-07');
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
</script>

<article>
	<div class="days">
		{#each days as day (day.getTime())}
			{#if data.myDays[day.getTime()]}
				<time
					datetime={day.toISOString()}
					class:is-today={day.getTime() === today.getTime()}
					class:is-event={data.myDays[day.getTime()]}
				>
					{data.myDays[day.getTime()].name}
				</time>
			{:else}
				<time class="is-life" datetime={day.toISOString()}>·</time>
			{/if}
		{/each}
	</div>
</article>

<style>
	article {
		padding: 5rem;
		margin: 0 auto;
		max-width: 140ch;
		text-align: left;
		line-height: 2;
	}

	.days {
		display: block;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.days time {
		display: inline-block;
	}

	.is-today {
		color: var(--color-link);
	}

	.is-life {
		font-family: monospace;
		color: #999;
		padding: 0 0.2rem;
	}

	.is-event {
		background-color: rgba(253, 39, 11, 0.1);
		padding: 0.25em 1ch;
		border-radius: 0.25rem;
		line-height: 1;
	}
</style>
