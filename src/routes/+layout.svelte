<slot />

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(html, body) {
		padding: 0;
		margin: 0;
		font-size: 16px;

		font-family: 'EB Garamond', serif;
		line-height: 1.4;

		--color-bg: #fff4f4;
		--color-text: #333;
		--color-life: #888;
		--color-future: #ddd;
		--color-link: rgb(253, 71, 11);

		--max-content-width: 140ch;

		color: var(--color-text);
	}

	:global(body) {
		padding: 1rem;
		margin: 0 auto;
		max-width: var(--max-content-width);
		text-align: left;
		background-color: var(--color-bg);
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
