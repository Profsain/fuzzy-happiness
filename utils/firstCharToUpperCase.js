// convert first character to uppercase
const initialToUpperCase = (word) => {
    if (!word) {
        return ''; // Return empty string for undefined or empty inputs
    }
    const newWord = word[0].toUpperCase() + word.slice(1);
    return newWord;
}

export default initialToUpperCase;