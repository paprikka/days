export type YMLDay = Record<string, EventMetadata>;

export type EventMetadata = {
	name: string;
	desc?: string;
};

export type RenderableEvent = {
	type: 'event';
	start: string;
	name: string;
	desc?: string;
};

export type RenderableGap = {
	type: 'uneventful';
	start: string;
	duration: number;
};

export type RenderableToday = {
	type: 'today';
	start: string;
};

export type RenderableDay = RenderableEvent | RenderableGap | RenderableToday;
