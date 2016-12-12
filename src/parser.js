import {fromJS, Stack, List, Map, Range} from 'immutable'
import fs from 'fs'
import path from 'path'

const extractPoints = (string) =>
  parseInt(string.split(" ")[0])

const createAnswerTupples = (line, header) =>
  Range(1, 5).map((index) => [line.get(index), extractPoints(header.get(index))])

const splitsOnCommasNotInQuotes = (line) =>
  line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)

const removesQuotes = (line) =>
  line.map(answer => answer.replace(/"/g,''))

export const parseQuestionsCSV = (filePath) => {
  const lines = fromJS(fs.readFileSync(filePath, 'utf8')
      .trim()
      .split('\n')
      .map(line => splitsOnCommasNotInQuotes(line))
      .map(line => removesQuotes(line))).toStack()
  const header = lines.peek()
  const body = lines.pop()

  const output = body.reduce((questions, line) => {
    return questions.push(Map([
      ['question', line.get(0)],
      ['answers', Map(createAnswerTupples(line, header))]
    ]))
  }, List())
  return output
}
