import {setQuestions, setName, next, selectAnswer} from './core'
import {Map} from 'immutable'

const actions = Map({
  'SET_QUESTIONS': (state, action) => setQuestions(state, action.questions),
  'SET_NAME': (state, action) => setName(state, action.name),
  'NEXT': (state, action) => next(state),
  'SELECT_ANSWER': (state, action) => selectAnswer(state, action.answer)
})

export default (state, action) => {
  return actions.get(action.type, () => state)(state, action)
}
