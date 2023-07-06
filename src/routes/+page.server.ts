import yaml from 'js-yaml';
// import fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import path from 'path';

type Day = {
	date: Date;
	name: string;
	desc?: string;
};

type YAMLRecord = Record<string, Omit<Day, 'date'>>;
type DayRecord = Record<number, Day>;

import daysYML from './data.yml';

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

	console.log(myDays);

	return {
		myDays
	};
};

export const prerender = true;
export const csr = false;
