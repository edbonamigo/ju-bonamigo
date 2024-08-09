import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Hero {
  constructor() {
    this.about = document.querySelector('.about')
    this.image = document.querySelector('.about__image_wrapper')
    this.text = gsap.utils.toArray('.about__text p')
    this.tl = undefined
  }

  triggers() {
    this.tl = gsap
      .timeline({ scrollTrigger: {
        trigger: this.about,
        start: 'top center',
        end: 'center 30%',
        toggleActions: 'play complete complete reverse',
        // markers: true,
      }})
      .fromTo([this.image, this.text], {
          duration: .6,
          autoAlpha: 0,
          x: '4%',
          ease: 'expo.out',
        }, {
          duration: .6,
          autoAlpha: 1,
          x: '0',
          stagger: 0.2, // apply stagger here
        })

    return this
  }

  destroy() {
    this.tl.kill()

    ScrollTrigger.getAll().forEach((st) => st.kill())
    return null
  }
}
