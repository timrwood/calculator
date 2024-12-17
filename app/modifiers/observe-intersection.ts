import { modifier } from 'ember-modifier'

interface ObserveIntersectionSignature {
  Element: HTMLElement
  Args: {
    Named: {}
    Positional: [IntersectionObserverCallback, IntersectionObserverInit]
  }
}

export default modifier<ObserveIntersectionSignature>(function observeIntersection(
  element,
  [callback, optionsObject],
  hashOptions,
) {
  const options = { ...optionsObject, ...hashOptions }

  const observer = new IntersectionObserver(callback, options)
  observer.observe(element)

  return function cleanupObserver() {
    observer.disconnect()
  }
})
