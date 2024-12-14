let ips = new Map<string, ip>()
let top_hundred: ip[] = []

const request_handled = (ip_adress: string) => {
	const stored_ip = ips.get(ip_adress)

	if (!stored_ip) {
		const new_ip: ip = {
			address: ip_adress,
			count: 1,
		}
		ips.set(new_ip.address, new_ip)
		return
	}

	stored_ip.count++

	if (top_hundred.length > 100) {
		const least_frequency_ip = top_hundred[1]
		if (stored_ip.count > least_frequency_ip.count) {
		}
	}
}

request_handled('145.87.2.108')
request_handled('145.87.2.109')
request_handled('145.87.2.109')
console.log(ips)
