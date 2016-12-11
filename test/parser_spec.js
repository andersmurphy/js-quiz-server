import {expect} from 'chai'
import {List, Map} from 'immutable'

import {parseQuestionsCSV} from '../src/parser'


describe('parser', () => {

  it('parses question csv to json', () => {
    const filePath = 'test/test_questions.csv'

    const questions = parseQuestionsCSV(filePath)

    expect(questions).to.equal(List.of(
      Map({
        question: 'question 1?',
        answers: Map({'answer A': 15,'answer B': 10,'answer C': 5,'answer D': 0
        })
      }),
      Map({
        question: 'question 2?',
        answers: Map({'answer A': 15,'answer B': 10,'answer C': 5,'answer D': 0
        })
      })
    ))
  })

})
