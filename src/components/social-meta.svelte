<script lang="ts">
	export let description: string;
	export let socialImage: {
		width: number;
		height: number;
		absoluteUrl: string;
	};
	export let url: string;
	export let title: string;
	export let siteConfig: {
		name: string;
		twitterSite: string;
		twitterCreator: string;
	};
</script>

<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:site_name" content={siteConfig.name} />
<meta property="og:url" content={url} />
<meta property="og:image" content={socialImage.absoluteUrl} />
<meta property="og:image:width" content={socialImage.width.toString(10)} />
<meta property="og:image:height" content={socialImage.height.toString(10)} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content={siteConfig.twitterSite} />
<meta name="twitter:creator" content={siteConfig.twitterCreator} />
<meta name="twitter:title" content={title} />
<meta name="twitter:image" content={socialImage.absoluteUrl} />
<meta name="twitter:description" content={description} />
