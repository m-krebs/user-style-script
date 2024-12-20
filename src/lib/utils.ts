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
	if (!isUserScriptsAvailable) return;

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
