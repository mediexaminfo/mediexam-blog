<script>
	import { pageState } from '$src/stores/pageState';
	import { onDestroy, onMount } from 'svelte';

	let loadingWidth = 'w-0';
	let loadingDuration = 'duration-3000';

	let timeout;

	onMount(() => {
		timeout = setTimeout(() => {
			loadingWidth = 'w-9/12';
		}, 100);
		pageState.subscribe((state) => {
			if (state === 'loaded') {
				loadingWidth = 'w-full';
				loadingDuration = 'duration-1000';
			}
		});
	});
	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div class="fixed top-0 left-0 right-0 h-2">
	<div
		class={`bg-primary-500 h-full transition-all ease-in-out ${loadingDuration} ${loadingWidth}`}
	/>
</div>
