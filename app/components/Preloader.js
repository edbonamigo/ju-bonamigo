import Component from '../classes/Component'

import each from 'lodash/each'
import GSAP from 'gsap'
import lazyLoad from 'utils/lazy-load'
import { split } from 'utils/text'

export default class Preloader extends Component {
	constructor() {
		super({
			element: '.preloader',
			elements: {
				title: '.preloader__text',
				number: '.preloader__number',
				numberText: '.preloader__number__text',
				images: document.querySelectorAll('.js-lazy-load'),
			},
		})

		split({ element: this.elements.title })
		this.spans = GSAP.utils.toArray('.preloader span')

		this.i = 0
		this.length = this.elements.images.length

		lazyLoad(this.trackProgress.bind(this))
	}

	trackProgress() {
		this.i += 1
		const percentLoaded = Math.round((this.i / this.length) * 100)

		this.elements.numberText.innerHTML = `${percentLoaded}%`

		if (percentLoaded === 100) {
			this.onLoaded()
		}
	}

	onLoaded() {
		return new Promise((resolve) => {
			this.hidePreloader = GSAP.timeline({
				delay: 2,
			})

			this.hidePreloader.to([this.spans, this.elements.numberText], {
				duration: 2,
				ease: 'expo.out',
				stagger: 0.02,
				autoAlpha: 0,
				y: '100%',
			})

			this.hidePreloader.to(
				this.element,
				{
					duration: 2,
					ease: 'expo.out',
					autoAlpha: 0,
				},
				'-=1'
			)

			this.hidePreloader.call((_) => {
				this.emit('completed')
			})
		})
	}
}
