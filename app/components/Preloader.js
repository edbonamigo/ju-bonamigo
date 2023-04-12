import EventEmitter from 'events'

import GSAP from 'gsap'
import lazyLoad from 'utils/lazy-load'
import { split } from 'utils/text'

export default class Preloader extends EventEmitter {
	constructor() {
		super()

		this.preloader = document.querySelector('.preloader')
		this.text = document.querySelector('.preloader__text')
		this.number = document.querySelector('.preloader__number')
		this.numberText = document.querySelector('.preloader__number__text')
		this.images = document.querySelectorAll('[data-lazy="img"]')
		this.title = document.querySelector('.hero__title')
		this.subtitle = document.querySelector('.hero__subtitle')

		split({ element: this.text })
		this.spans = GSAP.utils.toArray('.preloader span')

		this.i = 0
		this.length = this.images.length

		lazyLoad(this.trackProgress.bind(this))
	}

	trackProgress() {
		this.i += 1
		const percentLoaded = Math.round((this.i / this.length) * 100)

		this.numberText.innerHTML = `${percentLoaded}%`

		if (percentLoaded === 100) {
			this.onLoaded()
			this.emit('loaded')
		}
	}

	onLoaded() {
		return new Promise((resolve) => {
			this.hidePreloader = GSAP.timeline({
				delay: 1.5,
			})

			this.hidePreloader.to([this.spans, this.numberText], {
				duration: 1.6,
				ease: 'expo.out',
				stagger: 0.02,
				autoAlpha: 0,
				y: '100%',
			})

			this.hidePreloader.to(
				this.preloader,
				{
					duration: 1.2,
					ease: 'expo.out',
					autoAlpha: 0,
				},
				'-=0.2'
			)

			if (this.title) {
				this.hidePreloader.from(
					this.title,
					{
						duration: 0.8,
						ease: 'expo.out',
						y: '10%',
						autoAlpha: 0,
					},
					'-=1'
				)
				this.hidePreloader.from(
					this.subtitle,
					{
						duration: 0.8,
						ease: 'expo.out',
						y: '30%',
						autoAlpha: 0,
					},
					'-=0.9'
				)
			}

			this.hidePreloader.call((_) => {
				document.documentElement.classList.remove('--preloader')
				this.emit('completed')
				this.hidePreloader.kill()
			})
		})
	}
}
