// place files you want to import through the `$lib` alias in this folder.
export const getWordRange = (text: string, range: number) => {
	const words = text.split(/\s+/);
	if (words.length > range) {
		const firstXWords = words.slice(0, range);
		const result = firstXWords.join(' ') + '... ';
		return result;
	} else {
		const result = text;
		return result;
	}
};

export const getLetterRange = (text: string, range: number) => {
	const letters = text.split('');
	const firstXLetters = letters.slice(0, range);
	const result = firstXLetters.join('');
	return result;
};

export const toSentenceCase = (str: string) => {
	// Trim the string to remove extra spaces
	str = str.trim();

	// Convert the first character to uppercase and the rest to lowercase
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
