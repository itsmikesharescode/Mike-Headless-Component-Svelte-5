<script lang="ts">
	import { initToast } from '$lib/components/Toast/toast-runes.svelte';
	import Toaster from '$lib/components/Toast/Toaster.svelte';
	import '../app.css';

	initToast();

	const { children } = $props();
</script>

<Toaster position="BottomRight" />
{@render children()}
