import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Hero {
	constructor() {
		this.about = document.querySelector('.about')
		this.image = document.querySelector('.about__image_wrapper')
		this.text = document.querySelector('.about__text')
		this.tl = undefined
	}

	triggers() {
		this.tl = gsap
			.timeline({
				scrollTrigger: {
					trigger: this.about,
					start: 'top center',
					end: 'center 30%',
					toggleActions: 'play reverse play reverse',
					// markers: true,
				},
			})
			.fromTo(
				[this.image, this.text],
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

		return this
	}

	destroy() {
		this.tl.kill()
		return null
	}
}
