<script lang="ts" context="module">
	import client from '$src/client';
	export async function load({ page, fetch, session, context }) {
		const query = `*[_type == "batch"] {"slug": slug.current, name, description}`;
		const batches: Batch[] = await client.fetch(query);
		return { props: { batches } };
	}
</script>

<script lang="ts">
	export let batches: Batch[];
</script>

<svelte:head>
	<title>Exam Links - MediEXAM Doctor</title>

	<meta name="title" content="Exam Links - MediEXAM Doctor" />
	<meta name="robots" content="index, follow" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta property="og:title" content="Exam Links - MediEXAM Doctor" />
</svelte:head>

<section class="px-5 w-full">
	<h1 class="text-3xl font-medium text-gray-700 text-center my-2">Select your batch</h1>
	<div class="flex flex-wrap justify-center mt-10 gap-3">
		{#each batches as batch}
			<a
				class="flex items-center justify-center font-semibold text-primary-500 rounded-lg border-2 text-lg h-14 w-60 border-primary transition duration-300 ease-in-out hover:bg-primary-500 hover:text-primary-50"
				href={`/exams/${batch.slug}`}
				>
				{batch.name}
			</a>
		{/each}
	</div>
</section>
