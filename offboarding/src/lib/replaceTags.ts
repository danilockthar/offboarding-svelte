export const replaceTags = (text: string, tags: Record<any, string>): string => {
	const regx = /{{[a-zA-Z0-9]*}}/g;
	const checkTags = regx.test(text);
	console.log(checkTags);
	if (!checkTags || Object.keys(tags).length <= 0) return text;

	const matchs: any = text.match(/{{[\w]*}}/g);
	for (const match of matchs) {
		const matchKey = match.replace('{{', '').replace('}}', '').trim();
		if (tags[matchKey] != undefined) text = text.replace(match, tags[matchKey]);
	}
	return text;
};
