import '../fonts/Branch.woff'
import '../fonts/Branch.woff2'

import Preloader from 'components/Preloader'

import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import lazyLoad from 'utils/lazy-load'
import Lenis from '@studio-freight/lenis'

barba.use(barbaPrefetch)

class App {
	constructor() {
		this.initPreloader()
	}

	initPreloader() {
		this.preloader = new Preloader()
		this.preloader.once('completed', this.initPage.bind(this))
	}

	initPage() {
		barba.hooks.beforeEnter((data) => {
			lazyLoad()
			lenis.start()
		})

		barba.init({
			// disable links when transitioning
			preventRunning: true,
		})
	}
}

/**
 * Smooth Scroll
 */
const lenis = new Lenis()
window.lenis = lenis
lenis.stop()

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/**
 * Entry point
 */
new App()
