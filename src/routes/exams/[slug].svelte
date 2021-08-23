<script lang="ts" context="module">
	import client from '$src/client';
	export async function load({ page, fetch, session, context }) {
		const params = { slug: page.params.slug };
		const query = `*[_type == "examLink" && batch->slug.current == $slug]{name, link, 'category': category->title, order} | order(order asc)`;
		const batchQuery = `*[_type == "batch" && slug.current == $slug]{name, "slug": slug.current, description}`;
		let examLinks: ExamLink[] = await client.fetch(query, params);
		examLinks = examLinks.sort((a, b) => a.name.localeCompare(b.name));
		const batch: Batch = (await client.fetch(batchQuery, params))[0];
		let categories = [];
		for (const examLink of examLinks) {
			if (!categories.includes(examLink.category)) {
				categories.push(examLink.category);
			}
		}
		categories = categories.sort((a, b) => a.localeCompare(b));
		return { props: { batch: batch, examLinks: examLinks, categories: categories } };
	}
</script>

<script lang="ts">
	export let batch: Batch, examLinks: ExamLink[], categories: string[];
</script>

<svelte:head>
	<title>Exams links for batch {batch.name}</title>

	<meta name="title" content={`Batch ${batch.name} - MediEXAM Doctor`} />
	<meta name="description" content={`Exams links for batch ${batch.name}`} />
	<meta name="robots" content="index, follow" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta property="og:title" content={`Batch ${batch.name} - MediEXAM Doctor`} />
	<meta property="og:description" content={`Exams links for batch ${batch.name}`} />
</svelte:head>
<section class="text-gray-600">
	<div class="container p-5 mx-auto">
		<div class="text-center mb-20">
			<h1 class="text-3xl font-medium text-gray-700 my-2 text-center">Batch - {batch.name}</h1>
			{#if batch.description}
				<p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
					{batch.description}
				</p>
			{/if}
		</div>
		<div class="flex flex-wrap -m-4">
			{#each categories as category}
				<div class="p-4 sm:w-1/2 w-full">
					<h2
						class="font-medium tracking-widest text-gray-900 mb-4 text-sm text-center sm:text-left"
					>
						{category.toUpperCase()}
					</h2>
					<nav
						class="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5"
					>
						{#each examLinks as examLink}
							{#if examLink.category === category}
								<a
									class="flex flex-row items-center"
									href={examLink.link}
									rel="noopener noreferrer"
									target="_blank"
								>
									<span class="block text-primary-500 mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</span><span class="block leading-none">{examLink.name}</span>
								</a>
							{/if}
						{/each}
					</nav>
				</div>
			{:else}
				<h1 class="text-2xl text-gray-700">Nothing here. Check back later.</h1>
			{/each}
		</div>
	</div>
</section>
