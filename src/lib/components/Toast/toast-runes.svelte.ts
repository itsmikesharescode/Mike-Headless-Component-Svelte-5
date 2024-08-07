import { getContext, onDestroy, setContext } from 'svelte';
import type { Toast } from './types';

export class ToastState {
	toasts = $state<Toast[]>([]);
	toastToTimeoutMap = new Map<string, number>();

	constructor() {
		onDestroy(() => {
			for (const timeout of this.toastToTimeoutMap.values()) {
				clearTimeout(timeout);
			}
			this.toastToTimeoutMap.clear();
		});
	}

	success(title: string, message: string, durationMs = 5000) {
		const id = crypto.randomUUID();
		this.toasts.push({
			id,
			title,
			message,
			error: false
		});

		this.toastToTimeoutMap.set(
			id,
			setTimeout(() => {
				this.remove(id);
			}, durationMs)
		);
	}

	error(title: string, message: string, durationMs = 5000) {
		const id = crypto.randomUUID();
		this.toasts.push({
			id,
			title,
			message,
			error: true
		});

		this.toastToTimeoutMap.set(
			id,
			setTimeout(() => {
				this.remove(id);
			}, durationMs)
		);
	}

	remove(id: string) {
		const timeout = this.toastToTimeoutMap.get(id);
		if (timeout) {
			clearTimeout(timeout);
			this.toastToTimeoutMap.delete(id);
		}
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
	}

	clearTime(id: string) {
		const timeout = this.toastToTimeoutMap.get(id);
		clearTimeout(timeout);
		this.toastToTimeoutMap.delete(id);
	}

	addTimeOut(id: string) {
		if (!this.toastToTimeoutMap.has(id)) {
			this.toastToTimeoutMap.set(
				id,
				setTimeout(() => {
					this.remove(id);
				}, 1500)
			);
		}
	}
}

const TOAST_KEY = Symbol('TOAST');

export function initToast() {
	return setContext(TOAST_KEY, new ToastState());
}

export function fromToastState() {
	return getContext<ReturnType<typeof initToast>>(TOAST_KEY);
}
