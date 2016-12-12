import {expect} from 'chai'
import {List, Map} from 'immutable'

import {parseQuestionsCSV} from '../src/parser'


describe('parser', () => {

  it('parses question csv to json', () => {
    const filePath = 'test/test_questions.csv'

    const questions = parseQuestionsCSV(filePath)

    expect(questions).to.equal(List.of(
      Map({
        question: 'What do you do when payment is overdue?',
        answers: Map({
          'Hit the phones every day until I get paid': 15,
          'Send an occasional gentle reminder': 10,
          'Wait and hope for the best': 5,
          'Sign off my emails to them “regards” rather than “kind regards”. That’ll show ‘em.': 0
        })
      }),
      Map({
        question: 'How do you receive payment?',
        answers: Map({
          'Cash, credit card or bank transfer': 15,
          'Cash only': 10,
          'Cheque': 5,
          'Camels': 0
        })
      })
    ))
  })

})
