import '../fonts/Branch.woff'
import '../fonts/Branch.woff2'

import Preloader from 'components/Preloader'

class App {
	constructor() {
		this.initPreloader()
	}

	initPreloader() {
		this.preloader = new Preloader()
		this.preloader.once('completed', this.initPage.bind(this))
	}

	initPage() {
		console.log('initPage')
	}
}

new App()
