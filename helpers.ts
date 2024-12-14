import type { Ip } from './interfaces'

export const push_to_heap = (heap: Ip[], ip_object: Ip) => {
	heap.push(ip_object)
	let index = heap.length - 1

	while (index > 1 && heap[index] < heap[Math.floor(index / 2)]) {
		let temp = heap[index]
		heap[index] = heap[Math.floor(index / 2)]
	}
}
