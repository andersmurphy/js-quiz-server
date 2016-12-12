import {fromJS, List, Map} from 'immutable'

export const INITIAL_STATE = Map({total_score: 0, name: ''})

export const setQuestions = (state, questions) =>
  state.set('questions', fromJS(questions))

export const setName = (state, name) =>
  state.set('name', name)

export const setMaxScore = (state) => {
  const numberOfQuestions = state.get('questions').size
  const scores = state.get('questions')
                            .first()
                            .get('answers')
                            .valueSeq()
                            .toArray()
  const highestScore = Math.max.apply(null, scores)
  return state.set('max_score', numberOfQuestions * highestScore)
}

const nextQuestion = (state) => {
  const questions = state.get('questions')
  if (questions.isEmpty()) {
    return state.set('current_question', Map())
  } else {
    return state.merge({
      current_question: questions.get(0),
      questions: questions.skip(1)
    })
  }
}

const scoreQuestion = (state) => {
  const selectedAnswer = state.getIn(['current_question', 'selected_answer'])
  const questionScore = state.getIn(['current_question', 'answers', selectedAnswer])
  return state.update('total_score',
    0,
    totalScore => totalScore + questionScore
  )
}

const moveUnansweredQuestion = (state) => {
  if(state.get('current_question').isEmpty()) {
    return state
  } else {
    return state.updateIn(['questions'],
      List(),
      list => list.push(state.get('current_question'))
    )
  }
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
