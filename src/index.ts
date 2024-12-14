import { MinHeap, IGetCompareValue } from '@datastructures-js/heap'

interface Ip {
	address: string
	count: number
}

let ips = new Map<string, Ip>()

const compare_ip_value: IGetCompareValue<Ip> = (ip: Ip) => ip.count
let top_hundred = new MinHeap(compare_ip_value)

const request_handled = (ip_adress: string) => {
	const stored_ip = ips.get(ip_adress)

	if (!stored_ip) {
		const new_ip: Ip = {
			address: ip_adress,
			count: 1,
		}
		ips.set(new_ip.address, new_ip)
		top_hundred.insert(new_ip)
		return
	}

	stored_ip.count++

	if (top_hundred.size() > 100) {
		if (stored_ip.count > top_hundred.root()!.count) {
			top_hundred.extractRoot()
			top_hundred.insert(stored_ip)
		}
	} else {
		top_hundred.insert(stored_ip)
	}
}

request_handled('145.87.2.108')
request_handled('145.87.2.109')
request_handled('145.87.2.109')
console.log(ips)
console.log([...top_hundred])
