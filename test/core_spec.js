import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setQuestions, next, selectAnswer, setName} from '../src/core';

describe('application logic', () => {

  describe('setQuestions', () => {

    it('adds the questions to the state', () => {
      const state = Map()
      const questions = Map({
        'question1': Map({
          'answerA': 0,
          'answerB': 5,
          'answerC': 10,
          'answerD': 15
        }),
        'question2': Map({
          'answerA': 0,
          'answerB': 5,
          'answerC': 10,
          'answerD': 15
        })
      })

      const nextState = setQuestions(state, questions)

      expect(nextState).to.equal(Map({
        questions: questions
      }))
    })

    it('converts to immutable', () => {
      const state = Map()
      const questions = {
        'question1': {
          'answerA': 0,
          'answerB': 5,
          'answerC': 10,
          'answerD': 15
        }
      }

      const nextState = setQuestions(state, questions)

      expect(nextState).to.equal(Map({
        questions: Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          })
        })
      }))
    })

  })

  describe('next', () => {

    it('takes the next question', () => {
      const state = Map({
        questions: Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          }),
          'question2': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          })
        })
      })

      const nextState = next(state)

      expect(nextState).to.equal(Map({
        questions: Map({
            'question2': Map({
              'answerA': 0,
              'answerB': 5,
              'answerC': 10,
              'answerD': 15
            })
          }),
        current_question: Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          })
        })
      }))
    })

  })

  describe('selectAnswer', () => {

    it('creates selected answer if not present', () => {
      const state = Map({
        questions: Map({
            'question2': Map({
              'answerA': 0,
              'answerB': 5,
              'answerC': 10,
              'answerD': 15
            })
          }),
        current_question: Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          })
        })
      })

      const nextState = selectAnswer(state, 'answerC')

      expect(nextState).to.equal(Map({
        questions: Map({
            'question2': Map({
              'answerA': 0,
              'answerB': 5,
              'answerC': 10,
              'answerD': 15
            })
          }),
        current_question: Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          }),
          selected_answer: 'answerC'
        })
      }))
    })

    it('ovewrites existing selected answer if present', () => {
      const state = Map({
        questions: Map({
            'question2': Map({
              'answerA': 0,
              'answerB': 5,
              'answerC': 10,
              'answerD': 15
            })
          }),
        current_question: Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          }),
          selected_answer: 'answerA'
        })
      })

      const nextState = selectAnswer(state, 'answerC')

      expect(nextState).to.equal(Map({
        questions: Map({
            'question2': Map({
              'answerA': 0,
              'answerB': 5,
              'answerC': 10,
              'answerD': 15
            })
          }),
        current_question: Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          }),
          selected_answer: 'answerC'
        })
      }))
    })

  })

  describe('setName', () => {

    it('creates name if not present', () => {
        const state = Map({
          questions: Map({
              'question2': Map({
                'answerA': 0,
                'answerB': 5,
                'answerC': 10,
                'answerD': 15
              })
            })
        })

        const nextState = setName(state, 'Anders')

        expect(nextState).to.equal(Map({
          questions: Map({
              'question2': Map({
                'answerA': 0,
                'answerB': 5,
                'answerC': 10,
                'answerD': 15
              })
            }),
          name: 'Anders'
        }))
    })

    it('overwrites existing name if present', () => {
      const state = Map({
        questions: Map({
            'question2': Map({
              'answerA': 0,
              'answerB': 5,
              'answerC': 10,
              'answerD': 15
            })
          }),
        name: 'Anders'
      })

      const nextState = setName(state, 'Dan')

      expect(nextState).to.equal(Map({
        questions: Map({
            'question2': Map({
              'answerA': 0,
              'answerB': 5,
              'answerC': 10,
              'answerD': 15
            })
          }),
        name: 'Dan'
      }))
    })

  })

})
