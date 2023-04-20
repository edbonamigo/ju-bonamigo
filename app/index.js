import '../fonts/Branch.woff'
import '../fonts/Branch.woff2'

import Lenis from '@studio-freight/lenis'
import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import Preloader from 'components/Preloader'
import lazyLoad from 'utils/lazy-load'

import {
	About, //
	Contact,
	Hero,
	Niches,
	Parallax,
} from 'animations'

class App {
	constructor() {
		this.preload()
	}

	preload() {
		this.preloader = new Preloader()
		this.preloader.once('loaded', () => this.initSPA())
		this.preloader.once('completed', () => lenis.start())
	}

	initSPA() {
		barba.hooks.beforeEnter(() => {
			lazyLoad()
		})

		barba.hooks.afterEnter(() => {
			setTimeout(() => {
				this.about = new About().triggers()
				this.contact = new Contact().triggers()
				this.parallax = new Parallax().triggers()
			}, 1000)
		})

		barba.hooks.beforeLeave(() => {
			this.about = this.about.destroy()
			this.contact = this.contact.destroy()
			this.parallax = this.parallax.destroy()
		})

		barba.init({
			views: [
				{
					namespace: 'home',
					beforeEnter({ next }) {
						this.hero = new Hero(next.container).triggers()
						this.niches = new Niches(next.container).triggers()
					},
					beforeLeave() {
						this.hero = this.hero.destroy()
						this.niches = this.niches.destroy()
					},
				},
			],
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
