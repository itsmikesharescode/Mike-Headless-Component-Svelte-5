<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fromToastState } from './toast-runes.svelte';
	import Toast from './Toast.svelte';
	import { fade } from 'svelte/transition';

	interface Prop {
		position?: 'TopRight' | 'BottomRight' | 'TopLeft' | 'BottomLeft';
	}

	const { position = 'TopRight' }: Prop = $props();

	const toastState = fromToastState();

	const style = () => {
		if (position === 'TopRight') return 'right-2 top-2 fixed flex flex-col gap-2';
		if (position === 'TopLeft') return 'left-2 top-2 fixed flex flex-col gap-2';
		if (position === 'BottomRight') return 'right-2 bottom-2 fixed flex flex-col gap-2';
		if (position === 'BottomLeft') return 'left-2 bottom-2 fixed flex flex-col gap-2';
	};
</script>

<div class={style()}>
	{#each toastState.toasts as toast (toast)}
		<div class="" animate:flip={{ duration: 350 }} transition:fade>
			<Toast {toast} />
		</div>
	{/each}
</div>
