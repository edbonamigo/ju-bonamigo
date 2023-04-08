import '../fonts/Branch.woff'
import '../fonts/Branch.woff2'

import Lenis from '@studio-freight/lenis'
import barba from '@barba/core'

import Preloader from 'components/Preloader'
import lazyLoad from 'utils/lazy-load'

import { Hero } from 'animations'

class App {
	constructor() {
		this.preload()
	}

	preload() {
		this.preloader = new Preloader()
		this.preloader.once('loaded', this.createAnimations.bind(this))
		this.preloader.once('completed', this.initPage.bind(this))
	}

	createAnimations() {
		this.hero = new Hero()
	}

	initPage() {
		barba.hooks.once(() => setTimeout(() => window.scrollTo(0, 0), 100))

		barba.hooks.beforeEnter((data) => {
			smoothScroll.start()
			lazyLoad()
		})

		barba.hooks.afterEnter((data) => {
			this.hero.border()

			this.hero.createTriggers()
		})

		barba.init({
			// TODO: ONCE: scroll on top!

			// Disable links when transitioning.
			preventRunning: true,
		})
	}
}

/**
 * Smooth Scroll.
 */
const smoothScroll = new Lenis()

window.lenis = smoothScroll
smoothScroll.stop()

function raf(time) {
	smoothScroll.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/**
 * Entry point.
 */
new App()
