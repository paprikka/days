export const trackEvent = (eventName: string) => {
	if (localStorage['sonnet::debug']) {
		console.log(`[track] ${eventName}`);
		return;
	}

	if (window.umami?.trackEvent) {
		window.umami.trackEvent(eventName);
		return;
	}
};
