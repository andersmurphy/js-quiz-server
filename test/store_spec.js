import {Map, fromJS} from 'immutable'
import {expect} from 'chai'

import {makeStore} from '../src/store'

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore()
    expect(store.getState()).to.equal(Map({total_score: 0, name: ''}))

    store.dispatch({
      type: 'SET_NAME',
      name: 'Anders'
    })
    expect(store.getState()).to.equal(fromJS({
      name: 'Anders',
      total_score: 0
    }))
  })

})
