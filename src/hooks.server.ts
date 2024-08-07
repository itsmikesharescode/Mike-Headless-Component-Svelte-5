import type { Handle } from '@sveltejs/kit';
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
	project: import.meta.env.VITE_PROJECT_ID,
	location: 'us-central1',
	googleAuthOptions: {
		credentials: {
			type: import.meta.env.VITE_TYPE,
			project_id: import.meta.env.VITE_PROJECT_ID,
			private_key_id: import.meta.env.VITE_PRIVATE_KEY_ID,
			private_key: import.meta.env.VITE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
			client_email: import.meta.env.VITE_CLIENT_EMAIL,
			client_id: import.meta.env.VITE_CLIENT_ID,
			token_url: import.meta.env.VITE_TOKEN_URI,
			universe_domain: import.meta.env.VITE_UNIV_DOMAIN
		}
	}
});

const generativeModel = vertexAI.getGenerativeModel({
	model: 'gemini-1.5-flash-001'
});

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.vertextPrompt = async (prompt: string) => {
		try {
			if (!prompt || typeof prompt !== 'string') {
				throw new Error('Invalid prompt');
			}

			const resp = await generativeModel.generateContent(prompt);
			const candidates = resp.response.candidates || [];

			if (candidates.length === 0) {
				throw new Error('No candidates found in the response');
			}

			const text = candidates[0].content.parts.map((part) => part.text).join('');

			return { generatedText: text, error: null };
		} catch (error) {
			return {
				generatedText: null,
				error: error instanceof Error ? error.message : 'Unknown error'
			};
		}
	};

	return resolve(event);
};
