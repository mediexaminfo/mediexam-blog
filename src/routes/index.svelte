<script lang="ts" context="module">
	import client from '$src/client';

	type SiteSettings = { title: string; description: string; heroImage: string };

	export async function load({ page, fetch, session, context }) {
		const query = `*[_type == "siteSettings"]{title, description, "heroImage": image.asset->url}`;
		const result = await client.fetch(query);
		const settings: SiteSettings = result[0];
		return { props: { settings } };
	}
</script>

<script lang="ts">
	import heroIllustration from '$src/assets/heroIllustration.svg';
	export let settings: SiteSettings;
</script>

<svelte:head>
	<title>{settings.title} - MediEXAM Doctor</title>

	<meta name="title" content={`${settings.title} - MediEXAM Doctor`} />
	<meta name="description" content={settings.description} />
	<meta name="robots" content="index, follow" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta property="og:title" content={`${settings.title} - MediEXAM Doctor`} />
	<meta property="og:description" content={settings.description} />
	<meta property="og:image" content={settings.heroImage} />
</svelte:head>

<section class="text-gray-600">
	<div class="container mx-auto flex px-5 md:flex-row flex-col items-center">
		<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
			<img class="object-cover object-center rounded" alt="hero" src={heroIllustration} />
		</div>
		<div
			class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
		>
			<h1 class="sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{settings.title}</h1>
			<p class="mb-8 leading-relaxed">{settings.description}</p>
			<div class="flex justify-center">
				<a
					href="/blog"
					class="inline-flex text-white bg-primary-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg"
					>Blog</a
				>
				<a
					href="/about"
					class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
					>Contact</a
				>
			</div>
		</div>
	</div>
</section>
