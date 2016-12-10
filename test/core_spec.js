import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setQuestions} from '../src/core';

describe('application logic', () => {

  describe('setQuestions', () => {

    it('adds the questions to the state', () => {
      const state = Map()
      const questions = List.of(
        Map({
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
      }))
      const nextState = setQuestions(state, questions)

      expect(nextState).to.equal(Map({
        questions: questions
      }))
    })

    it('converts to immutable', () => {
      const state = Map()
      const questions = [
        {
        'question1': {
          'answerA': 0,
          'answerB': 5,
          'answerC': 10,
          'answerD': 15
        }
      }]
      const nextState = setQuestions(state, questions)

      expect(nextState).to.equal(Map({
        questions: List.of(
          Map({
          'question1': Map({
            'answerA': 0,
            'answerB': 5,
            'answerC': 10,
            'answerD': 15
          })
        }))
      }))
    })
  })

})
