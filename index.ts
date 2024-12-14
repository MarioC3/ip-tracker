interface ip {
	address: string
	count: number
}

let ips = new Map<string, ip>()
let top_hundred: ip[] = []

const request_handled = (ip_adress: string) => {
	const stored_ip = ips.get(ip_adress)

	if (stored_ip) {
		stored_ip.count++
		return
	}

	const new_ip: ip = {
		address: ip_adress,
		count: 1,
	}
	ips.set(new_ip.address, new_ip)
}
