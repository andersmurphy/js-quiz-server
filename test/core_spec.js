import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setQuestions, next, selectAnswer, setName, setMaxScore} from '../src/core';

describe('application logic', () => {

  describe('setQuestions', () => {

    it('adds the questions to the state', () => {
      const state = Map()
      const questions = List.of(
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

      const nextState = setQuestions(state, questions)

      expect(nextState).to.equal(Map({
        questions: questions
      }))
    })

    it('converts to immutable', () => {
      const state = Map()
      const questions = [{
          question: 'question1',
          answers: {'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15}
        }]


      const nextState = setQuestions(state, questions)

      expect(nextState).to.equal(Map({
        questions: List.of(Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          }))
      }))
    })

  })

  describe('next', () => {

    it('takes the next question', () => {
      const state = Map({
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

      const nextState = next(state)

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

    it('score question if answer is selected', () => {
      const state = Map({
        questions: List.of(Map({
              question: 'question2',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            }),
            Map({
              question: 'question3',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            })),
        current_question: Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15}),
            selected_answer: 'answerC'
          })
        })

        const nextState = next(state)

      expect(nextState).to.equal(Map({
        questions: List.of(
            Map({
              question: 'question3',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            })),
        total_score: 10,
        current_question: Map({
            question: 'question2',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          })
        }))
    })

    it('unanswered questions are not scored and get moved back into the questions list', () => {
      const state = Map({
        questions: List.of(Map({
              question: 'question2',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            }),
            Map({
              question: 'question3',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            })),
        current_question: Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          })
        })

        const nextState = next(state)

      expect(nextState).to.equal(Map({
        questions: List.of(Map({
              question: 'question3',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            }),
            Map({
              question: 'question1',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            })),
        current_question: Map({
            question: 'question2',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          })
        }))
    })

    it('handles questions being empty', () => {
      const state = Map({
        questions: List(),
        total_score: 10,
        current_question: Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15}),
            selected_answer: 'answerC'
          })
        })

      const nextState = next(state)

      expect(nextState).to.equal(Map({
        questions: List(),
        total_score: 20
        }))
    })

  })

  describe('selectAnswer', () => {

    it('creates selected answer if not present', () => {
      const state = Map({
        questions: List.of(Map({
              question: 'question1',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            })),
        current_question: Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
          })
      })

      const nextState = selectAnswer(state, 'answerC')

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

    it('ovewrites existing selected answer if present', () => {
      const state = Map({
        questions: List.of(Map({
              question: 'question1',
              answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15})
            })),
        current_question: Map({
            question: 'question1',
            answers: Map({'answerA': 0,'answerB': 5,'answerC': 10,'answerD': 15}),
            selected_answer: 'answerA'
          })
      })

      const nextState = selectAnswer(state, 'answerC')

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

  })

  describe('setName', () => {

    it('creates name if not present', () => {
        const state = Map({
          questions: Map()
        })

        const nextState = setName(state, 'Anders')

        expect(nextState).to.equal(Map({
          questions: Map(),
          name: 'Anders'
        }))
    })

    it('overwrites existing name if present', () => {
      const state = Map({
        questions: Map(),
        name: 'Anders'
      })

      const nextState = setName(state, 'Dan')

      expect(nextState).to.equal(Map({
        questions: Map(),
        name: 'Dan'
      }))
    })

  })

  describe('setMaxScore', () => {

    it('creates max score if not present', () => {
        const state = Map({
          questions: Map()
        })

        const nextState = setMaxScore(state, 150)

        expect(nextState).to.equal(Map({
          questions: Map(),
          max_score: 150
        }))
    })

    it('overwrites existing max score if present', () => {
      const state = Map({
        questions: Map(),
        max_score: 150
      })

      const nextState = setMaxScore(state, 100)

      expect(nextState).to.equal(Map({
        questions: Map(),
        max_score: 100
      }))
    })

  })

})
