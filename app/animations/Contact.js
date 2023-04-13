import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Hero {
	constructor() {
		this.contact = document.querySelector('.contact')
		this.image = document.querySelector('.contact__image_wrapper')
		this.socialMediaTitle = document.querySelector('.--social-media')
		this.phoneTitle = document.querySelector('.--phone')
		this.tl = undefined
	}

	triggers() {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: this.contact,
					start: 'top 75%',
					end: 'bottom bottom',
					toggleActions: 'play pause pause reverse',
					// markers: true,
				},
			})
			.fromTo(
				[this.image],
				{
					duration: 1,
					autoAlpha: 0,
					stagger: 0.2,
					ease: 'expo.out',
				},
				{
					autoAlpha: 1,
				}
			)

		gsap
			.timeline({
				scrollTrigger: {
					trigger: this.contact,
					start: 'top bottom',
					end: 'bottom bottom',
					scrub: true,
					// markers: true,
				},
			})
			.fromTo(this.socialMediaTitle, { x: '30%' }, { x: '4%' }, 0)
			.fromTo(this.phoneTitle, { x: '50%' }, { x: '16%' }, 0)

		return this
	}

	destroy() {
		this.tl.kill()
		return null
	}
}
