<script lang="ts">
	import DialogOverlay from '$lib/components/Dialog/DialogOverlay.svelte';
	import { fromToastState } from '$lib/components/Toast/toast-runes.svelte';

	const toast = fromToastState();

	const { data } = $props();
</script>

<div class="min-h-screen flex items-center justify-center flex-col gap-[20px]">
	<button
		onclick={() => {
			toast.error(
				'Sample error',
				'asdklasj alkjsdklajs klajsdklajs kajsdklajsd kljaskdljaklsjd lakjsdklajsdl'
			);

			toast.success('Sample success', 'asdkajsdhjasdhkasd');
		}}
		class="p-[10px] bg-black text-white text-sm font-semibold rounded-lg transition-all active:ring-2 ring-red-700"
	>
		toast me
	</button>

	<div class="flex flex-col gap-[10px]">
		<a href="/page1" class="underline">Page 1</a>
		<a href="/page2" class="underline">Page 2</a>
	</div>
</div>
