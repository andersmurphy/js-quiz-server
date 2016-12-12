import {setQuestions, setName, next, selectAnswer, INITIAL_STATE,
  setMaxScore} from './core'
import {Map} from 'immutable'
import {parseQuestionsCSV} from './parser'

const questions = parseQuestionsCSV('questions.csv')
const resetState = setMaxScore(setQuestions(INITIAL_STATE, questions))

const actions = Map({
  'SET_QUESTIONS': (state, action) => setQuestions(state, action.questions),
  'SET_NAME': (state, action) => setName(state, action.name),
  'NEXT': (state, action) => next(state),
  'SELECT_ANSWER': (state, action) => selectAnswer(state, action.answer),
  'SET_MAX_SCORE': (state, action) => setMaxScore(state),
  'TRY_AGAIN': (state, action) => resetState
})

export default (state = INITIAL_STATE, action) => {
  return actions.get(action.type, () => state)(state, action)
}
