import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isUserScriptsAvailable() {
	try {
		browser.userScripts;
	} catch (error) {
		return false;
	}
	return true;
};

type UserScriptOpts = {
	id: string
	matches: string[]
	js: string
}

export async function createUserScript(opts: UserScriptOpts) {
	if (!isUserScriptsAvailable) throw new Error("UserScripts not available. Developer Mode is required!");

	const existingScripts = await browser.userScripts.getScripts({ ids: [opts.id] });

	browser.userScripts.configureWorld({
		csp: "script-src 'self'"
	})

	const scriptObj: browser.userScripts.RegisteredUserScripts = {
		id: opts.id,
		matches: opts.matches,
		js: [{ code: opts.js }],
		world: 'MAIN'
	}

	if (existingScripts.length > 0) {
		await browser.userScripts.update([
			scriptObj,
		]);
	} else {
		await browser.userScripts.register([
			scriptObj,
		]);
	}
}

export function hashCode(string: string) {
	var hash = 0,
		i, chr;
	if (string.length === 0) return hash;
	for (i = 0; i < string.length; i++) {
		chr = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}
