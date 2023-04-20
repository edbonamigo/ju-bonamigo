import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Hero {
	constructor() {
		this.contact = document.querySelector('.contact')
		this.image = document.querySelector('.contact__image_wrapper')
		this.socialMediaTitle = document.querySelector('.--social-media')
		this.phoneTitle = document.querySelector('.--phone')
		this.toggleBackgound = undefined
		this.textSlideLeft = undefined
		this.tweens = []
	}

	triggers() {
		this.toggleBackgound = gsap
			.timeline({
				scrollTrigger: {
					trigger: this.contact,
					start: 'top 75%',
					end: '75% bottom',
					scrub: true,
				},
			})
			.to(this.image, {
				autoAlpha: 1,
				ease: 'linear',
			})

		this.textSlideLeft = gsap
			.timeline({
				scrollTrigger: {
					trigger: this.contact,
					start: 'top bottom',
					end: 'bottom bottom',
					scrub: true,
					duration: 1,
				},
			})
			.fromTo(this.socialMediaTitle, { x: '30%' }, { x: '4%' }, 0)
			.fromTo(this.phoneTitle, { x: '50%' }, { x: '13%' }, 0.2)

		this.tweens.push(this.toggleBackgound)
		this.tweens.push(this.textSlideLeft)

		return this
	}

	destroy() {
		this.tweens.forEach((tween) => tween.kill())

		ScrollTrigger.getAll().forEach((st) => st.kill())
		return null
	}
}
