import yaml from 'js-yaml';
import daysYML from './data.yml?raw';

export type Day = {
	id: string;
	date: Date;
	name: string;
	desc?: string;
};

type YAMLRecord = Record<string, Omit<Day, 'date' | 'id'>>;
export type DayRecord = Record<number, Day>;

export const load = async () => {
	const ymlRecords = yaml.load(daysYML) as YAMLRecord[];

	const myDays: DayRecord = ymlRecords.reduce<DayRecord>((acc, val) => {
		const dateKey = Object.keys(val)[0];
		const date = new Date(dateKey);
		date.setHours(0, 0, 0, 0);
		debugger;
		const currDayID = date.getTime();
		const currDay: Day = {
			date,
			// id:
			...val[dateKey]
		};

		return { ...acc, [currDayID]: currDay };
	}, {});

	return { myDays };
};

export const prerender = true;
// export const csr = process.env.NODE_ENV === 'development';
