export default function lazyLoad(callback = () => {}) {
	const images = document.querySelectorAll('.js-lazy-load')

	if (images) {
		images.forEach((img) => {
			img.onload = () => callback()
			img.src = img.dataset.src
			img.classList.remove('.js-lazy-load')
		})
	}
}
