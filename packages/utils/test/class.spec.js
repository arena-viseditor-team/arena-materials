import {addClass, hasClass, removeClass} from '../index'
const { JSDOM }  = require("jsdom")
import chai from 'chai'
const assert = chai.assert

describe('UTILS Class API', () => {
  const { document } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`).window;

  describe('#addClass', () => {
    let $ele = null
    beforeEach(() => {
      let div = document.createElement('div')
      div.id = 'acDemo'
      document.body.appendChild(div)
      $ele = document.querySelector('#acDemo')
    })

    it(`addClass($ele, 'test') should be true`, () => {
      addClass($ele, 'test')
      assert(hasClass($ele, 'test'))
    })

    afterEach(() => {
      document.body.removeChild($ele)
    })
  })

  describe('#removeClass', () => {
    let $ele = null
    beforeEach(() => {
      let div = document.createElement('div')
      div.id = 'acDemo'
      div.className = 'ac-demo'
      document.body.appendChild(div)
      $ele = document.querySelector('#acDemo')
    })

    it(`removeClass($ele, 'ac-demo') should be false`, () => {
      removeClass($ele, 'ac-demo')
      assert.equal(hasClass($ele, 'ac-demo'), false)
    })

    afterEach(() => {
      document.body.removeChild($ele)
    })
  })

})