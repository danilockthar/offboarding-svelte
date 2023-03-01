export const containsHTML = (str: string): boolean => {
	const regex = /<[a-z][\s\S]*>/i;
	return regex.test(str);
};
