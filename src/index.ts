import { MinHeap, IGetCompareValue } from '@datastructures-js/heap'

interface Ip {
	address: string
	count: number
}

let ips = new Map<string, Ip>()

const compare_ip_value: IGetCompareValue<[string, number]> = ([address, count]) => count
let top_hundred = new MinHeap(compare_ip_value)

const clean_stale = () => {
	let root = top_hundred.root()
	if (!root) return
	const [root_address, root_count] = root
	let ip_in_map = ips.get(root_address)
	if (root_count === ip_in_map?.count) return

	top_hundred.extractRoot()
	clean_stale()
}

const request_handled = (ip_adress: string) => {
	const stored_ip = ips.get(ip_adress)

	if (!stored_ip) {
		const new_ip: Ip = {
			address: ip_adress,
			count: 1,
		}
		ips.set(new_ip.address, new_ip)
		clean_stale()
		top_hundred.insert([new_ip.address, new_ip.count])
		return
	}

	stored_ip.count++

	if (top_hundred.size() > 100) {
		const [root_address, root_count] = top_hundred.root() as [string, number]
		if (stored_ip.count > root_count) {
			top_hundred.extractRoot()
			clean_stale()
			top_hundred.insert([stored_ip.address, stored_ip.count])
		}
	} else {
		clean_stale()
		top_hundred.insert([stored_ip.address, stored_ip.count])
	}
}

request_handled('145.87.2.109')
request_handled('145.87.2.108')
request_handled('145.87.2.109')
request_handled('145.87.2.109')
request_handled('145.87.2.108')

console.log(ips)
console.log([...top_hundred])
