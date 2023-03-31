import '../fonts/Branch.woff'
import '../fonts/Branch.woff2'

import Preloader from 'components/Preloader'

import barba from '@barba/core'
import lazyLoad from 'utils/lazyLoad'

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
		})

		barba.init({
			// disable links when transitioning
			preventRunning: true,
		})
	}
}

new App()
