<script lang="ts">
	import DialogOverlay from '$lib/components/Dialog/DialogOverlay.svelte';
	import { fromToastState } from '$lib/components/Toast/toast-runes.svelte';

	const toast = fromToastState();

	const { data } = $props();
</script>

<div class="min-h-screen flex items-center justify-center">
	<button
		onclick={() => {
			toast.error(
				'Sample toast',
				'asdklasj alkjsdklajs klajsdklajs kajsdklajsd kljaskdljaklsjd lakjsdklajsdl'
			);
		}}
		class="p-[10px] bg-black text-white text-sm font-semibold rounded-lg transition-all active:ring-2 ring-red-700"
	>
		toast me
	</button>
</div>
