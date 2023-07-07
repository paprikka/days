import yaml from 'js-yaml';
import daysYML from './data.yml';

type Day = {
	date: Date;
	name: string;
	desc?: string;
};

type YAMLRecord = Record<string, Omit<Day, 'date'>>;
export type DayRecord = Record<number, Day>;

export const load = async ({ fetch }) => {
	const ymlFile = await fetch(daysYML).then((_) => _.text());
	const ymlRecords = yaml.load(ymlFile) as YAMLRecord[];

	const myDays: DayRecord = ymlRecords.reduce<DayRecord>((acc, val) => {
		const dateKey = Object.keys(val)[0];
		const date = new Date(dateKey);
		date.setHours(0, 0, 0, 0);

		const currDayID = date.getTime();
		const currDay: Day = {
			date,
			...val[dateKey]
		};

		return { ...acc, [currDayID]: currDay };
	}, {});

	return { myDays };
};

export const prerender = true;
export const csr = process.env.NODE_ENV === 'development';
