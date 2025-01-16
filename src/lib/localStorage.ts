export const set = (data: Object) => {
	browser.storage.local.set(data)
}

export const get = (data: String) => {
	browser.storage.local.get([data])
}
