import {makeStore} from './src/store'
import {startServer} from './src/server'
import {parseQuestionsCSV} from './src/parser'

export const store = makeStore()
startServer(store)

store.dispatch({
  type: 'SET_QUESTIONS',
  questions: parseQuestionsCSV('questions.csv')
})
store.dispatch({
  type: 'SET_MAX_SCORE'
})
