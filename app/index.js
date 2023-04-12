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
	Hero, //
	Parallax,
	About,
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
		barba.hooks.beforeEnter(({ next }) => {
			lazyLoad()
		})

		barba.hooks.afterEnter(({ next }) => {
			setTimeout(() => {
				this.parallax = new Parallax().triggers()
				this.about = new About().triggers()
			}, 1000)
		})

		barba.hooks.beforeLeave(({ next }) => {
			this.parallax = this.parallax.destroy()
			this.about = this.About.destroy()
		})

		barba.init({
			views: [
				{
					namespace: 'home',
					beforeEnter({ next }) {
						this.hero = new Hero(next.container).triggers()
					},
					beforeLeave() {
						this.hero = this.hero.destroy()
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
