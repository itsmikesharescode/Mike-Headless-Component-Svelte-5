import { fail, type Actions } from '@sveltejs/kit';
// experimenting AI just ignore this
export const actions: Actions = {
	sendChatEvent: async ({ locals: { vertextPrompt }, request }) => {
		const formData = await request.formData();
		const textValue = formData.get('textValue') as string;

		const { generatedText, error } = await vertextPrompt(textValue);

		if (error) return fail(401, { msg: error });

		console.log(generatedText);
	}
};
