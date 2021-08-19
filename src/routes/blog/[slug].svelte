<script lang="ts" context="module">
	import client from '$src/client';
	import blocksToHtml from '@sanity/block-content-to-html';
	export async function load({ page, fetch, session, context }) {
		const params = { slug: page.params.slug };
		const query = `*[_type == "post" && slug.current == $slug]{title, description, publishedAt, "author": author->name, "authorSlug":author->slug.current, "slug": slug.current, "category": category->title, "categorySlug": category->slug.current, body, "imageUrl": mainImage.asset->url}`;
		const post: Post = (await client.fetch(query, params))[0];
		const html = blocksToHtml({
			blocks: post.body,
			imageOptions: { w: 320, h: 240, fit: 'max' },
			projectId: 'e5mb4tjm',
			dataset: 'production'
		});

		return { props: { post, html } };
	}
</script>

<script lang="ts">
	import dayjs from 'dayjs';
	export let post: Post, html: string;

	const date = dayjs(post.publishedAt).format('DD MMM YYYY');
</script>

<svelte:head>
	<title>{post.title} - {post.author}</title>

	<meta name="title" content={post.title} />
	<meta name="description" content={post.description} />
	<meta name="robots" content="index, follow" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content={post.author} />

	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:image" content={post.imageUrl} />
</svelte:head>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="-my-8 divide-y-2 divide-gray-100">
			<div class="py-8 flex flex-wrap md:flex-nowrap">
				<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
					<span class="font-semibold text-primary-500 uppercase">{post.category}</span>
					<span class="mt-1 text-gray-500 text-sm">{date}</span>
				</div>
				<div class="md:flex-grow">
					<h2 class="text-2xl font-medium text-gray-700 mb-2">
						{post.title}
					</h2>
					<p class="prose-lg">
						{@html html}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
