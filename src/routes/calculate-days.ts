import type { Day, DayRecord } from './+page.server';
import { getDayID } from './get-day-id';

export type RenderableEventfulDay = {
	type: 'event';
	start: string;
} & Day;

export type RenderableUneventfulDay = {
	type: 'uneventful';
	start: string;
	duration: number;
};

export type RenderableDay = RenderableEventfulDay | RenderableUneventfulDay;

const range = (start: number, end: number): number[] =>
	Array(end - start + 1)
		.fill(0)
		.map((_, idx) => start + idx);

const ONE_DAY = 24 * 60 * 60 * 1000;

const { round, abs } = Math;
const getNumberOfDaysBetweenDates = (from: Date, to: Date): number =>
	round(abs((from.getTime() - to.getTime()) / ONE_DAY));

export const calculateDays = (from: Date, to: Date, events: DayRecord = {}): RenderableDay[] => {
	const eventsArraySorted = Object.entries(events)
		.map(([dateStr, dayMeta]) => ({
			date: new Date(dateStr),
			meta: dayMeta
		}))
		.sort((a, b) => a.date.getTime() - b.date.getTime());

	const maybeLastEvent = eventsArraySorted[eventsArraySorted.length - 1];

	if (typeof maybeLastEvent === 'undefined')
		return [
			{
				type: 'uneventful',
				start: getDayID(from),
				duration: getNumberOfDaysBetweenDates(from, to)
			}
		];

	const shouldAddDaysAfter = getNumberOfDaysBetweenDates(maybeLastEvent.date, to) > 0;

	const dayRecordDates = eventsArraySorted.reduce(
		(all: { lastDate: Date; days: RenderableDay[] }, curr) => {
			const daysBefore = getNumberOfDaysBetweenDates(all.lastDate, curr.date);

			const event: RenderableEventfulDay = {
				type: 'event',
				start: getDayID(curr.date),
				...curr.meta
			};

			if (!(daysBefore > 0))
				return {
					lastDate: new Date(curr.date.getTime() + ONE_DAY),
					days: [...all.days, event]
				};

			const uneventful: RenderableUneventfulDay = {
				type: 'uneventful',
				start: getDayID(all.lastDate),
				duration: daysBefore
			};

			return {
				lastDate: new Date(curr.date.getTime() + ONE_DAY),
				days: [...all.days, uneventful, event]
			};
		},
		{ lastDate: new Date(from), days: [] }
	);

	if (!shouldAddDaysAfter) return dayRecordDates.days;

	const daysAfter: RenderableUneventfulDay = {
		type: 'uneventful',
		start: getDayID(new Date(maybeLastEvent.date.getTime() + ONE_DAY)),
		duration: getNumberOfDaysBetweenDates(maybeLastEvent.date, to)
	};

	return [...dayRecordDates.days, daysAfter];
};
