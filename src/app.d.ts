declare namespace App {
	interface Locals {
		vertextPrompt: (
			prompt: string
		) => Promise<{ generatedText: string; error: null } | { generatedText: null; error: string }>;
	}
}
