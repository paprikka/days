<script>
	import SocialMeta from '../components/social-meta.svelte';
</script>

<svelte:head>
	<SocialMeta
		title="Days"
		url="https://days.sonnet.io/"
		socialImage={{
			absoluteUrl: 'https://days.sonnet.io/social.png',
			height: 506,
			width: 1012
		}}
		description="A life"
		siteConfig={{
			name: 'Days',
			twitterCreator: '@rafalpast',
			twitterSite: '@rafalpast'
		}}
	/>
	<script
		async
		defer
		data-website-id="613217d4-e55b-4d53-928a-ef51c65d580a"
		data-domains="days.sonnet.io"
		src="https://sonnet-events.vercel.app/umami.js"
	></script>
</svelte:head>
<slot />

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html, body) {
		padding: 0;
		margin: 0;
		font-size: 16px;

		font-family: Garamond, Baskerville, 'Baskerville Old Face', 'Hoefler Text', 'Times New Roman',
			serif;

		line-height: 1.4;

		--color-bg: #fff4f4;
		--color-bg-fade: #fff4f4ee;
		--color-text: #333;
		--color-life: #888;
		--color-future: #ddd;
		--color-link: rgb(253, 71, 11);

		--max-content-width: 140ch;
		--fade-height: 8rem;

		color: var(--color-text);
	}

	:global(html) {
		background-color: var(--color-bg);
		background-image: url('/bg-foot.webp'), url('/bg-lines.webp');
		background-size: contain;
		background-repeat: no-repeat, repeat-y;
		background-position: bottom center, bottom center;
		padding-block-end: calc(90vh + var(--fade-height));
	}

	:global(body) {
		padding: 1rem;
		margin: 0 auto;
		max-width: var(--max-content-width);
		text-align: left;
	}

	@media (min-width: 600px) {
		:global(body) {
			padding: 5rem;
		}
	}

	:global(a) {
		color: var(--color-link);
	}
</style>
