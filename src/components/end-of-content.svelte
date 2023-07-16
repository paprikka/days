<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const lastEl = document.querySelector('#end-of-content');

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				window.umami?.trackEvent('reach:end');
				observer.disconnect();
			});
		});

		lastEl && observer.observe(lastEl);
	});
</script>

<span id="end-of-content" />
