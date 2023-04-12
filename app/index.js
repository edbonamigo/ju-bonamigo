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
} from 'animations'

class App {
	constructor() {
		this.preload()
	}

	preload() {
		this.preloader = new Preloader()
		this.preloader.once('loaded', () => this.initSPA())
		this.preloader.once('completed', () => scroll.start())
	}

	initSPA() {
		barba.hooks.beforeEnter(({ next }) => {
			lazyLoad()
		})

		barba.hooks.afterEnter(({ next }) => {
			setTimeout(() => {
				this.parallax = new Parallax().triggers()
			}, 1000)
		})

		barba.hooks.beforeLeave(({ next }) => {
			this.parallax = this.parallax.destroy()
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
const scroll = new Lenis({
	duration: 1.2,
})

function raf(time) {
	scroll.raf(time)
	requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

scroll.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
	scroll.raf(time * 1000)
})

window.scroll = scroll
scroll.stop()

/**
 * Entry point.
 */
new App()
