<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status
			}
		};
	}
</script>

<script>
	export let status;
</script>

<svelte:head>
	<title>Hmm... An error occurred.</title>
</svelte:head>

{#if status === 404}
	<h1 class="text-2xl text-gray-700">Not found. What exactly are you looking for?</h1>
{:else}
	<h1 class="text-2xl text-gray-700">Oopss. An error occurred!</h1>
{/if}
