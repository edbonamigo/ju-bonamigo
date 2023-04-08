import EventEmitter from 'events'
import each from 'lodash/each'

export default class Component extends EventEmitter {
	constructor({ container = document, element, elements }) {
		super()

		this.container = container
		this.selector = element
		this.selectorChildren = {
			...elements,
		}

		this.create()
		this.addEventListeners()
	}

	create() {
		if (this.selector instanceof window.HTMLElement) {
			this.element = this.selector
		} else {
			this.element = this.container.querySelector(this.selector)
		}

		this.elements = {}

		each(this.selectorChildren, (entry, key) => {
			if (
				entry instanceof window.HTMLElement ||
				entry instanceof window.NodeList ||
				Array.isArray(entry)
			) {
				this.elements[key] = entry
			} else {
				this.elements[key] = this.container.querySelectorAll(entry)

				if (this.elements[key].length === 0) {
					this.elements[key] = null
				} else {
					this.elements[key] = this.container.querySelector(entry)
				}
			}
		})
	}

	addEventListeners() {}
	removeEventListeners() {}
}
