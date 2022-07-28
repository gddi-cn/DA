export const DrawSvg = {
  version: '3.10.4',
  name: 'drawSVG',
  constructor (element, modes) {
    // Options
    this.options = {
      WORDS: 'words',
      CHARS: 'chars'
    }

    // Properties
    this.words = []
    this.chars = []

    // Get given element with jQuery
    this.element = element
    // Modes like ['words', 'chars']
    this.modes = modes

    // Init Wrap Functions
    this.init()
  },

  // Init Function
  init () {
    // Elements each loop
    console.log(this.element, 1717)
  }
}
