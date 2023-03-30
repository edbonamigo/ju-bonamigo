module.exports = {
	keepNumbers(text) {
		// To match any character that is not a digit
		const regex = /[^0-9]/g
		//replace any non-digit character with an empty string
		const sanitized = text.replace(regex, '')

		return sanitized
	},
}
