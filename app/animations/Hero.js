import Component from '../classes/Component'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animations:
 * OK - Round bottom Border on image after "lenis.start()"
 * Parallax on image and text:
 *  Image Mark, image translate down with scroll
 *  Text translate down with scroll and hide before image touch it
 *
 */

export default class Hero extends Component {
	constructor() {
		super({
			element: '.hero',
			elements: {
				mask: '.hero__image-mask',
				titles: '.hero__title_wrapper',
			},
		})
	}

	border() {
		gsap.to(this.elements.mask, {
			borderRadius: '0 0 +=15% +=15%',
			duration: 0.6,
			ease: 'power3.out',
		})
	}

	createTriggers() {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: this.element,
					start: 'top top',
					end: '75% 15%',
					scrub: true,
					// markers: true,
					onLeave: () => console.log('TODO: Show menu. Emit: "toggleMenu" [?]'),
					// onEnterBack: () => console.log('TODO: Hide menu'),
				},
			})
			.to(
				this.elements.mask,
				{
					borderRadius: '0 0 +=45% +=45%',
					ease: 'power1.in',
					y: '-30%',
				},
				0
			)
			.to(
				this.elements.titles,
				{
					y: '1%',
					autoAlpha: 0,
					ease: 'power4.out',
				},
				0
			)
	}

	getTriggers() {
		return 'Hero Scroll Triggers'
	}
}
