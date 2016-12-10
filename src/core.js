import {fromJS, List} from 'immutable'

export const setQuestions = (state, questions) =>
  state.set('questions', fromJS(questions))

export const setName = (state, name) =>
  state.set('name', name)

const nextQuestion = (state) => {
  const questions = state.get('questions')
  return state.merge({
    current_question: questions.get(0),
    questions: questions.skip(1)
  })
}

const scoreQuestion = (state) => {
  const selectedAnswer = state.getIn(['current_question', 'selected_answer'])
  const questionScore = state.getIn(['current_question', 'answers', selectedAnswer])
  return state.update('total_score',
    0,
    totalScore => totalScore + questionScore
  ).remove('current_question')
}

const moveUnansweredQuestion = (state) => {
  return state.updateIn(['questions'],
    List(),
    list => list.push(state.get('current_question'))
  ).remove('current_question')
}

export const next = (state) => {
  if (state.hasIn(['current_question', 'selected_answer'])) {
    return nextQuestion(scoreQuestion(state))
  } else if (state.has('current_question')){
    return nextQuestion(moveUnansweredQuestion(state))
  } else {
    return nextQuestion(state)
  }
}

export const selectAnswer = (state, answer) => {
  return state.setIn(
    ['current_question', 'selected_answer'],
    answer
  )
}
