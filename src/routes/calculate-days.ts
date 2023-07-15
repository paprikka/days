import type { DayRecord } from './+page.server';
import { getDayID } from './get-day-id';
import type { RenderableDay, RenderableEvent, RenderableGap, RenderableMarker } from './types';

const ONE_DAY = 24 * 60 * 60 * 1000;

const getNumberOfDaysBetweenDates = (from: Date, to: Date): number =>
	Math.round((to.getTime() - from.getTime()) / ONE_DAY);

const getBirthdays = (birthdayDayID: string, to: Date, today: Date): [Date, RenderableMarker][] => {
	const todayID = getDayID(today);
	const birthdayDate = new Date(birthdayDayID);
	const result: [Date, RenderableMarker][] = [];

	let startDate: Date = new Date(birthdayDate.getTime());
	startDate.setFullYear(startDate.getFullYear() + 1);
	let years = 1;

	while (startDate.getTime() < to.getTime()) {
		const start = getDayID(startDate);
		// TODO: should we include both pieces of info (today & bday?)
		if (start !== todayID) {
			const marker: RenderableMarker = {
				type: 'marker',
				markerType: 'birthday',
				start: getDayID(startDate),
				name: years.toString()
			};

			result.push([new Date(startDate), marker]);
		}
		startDate.setFullYear(startDate.getFullYear() + 1);
		years++;
	}

	return result;
};

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
	const eventsArr = Object.entries(events);
	const renderableEvents: [Date, RenderableEvent | RenderableMarker][] = eventsArr.map(
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

	const renderableToday: RenderableMarker = {
		start: getDayID(today),
		type: 'marker',
		markerType: 'today'
	};

	renderableEvents.push([today, renderableToday]);

	const birthday = eventsArr.find(([_, { birthday }]) => birthday);
	const birthdayMarkers = birthday ? getBirthdays(birthday[0], to, today) : [];
	renderableEvents.push(...birthdayMarkers);

	renderableEvents.sort((eventA, eventB) => eventA[0].getTime() - eventB[0].getTime());

	// TODO: we might not need that any more since we have today
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
