import '../fonts/Branch.woff'
import '../fonts/Branch.woff2'

import Lenis from '@studio-freight/lenis'
import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import Preloader from 'components/Preloader'
import lazyLoad from 'utils/lazy-load'

import { Hero } from 'animations'

class App {
	constructor() {
		this.preload()
	}

	preload() {
		this.preloader = new Preloader()
		// this.preloader.once('loaded', this.initSPA.bind(this))
		this.preloader.once('completed', this.enableScroll.bind(this))
	}

	enableScroll() {
		lenis.start()
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
const lenis = new Lenis({
	duration: 1.2,
})

function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
	lenis.raf(time * 1000)
})

window.lenis = lenis
lenis.stop()

/**
 * Entry point.
 */
new App()
