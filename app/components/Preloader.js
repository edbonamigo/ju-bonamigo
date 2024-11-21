import EventEmitter from 'events'

import GSAP from 'gsap'
import lazyLoad from 'utils/lazy-load'
import { split } from 'utils/text'

export default class Preloader extends EventEmitter {
  constructor() {
    super()

    this.preloader = document.querySelector('.preloader')
    this.text = document.querySelector('.preloader__text')
    this.number = document.querySelector('.preloader__number')
    this.numberText = document.querySelector('.preloader__number__text')
    this.images = document.querySelectorAll('[data-lazy="img"]')
    this.image = GSAP.utils.toArray(['.hero__image', '.photoshoot__hero__image'])
    this.title = GSAP.utils.toArray(['.hero__title', '.photoshoot__hero__title'])
    this.subtitle = GSAP.utils.toArray(['.hero__subtitle', '.photoshoot__hero__subtitle'])
    this.active = true

    split({ element: this.text })
    this.spans = GSAP.utils.toArray('.preloader span')

    this.i = 0
    this.length = this.images.length

    lazyLoad(this.trackProgress.bind(this))
  }

  trackProgress() {
    this.i += 1
    const percentLoaded = Math.round((this.i / this.length) * 100)

    this.numberText.innerHTML = `${percentLoaded}%`

    if (percentLoaded === 100) {
      this.hide()
      this.emit('loaded')
    }
  }

  transition(next) {
    this.active = true

    return GSAP.timeline({
      ease: 'Power2.in',
      onComplete: () => this.hide(next)
    })
      .to(this.preloader, {
        duration: .05,
        autoAlpha: 1
      }, '0')
      .to(this.spans, {
        duration: .02,
        autoAlpha: 1,
        skewX: '0deg',
        y: 0
      }, '0')
  }

  hide(next) {
    return new Promise((resolve) => {
      let introTl = this.introHero(next)

      this.hideTl = GSAP.timeline({
        delay: 1,
        ease: 'power2',
        duration: 1,
        onComplete: () => {
          introTl.play()
        }
      })
        .to([this.spans, this.numberText], {
          stagger: 0.02,
          autoAlpha: 0,
          y: '100%',
          skewX: '6deg',
        })
        .to(this.preloader, {
          autoAlpha: 0,
        }, '-=0.2')

      this.hideTl.call((_) => {
        this.emit('completed')
        this.active = false
        this.hideTl.kill()
      })
    })
  }

  introHero(next) {
    if (next) {
      this.image = GSAP.utils.toArray(['.hero__image', '.photoshoot__hero__image'])
      this.title = GSAP.utils.toArray(['.hero__title', '.photoshoot__hero__title'])
      this.subtitle = GSAP.utils.toArray(['.hero__subtitle', '.photoshoot__hero__subtitle'])
    }

    return GSAP.timeline({
      ease: 'power2.out',
      paused: true,
    })
      .from(this.image, {
        duration: .4,
        scale: 1.05
      }, '0')
      .from(this.title, {
        duration: .4,
        y: '10%',
        autoAlpha: 0
      }, '0')
      .from(this.subtitle, {
        duration: .3,
        y: '30%',
        autoAlpha: 0
      }, '-=0.3')
  }
}
