<script lang="ts" context="module">
	import client from '$src/client';
	export async function load({ page, fetch, session, context }) {
		const params = { slug: page.params.slug };
		const query = `*[_type == "post" && category->slug.current == $slug]{title, description, publishedAt, "author": author->name, "authorSlug":author->slug.current, "slug": slug.current, "category": category->title, "categorySlug": category->slug.current} | order(order asc)`;
		const categoryQuery = `*[_type == "category" && slug.current == $slug]{title, slug, description}`;
		const posts: PostData[] = await client.fetch(query, params);
		const category: PostCategory = (await client.fetch(categoryQuery, params))[0];
		return { props: { posts, category } };
	}
</script>

<script lang="ts">
	import dayjs from 'dayjs';
	export let posts: PostData[], category: PostCategory;

	const days: { date: string; month: string }[] = [];
	for (let post of posts) {
		const day = dayjs(post.publishedAt);
		days.push({ date: day.format('DD'), month: day.format('MMM') });
	}
</script>

<svelte:head>
	<title>Blog posts of category {category.title}</title>
</svelte:head>
<h1 class="text-3xl font-medium text-gray-700 text-center my-2">{category.title}</h1>
<p class="text-lg text-center text-gray-600 leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
	{category.description}
</p>

<section class="text-gray-600">
	<div class="container p-5 mt-4 mx-auto">
		<div class="flex flex-wrap -mx-4 -my-8">
			{#each posts as post, i}
				<div class="py-8 px-4 lg:w-1/3">
					<div class="h-full flex items-start">
						<div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
							<span class="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{days[i].month}</span
							>
							<span class="font-medium text-lg text-gray-800 title-font leading-none"
								>{days[i].date}</span
							>
						</div>
						<div class="flex-grow pl-6">
							<h2 class="tracking-widest text-xs title-font uppercase font-medium text-primary-500">
								{category.title}
							</h2>
							<a
								href={`/blog/${post.slug}`}
								class="block text-gray-700 transition hover:text-gray-400 duration-300 ease-in-out"
							>
								<h1 class="block title-font text-xl font-medium mt-1">{post.title}</h1>
								<p class="block leading-relaxed my-2">
									{post.description}
								</p>
							</a>
							{#if post.authorSlug === 'santo6721'}
								<a class="inline-flex items-center" href="/about">
									<span class="flex-grow flex flex-col">
										<span class="title-font font-medium text-gray-900">{post.author}</span>
									</span>
								</a>
							{:else}
								<p class="inline-flex items-center">
									<span class="flex-grow flex flex-col">
										<span class="title-font font-medium text-gray-900">{post.author}</span>
									</span>
								</p>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
