import moxios from 'moxios'
import Http from '../'

jest.dontMock('../')

let fetch

beforeEach(() => {
  moxios.install()
  fetch = new Http({
    axios: {
      timeout: 4000
    }
  })
})

afterEach(() => {
  fetch = null
  moxios.uninstall()
})

describe('http:api', () => {

  test('get is ok', async () => {
    moxios.stubOnce('GET', '/api/aa', {
      status: 200,
      response: {
        code: 0,
        data: 'hello word'
      }
    })

    const res = await fetch.get('aa')

    expect(res).toEqual({
      code: 0,
      data: 'hello word'
    })
    
  })
})
