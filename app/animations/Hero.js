import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Hero {
	constructor(container) {
		this.hero = container.querySelector('.hero')
		this.mask = container.querySelector('.hero__image-mask')
		this.titles = container.querySelector('.hero__title_wrapper')
		this.tl = undefined
	}

	triggers() {
		this.tl = gsap
			.timeline({
				scrollTrigger: {
					trigger: this.hero,
					start: 'top top',
					end: '75% 5%',
					scrub: true,
					// markers: true,
					// onLeave: () => console.log('TODO: Show menu. Emit: "toggleMenu" [?]'),
					// onEnterBack: () => console.log('TODO: Hide menu'),
				},
			})
			.to(
				this.mask,
				{
					borderRadius: '0 0 +=45% +=45%',
					ease: 'power2.in',
					y: '-30%',
				},
				0
			)
			.to(
				this.titles,
				{
					y: '15%',
					// autoAlpha: 0,
					ease: 'power2.out',
				},
				0
			)
			.to(
				this.titles,
				{
					autoAlpha: 0,
					ease: 'power2.out',
				},
				'-=0.4'
			)

		return this
	}

	destroy() {
		this.tl.kill()
		return null
	}
}
