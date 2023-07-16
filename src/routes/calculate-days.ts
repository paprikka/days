import type { Day, DayRecord } from './+page.server';
import { getDayID } from './get-day-id';
import type { RenderableDay, RenderableEvent, RenderableGap, RenderableToday } from './types';

const ONE_DAY = 24 * 60 * 60 * 1000;

const getNumberOfDaysBetweenDates = (from: Date, to: Date): number =>
	Math.round((to.getTime() - from.getTime()) / ONE_DAY);

export const calculateDays = ({
	from,
	to,
	events = {},
	today
}: {
	from: Date;
	to: Date;
	events?: DayRecord;
	today: Date;
}): RenderableDay[] => {
	const renderableToday: RenderableToday = {
		start: getDayID(today),
		type: 'today'
	};
	const renderableEvents: [Date, RenderableEvent | RenderableToday][] = Object.entries(events).map(
		([dateStr, dayMeta]) => {
			const date = new Date(dateStr);
			const day: RenderableEvent = {
				...dayMeta,
				start: getDayID(date),
				type: 'event'
			};
			return [date, day];
		}
	);

	renderableEvents.push([today, renderableToday]);
	renderableEvents.sort((eventA, eventB) => eventA[0].getTime() - eventB[0].getTime());

	const maybeLastEvent = renderableEvents[renderableEvents.length - 1];

	if (typeof maybeLastEvent === 'undefined')
		return [
			{
				type: 'uneventful',
				start: getDayID(from),
				duration: getNumberOfDaysBetweenDates(from, to)
			}
		];

	const shouldAddDaysAfter = getNumberOfDaysBetweenDates(new Date(maybeLastEvent[0]), to) > 0;

	const dayRecordDates = renderableEvents.reduce(
		(all: { lastDate: Date; days: RenderableDay[] }, [currDate, curr]) => {
			const daysBefore = getNumberOfDaysBetweenDates(all.lastDate, currDate);

			const event = curr;

			if (!(daysBefore > 0))
				return {
					lastDate: new Date(currDate.getTime() + ONE_DAY),
					days: [...all.days, event]
				};

			const uneventful: RenderableGap = {
				type: 'uneventful',
				start: getDayID(all.lastDate),
				duration: daysBefore
			};

			return {
				lastDate: new Date(currDate.getTime() + ONE_DAY),
				days: [...all.days, uneventful, event]
			};
		},
		{ lastDate: new Date(from), days: [] }
	);

	if (!shouldAddDaysAfter) return dayRecordDates.days;

	const daysAfter: RenderableGap = {
		type: 'uneventful',
		start: getDayID(new Date(maybeLastEvent[0].getTime() + ONE_DAY)),
		duration: getNumberOfDaysBetweenDates(maybeLastEvent[0], to)
	};

	return [...dayRecordDates.days, daysAfter];
};
