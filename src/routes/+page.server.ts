import yaml from 'js-yaml';
import fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

type Day = {
	date: Date;
	name: string;
	desc?: string;
};

type YAMLRecord = Record<string, Omit<Day, 'date'>>;
type DayRecord = Record<number, Day>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const load = async () => {
	const ymlFile = await fs.readFile(path.join(__dirname, 'data.yml'), 'utf8');
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
