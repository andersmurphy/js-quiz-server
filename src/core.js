import {fromJS} from 'immutable'

export const setQuestions = (state, questions) =>
  state.set('questions', fromJS(questions))

export const next = (state) => {
  const questions = state.get('questions')
  return state.merge({
    current_question: questions.take(1),
    questions: questions.skip(1)
  })
}

export const selectAnswer = (state, answer) => {
  return state.setIn(
    ['current_question', 'selected_answer'],
    answer
  )
}
