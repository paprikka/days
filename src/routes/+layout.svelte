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

		--color-text: #333;
		--color-link: rgb(253, 39, 11);

		color: var(--color-text);
	}

	:global(body) {
		padding: 1rem;
		margin: 0 auto;
		max-width: 140ch;
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
