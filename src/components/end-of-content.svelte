<script lang="ts">
	import { onMount } from 'svelte';
	import { trackEvent } from '../trackEvent';

	onMount(() => {
		const loadedAt = Date.now();
		const minimumTimeOnPage = 1000;

		const lastEl = document.querySelector('#end-of-content');

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				if (Date.now() - loadedAt < minimumTimeOnPage) return;
				trackEvent('reach:end');
				observer.disconnect();
			});
		});

		lastEl && observer.observe(lastEl);
	});
</script>

<span id="end-of-content" />
