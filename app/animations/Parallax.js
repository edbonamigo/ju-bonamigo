import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class Parallax {
	constructor() {
		this.images = document.querySelectorAll('.parallax__image')
		this.tween = undefined
		this.tweens = []
	}

	triggers() {
		this.images.forEach((img) => {
			const wrapper = img.parentElement
			this.tween = gsap.to(img, {
				y: '100%',
				scrollTrigger: {
					trigger: wrapper,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
					// markers: true,
				},
			})

			this.tweens.push(this.tween)
		})

		return this
	}

	destroy() {
		this.tweens.forEach((tween) => {
			tween.kill()
		})

		ScrollTrigger.getAll().forEach((st) => st.kill())
		return null
	}
}
