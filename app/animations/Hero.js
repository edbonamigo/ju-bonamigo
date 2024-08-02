import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Hero {
  constructor(container) {
    this.hero = container.querySelector('.hero')
    this.mask = container.querySelector('.hero__image-mask')
    this.titles = container.querySelector('.hero__title_wrapper')
    this.tlHero = undefined
  }

  triggers() {
    this.tlHero = gsap
      .timeline({
        scrollTrigger: {
          trigger: this.hero,
          start: 'top top',
          end: '75% 5%',
          scrub: true,
          // markers: true,
          onLeave: () => (this.hero.style.pointerEvents = 'none'),
          onEnterBack: () => (this.hero.style.pointerEvents = 'unset'),
        },
      })
      .to( this.mask, {
          ease: 'power2.out',
          y: '-15%',
        }, 0 )
      .to( this.titles, {
          y: '15%',
          ease: 'linear',
        }, 0 )
      .to( this.titles, {
          autoAlpha: 0,
          ease: 'power2.out',
        }, '-=0.4')

    return this
  }

  destroy() {
    this.tl.kill()

    ScrollTrigger.getAll().forEach((st) => st.kill())
    return null
  }
}
