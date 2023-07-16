import { expect, it } from 'vitest';
import { calculateDays } from './calculate-days';
import type { Day, DayRecord } from './+page.server';

const d = (date: string) => new Date(date);

it('should include events', () => {
	const events: DayRecord = {
		'2021-01-03': { name: 'event 1' },
		'2021-01-06': { name: 'event 2' }
	};

	// 2021-01-01 1
	// 2021-01-02 2
	// 2021-01-03 X
	// 2021-01-04 1
	// 2021-01-05 2
	// 2021-01-06 X
	// 2021-01-07 1
	// 2021-01-08 today
	// 2021-01-09 1
	// 2021-01-10 2

	expect(
		calculateDays({
			from: d('2021-01-01'),
			to: d('2021-01-10'),
			events,
			today: d('2021-01-08')
		})
	).toEqual([
		{ type: 'uneventful', start: '2021-01-01', duration: 2 },
		{ type: 'event', name: 'event 1', start: '2021-01-03' },
		{ type: 'uneventful', start: '2021-01-04', duration: 2 },
		{ type: 'event', name: 'event 2', start: '2021-01-06' },
		{ type: 'uneventful', start: '2021-01-07', duration: 1 },
		{ type: 'today', start: '2021-01-08' },
		{ type: 'uneventful', start: '2021-01-09', duration: 2 }
	]);
});

it('should include events if the last event date is equal to the end date', () => {
	const events: DayRecord = {
		'2021-01-03': { name: 'event 1' },
		'2021-01-06': { name: 'event 2' }
	};

	// 2021-01-01 1
	// 2021-01-02 2
	// 2021-01-03 X
	// 2021-01-04 1
	// 2021-01-05 2
	// 2021-01-06 X
	// 2021-01-07 1
	// 2021-01-08 today

	expect(
		calculateDays({
			from: d('2021-01-01'),
			to: d('2021-01-06'),
			events,
			today: d('2021-01-08')
		})
	).toEqual([
		{ type: 'uneventful', start: '2021-01-01', duration: 2 },
		{ type: 'event', name: 'event 1', start: '2021-01-03' },
		{ type: 'uneventful', start: '2021-01-04', duration: 2 },
		{ type: 'event', name: 'event 2', start: '2021-01-06' },
		{ type: 'uneventful', start: '2021-01-07', duration: 1 },
		{ type: 'today', start: '2021-01-08' }
	]);
});

it('should include events if the first event date is equal to the start date', () => {
	const events: DayRecord = {
		'2021-01-01': { name: 'event 1' }
	};

	// 2021-01-01 X
	// 2021-01-02 1
	// 2021-01-03 2
	// 2021-01-04 today
	// 2021-01-05 1

	expect(
		calculateDays({
			from: d('2021-01-01'),
			to: d('2021-01-05'),
			events,
			today: d('2021-01-04')
		})
	).toEqual([
		{ type: 'event', name: 'event 1', start: '2021-01-01' },
		{ type: 'uneventful', start: '2021-01-02', duration: 2 },
		{ type: 'today', start: '2021-01-04' },
		{ type: 'uneventful', start: '2021-01-05', duration: 1 }
	]);
});
