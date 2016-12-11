import {Map, List, fromJS} from 'immutable'
import {expect} from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {

  it('has initial state', () => {
    const action = {type: 'SET_NAME',
                        name: 'Anders'}

    const nextState = reducer(undefined, action)

    expect(nextState).to.equal(fromJS({
      name: 'Anders'
    }))
  })

  it('handles unrecognised action', () => {
    const initialState = Map()
    const action = {type: 'UNRECOGNISED'}

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(initialState)
  })

  it('handles SET_QUESTIONS', () => {
    const initialState = Map()
    const action = {type: 'SET_QUESTIONS',
                    questions: [{question: 'question1',
                                 answers: {'answerA': 10, 'answerB': 5}}]}

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      questions: [{question: 'question1',
                   answers: {'answerA': 10, 'answerB': 5}}]
    }))
  })

  it('handles SET_NAME', () => {
    const initialState = Map()
    const action = {type: 'SET_NAME',
                    name: 'Anders'}

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      name: 'Anders'
    }))
  })

  it('handles SET_MAX_SCORE', () => {
    const initialState = Map({
      questions: List.of(
        Map({
          question: 'question1',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15
          })
        }),
        Map({
          question: 'question2',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15
          })
        })
      )
    })
    const action = {type: 'SET_MAX_SCORE'}

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(Map({
      questions: List.of(
        Map({
          question: 'question1',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15
          })
        }),
        Map({
          question: 'question2',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15
          })
        })
      ),
      max_total_score: 30
    }))
  })

  it('handles NEXT', () => {
    const initialState = Map({
      questions: List.of(
        Map({
          question: 'question1',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
        }),
        Map({
          question: 'question2',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
        }))
    })
    const action = {type: 'NEXT'}

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(Map({
      questions: List.of(
          Map({
            question: 'question2',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          })),
      current_question: Map({
          question: 'question1',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
        })
      }))
  })

  it('handles SELECT_ANSWER', () => {
    const initialState = Map({
      questions: List.of(Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          })),
      current_question: Map({
          question: 'question1',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
        })
    })
    const action = {type: 'SELECT_ANSWER', answer: 'answerC'}

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(Map({
      questions: List.of(Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          })),
      current_question: Map({
          question: 'question1',
          answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15}),
          selected_answer: 'answerC'
        })
    }))
  })

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_QUESTIONS',
                      questions: [{question: 'question1',
                                   answers: {'answerA': 10, 'answerB': 5}}]},
      {type: 'SET_NAME', name: 'Anders'},
      {type: 'NEXT'},
      {type: 'SELECT_ANSWER', answer: 'answerB'},
      {type: 'SELECT_ANSWER', answer: 'answerA'},
      {type: 'NEXT'},
    ]
      const finalState = actions.reduce(reducer, Map())

      expect(finalState).to.equal(fromJS({
        questions: [],
        name: 'Anders',
        total_score: 10
      }))
  })
})
