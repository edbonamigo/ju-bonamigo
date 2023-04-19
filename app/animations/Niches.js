import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default class HomeNiches {
	constructor(container) {
		this.section = container.querySelector('.niches')
		this.niches = container.querySelectorAll('.niches_wrapper')
		this.tweens = []
	}

	_randomY(index) {
		var max, min
		if (index === 0) {
			max = 10
			min = 0
		} else {
			max = 20
			min = 10
		}
		var value = Math.random() * (max - min) + min
		// return [-value, value]
		return value
	}

	triggers() {
		this.niches.forEach((niche, index) => {
			this.nicheImages = niche.querySelectorAll('.niches__item')
			this.nicheTitle = niche.querySelector('.niches__link__title')
			this.spans = niche.querySelectorAll('span')

			this.imagesSlide = gsap.timeline({
				scrollTrigger: {
					trigger: niche,
					start: 'top bottom',
					end: '70% top',
					scrub: true,
				},
			})

			this.nicheImages.forEach((image, index) => {
				if (index <= 2) {
					const randomY = this._randomY(index)

					this.imagesSlide.fromTo(
						image,
						{
							x: '20%',
							yPercent: randomY,
						},
						{
							x: '-10%',
							yPercent: -randomY,
						},
						0
					)
				}
			})

			this.titlesIn = gsap
				.timeline({
					scrollTrigger: {
						trigger: niche,
						start: '0% 70%',
						end: '25% 70%',
						scrub: true,
					},
				})
				.fromTo(
					this.spans,
					{
						autoAlpha: '0',
						x: '5%',
						y: '15%',
					},
					{
						autoAlpha: '1',
						x: '0',
						y: '0',
					},
					0
				)

			this.titlesOut = gsap
				.timeline({
					scrollTrigger: {
						trigger: niche,
						start: '0% top',
						end: '25% top',
						scrub: true,
					},
				})
				.fromTo(
					this.nicheTitle,
					{
						autoAlpha: '1',
						y: '0',
						x: '0',
					},
					{
						autoAlpha: '0',
						y: '-10%',
						x: '3%',
					},
					0
				)

			this.tweens.push(this.imagesSlide)
			this.tweens.push(this.titlesIn)
			this.tweens.push(this.titlesOut)
		})

		return this
	}

	destroy() {
		this.tweens.forEach((tween) => tween.kill())
		ScrollTrigger.getAll().forEach((st) => st.kill())
		return null
	}
}
