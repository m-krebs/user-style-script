import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { browser } from 'wxt/browser'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isUserScriptsAvailable() {
	let version = Number(
		navigator.userAgent.match(/(Chrome|Chromium)\/([0-9]+)/)?.[2],
	)
	try {
		if (version >= 138) {
			chrome.userScripts.getScripts()
			return true
		} else {
			browser.userScripts
		}
	} catch (error) {
		return false
	}
	return true
}

type UserScriptOpts = {
	id: string
	matches: string[]
	excludeMatches: string[]
	js: string
}

export async function registerOrUpdateUserScript(opts: UserScriptOpts) {
	if (!isUserScriptsAvailable)
		throw new Error('UserScripts not available. Developer Mode is required!')

	const existingScripts = await browser.userScripts.getScripts({
		ids: [opts.id],
	})

	// TODO: cleanup
	// browser.userScripts.configureWorld({
	// 	csp: "script-src 'self'"
	// })

	const scriptObj: Browser.userScripts.RegisteredUserScript = {
		id: opts.id,
		matches: opts.matches,
		excludeMatches: opts.excludeMatches,
		js: [{ code: opts.js }],
		// world: 'MAIN'
	}

	if (existingScripts.length > 0) {
		await browser.userScripts.update([scriptObj])
	} else {
		await browser.userScripts.register([scriptObj])
	}
}

export function hashCode(string: string) {
	var hash = 0,
		i,
		chr
	if (string.length === 0) return hash
	for (i = 0; i < string.length; i++) {
		chr = string.charCodeAt(i)
		hash = (hash << 5) - hash + chr
		hash |= 0 // Convert to 32bit integer
	}
	return hash
}

export function truncateUrl(url: string, maxLength: number = 30) {
	try {
		const parsedUrl = new URL(url)

		if (url.length > maxLength) {
			return parsedUrl.protocol + '//' + parsedUrl.hostname + '...'
		} else {
			return url
		}
	} catch (error) {
		return url
	}
}
