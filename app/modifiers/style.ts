import { modifier } from 'ember-modifier'

type Style = { [key: string]: string }

interface StyleSignature {
  Element: HTMLElement
  Args: {
    Named: Style | null
    Positional: Style[]
  }
}

function applyStyles(element: HTMLElement, styles: Style) {
  Object.keys(styles).forEach(key => {
    element.style[key] = styles[key]
  })
}

export default modifier<StyleSignature>(function style(element, arrayOfStyleHashes, styleHash) {
  arrayOfStyleHashes.forEach(styles => applyStyles(element, styles))
  if (styleHash) applyStyles(element, styleHash)
})
