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
