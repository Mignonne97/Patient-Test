<script>
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import "../app.css";
    import initWorker from '$lib/sqlite/loadWorker';
	import { onMount } from 'svelte';

	let isOpen = false;

	onMount(() => {
		initWorker();
	});
</script>

<slot />