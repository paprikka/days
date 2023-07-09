import yaml from 'js-yaml';
import daysYML from './data.yml?raw';
import { getDayID } from './get-day-id';

export type Day = {
	name: string;
	desc?: string;
};

export type DayRecord = Record<string, Day>;

export const load = async () => {
	const ymlRecords = yaml.load(daysYML) as Record<string, Day>[];

	const myDays: DayRecord = ymlRecords.reduce<DayRecord>((acc, val) => {
		const ymlDate = Object.keys(val)[0];
		const date = new Date(ymlDate);
		const dateKey = getDayID(date);

		return { ...acc, [dateKey]: val[ymlDate] };
	}, {});

	return { myDays };
};

export const prerender = true;
// export const csr = process.env.NODE_ENV === 'development';
