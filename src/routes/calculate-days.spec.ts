import { expect, it } from 'vitest';
import type { DayRecord } from './+page.server';
import { calculateDays } from './calculate-days';
import type { RenderableDay } from './types';

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
	).toEqual<RenderableDay[]>([
		{ type: 'uneventful', start: '2021-01-01', duration: 2 },
		{ type: 'event', name: 'event 1', start: '2021-01-03' },
		{ type: 'uneventful', start: '2021-01-04', duration: 2 },
		{ type: 'event', name: 'event 2', start: '2021-01-06' },
		{ type: 'uneventful', start: '2021-01-07', duration: 1 },
		{ type: 'marker', markerType: 'today', start: '2021-01-08' },
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
	).toEqual<RenderableDay[]>([
		{ type: 'uneventful', start: '2021-01-01', duration: 2 },
		{ type: 'event', name: 'event 1', start: '2021-01-03' },
		{ type: 'uneventful', start: '2021-01-04', duration: 2 },
		{ type: 'event', name: 'event 2', start: '2021-01-06' },
		{ type: 'uneventful', start: '2021-01-07', duration: 1 },
		{ type: 'marker', markerType: 'today', start: '2021-01-08' }
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
		{ type: 'marker', markerType: 'today', start: '2021-01-04' },
		{ type: 'uneventful', start: '2021-01-05', duration: 1 }
	]);
});

it('should include birthdays', () => {
	const events: DayRecord = {
		'2001-03-01': { name: 'event 1' },
		'2001-05-01': { name: 'birthday', birthday: true }
	};
	const result = calculateDays({
		from: d('2000-01-01'),
		to: d('2005-05-02'),
		events,
		today: d('2004-05-01')
	});

	// const isBirthday = (evt: RenderableDay): evt is RenderableMarker =>
	// 	evt.type === 'marker' && evt.markerType === 'birthday';

	// expect(result.filter(isBirthday).map((_: RenderableMarker) => `${_.name}: ${_.start}`)).toEqual(
	// 	[]
	// );

	expect(result).toMatchInlineSnapshot(`
		[
		  {
		    "duration": 425,
		    "start": "2000-01-01",
		    "type": "uneventful",
		  },
		  {
		    "name": "event 1",
		    "start": "2001-03-01",
		    "type": "event",
		  },
		  {
		    "duration": 60,
		    "start": "2001-03-02",
		    "type": "uneventful",
		  },
		  {
		    "birthday": true,
		    "name": "birthday",
		    "start": "2001-05-01",
		    "type": "event",
		  },
		  {
		    "duration": 364,
		    "start": "2001-05-02",
		    "type": "uneventful",
		  },
		  {
		    "markerType": "birthday",
		    "name": "1",
		    "start": "2002-05-01",
		    "type": "marker",
		  },
		  {
		    "duration": 364,
		    "start": "2002-05-02",
		    "type": "uneventful",
		  },
		  {
		    "markerType": "birthday",
		    "name": "2",
		    "start": "2003-05-01",
		    "type": "marker",
		  },
		  {
		    "duration": 365,
		    "start": "2003-05-02",
		    "type": "uneventful",
		  },
		  {
		    "markerType": "today",
		    "start": "2004-05-01",
		    "type": "marker",
		  },
		  {
		    "duration": 364,
		    "start": "2004-05-02",
		    "type": "uneventful",
		  },
		  {
		    "markerType": "birthday",
		    "name": "4",
		    "start": "2005-05-01",
		    "type": "marker",
		  },
		  {
		    "duration": 1,
		    "start": "2005-05-02",
		    "type": "uneventful",
		  },
		]
	`);
});
