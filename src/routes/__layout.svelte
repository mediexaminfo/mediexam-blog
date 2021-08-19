<script>
	import { fade } from 'svelte/transition';
	import '../app.postcss';
	import Navbar from '$src/components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import PageLoader from '$components/PageLoader.svelte';
	import { pageState } from '$src/stores/pageState';
</script>

<svelte:window
	on:sveltekit:navigation-start={() => {
		$pageState = 'loading';
	}}
	on:sveltekit:navigation-end={() => {
		$pageState = 'loaded';
	}}
/>

{#if $pageState === 'loading'}
	<div out:fade={{ delay: 400 }}>
		<PageLoader />
	</div>
{/if}

<div class="flex flex-col min-h-screen">
	<Navbar />
	<div class="flex-1 flex flex-col items-center justify-center md:container md:mx-auto">
		<slot />
	</div>
	<Footer />
</div>
