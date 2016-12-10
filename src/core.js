import {fromJS} from 'immutable'

export const setQuestions = (state, questions) =>
state.set('questions', fromJS(questions))
