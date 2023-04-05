export default function lazyLoad(callback = () => {}) {
	const images = document.querySelectorAll('[data-lazy="img"]')

	if (images) {
		images.forEach((img) => {
			img.onload = () => callback()
			img.src = img.dataset.src
			img.removeAttribute('data-lazy')
		})
	}
}
