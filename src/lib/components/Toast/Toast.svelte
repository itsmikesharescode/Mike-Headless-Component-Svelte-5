<script lang="ts">
	import type { Toast } from './types';
	import { fromToastState } from './toast-runes.svelte';
	import { X } from 'lucide-svelte';

	type Props = {
		toast: Toast;
	};

	let { toast }: Props = $props();
	const toastState = fromToastState();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onmouseenter={() => toastState.clearTime(toast.id)}
	onmouseleave={() => toastState.addTimeOut(toast.id)}
	class="relative gap-[10px] p-[10px] flex w-[20rem] flex-col justify-center rounded-md border border-gray-500 bg-black shadow-md text-white"
>
	<button class="absolute right-2 top-2 size-5" onclick={() => toastState.remove(toast.id)}>
		<span class="sr-only">Close toast</span>
		<span class="">
			<X class="w-[15px] h-[15px]" />
		</span>
	</button>
	<div class="flex items-center gap-[10px]">
		<span class="text-sm font-medium">{toast.title}</span>
		<span class="w-[8px] h-[8px] rounded-full {toast.error ? 'bg-red-500' : 'bg-green-500'}"></span>
	</div>
	<span class="text-xs pb-[10px]">{toast.message}</span>
</div>
