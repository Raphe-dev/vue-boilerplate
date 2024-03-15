export const bodyHelpers = {
	lock() {
		if (!document.body.classList.contains('--lock')) {
			document.body.classList.add('--lock')
		}
	},
	unlock() {
		if (document.body.classList.contains('--lock')) {
			document.body.classList.remove('--lock')
		}
	}
}