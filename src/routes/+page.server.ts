import yaml from 'js-yaml';
import daysYML from './data.yml?raw';

export type Day = {
	name: string;
	desc?: string;
};

type YAMLRecord = Record<string, Omit<Day, 'id'>>;
export type DayRecord = Record<string, Day>;

export const load = async () => {
	const ymlRecords = yaml.load(daysYML) as YAMLRecord[];

	const myDays: DayRecord = ymlRecords.reduce<DayRecord>((acc, val) => {
		const dateKey = Object.keys(val)[0];

		return { ...acc, [dateKey]: val[dateKey] };
	}, {});

	return { myDays };
};

export const prerender = true;
// export const csr = process.env.NODE_ENV === 'development';
