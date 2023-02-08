/* export const replaceTags = (text: string, tags: Record<any, string>): string => {
	const regx = /{{[a-zA-Z0-9]*}}/g;
	const checkTags = regx.test(text);
	if (!checkTags || Object.keys(tags).length <= 0) return text;

	const matchs: any = text.match(/{{[\w]*}}/g);
	for (const match of matchs) {
		const matchKey = match.replace('{{', '').replace('}}', '').trim();
		if (tags[matchKey] != undefined) text = text.replace(match, tags[matchKey]);
	}
	return text;
}; */

export function replaceTags(text: string, replacements: Record<any, string>) {
	// Inicializar resultado con el texto original
	let result = text;
	// Iterar a través de las palabras a reemplazar
	for (const placeholder in replacements) {
		// Obtener la palabra de reemplazo correspondiente
		const replacement = replacements[placeholder];
		// Reemplazar el placeholder con la palabra de reemplazo en el resultado
		result = result.replace(new RegExp(`{{${placeholder}}}`, 'g'), replacement);
	}
	// Devolver el texto resultante después de todos los reemplazos
	return result;
}
