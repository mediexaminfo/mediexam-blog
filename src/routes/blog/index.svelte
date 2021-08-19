<script lang="ts" context="module">
	import client from '$src/client';
	export async function load({ page, fetch, session, context }) {
		const query = `*[_type == "category"] {"slug": slug.current, title, description}`;
		const categories: PostCategory[] = await client.fetch(query);
		return { props: { categories } };
	}
</script>

<script lang="ts">
	export let categories: PostCategory[];
</script>

<svelte:head>
	<title>Browse by categories</title>

	<meta name="title" content="MediEXAM Doctor's blog" />
	<meta name="robots" content="index, follow" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta property="og:title" content="MediEXAM Doctor's blog" />
</svelte:head>

<div class="p-5">
	<h1 class="text-3xl font-medium text-gray-600 text-center">Pick a category</h1>
	<section class="text-gray-600 mt-10">
		<div class="container mx-auto">
			<div class="flex flex-wrap -m-4 justify-center">
				{#each categories as category}
					<a
						href={`/categories/${category.slug}`}
						class="xl:w-1/3 md:w-1/2 p-4 hover:-translate-y-2 hover:opacity-80 transition duration-300 ease-in-out"
					>
						<div class="border border-gray-200 p-6 rounded-lg">
							<h2 class="text-lg text-primary font-medium title-font mb-2 uppercase">
								{category.title}
							</h2>
							<p class="leading-relaxed text-base">
								{category.description || ''}
							</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>
