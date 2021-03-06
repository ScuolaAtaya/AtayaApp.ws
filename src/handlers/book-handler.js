/**
 * Created by giovanni on 01/03/18.
 */

import * as env from '../../config/environments'
import uuidv4 from 'uuid/v4'
import fs from 'fs'
import * as readHandler from '../handlers/read-handler'
import * as speakHandler from '../handlers/speak-handler'
import * as writeHandler from '../handlers/write-handler'
import * as finalHandler from '../handlers/final-handler'
import * as understandHandler from '../handlers/understand-handler'
import * as fileSystem from '../components/file-system'
import * as zip from '../components/zip'

function uuid() {
  return uuidv4()
}

export function getZipFilePath(bookFolder) {
  return bookFolder + '/book.zip'
}

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for (i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}


export async function getBookTimestamp(bookFolder) {
  let fullFilePath = bookFolder + '/book.json'
  let result = await fileSystem.readJsonFile(fullFilePath)
  return result.timestamp
}

export async function createZip(bookFolder, imageFolder) {
  let fullFilePath = bookFolder + '/book.zip'
  let files = []

  let jsonObj = await getJsonObj()
  let mediaArray = jsonObj.files
  delete jsonObj['files']

  let jsonPath = bookFolder + '/' + 'book.json'
  await fileSystem.writeFile(jsonPath, JSON.stringify(jsonObj))
  files.push(jsonPath)

  for (var i = 0; i < mediaArray.length; i++) {
    files.push(imageFolder + '/' + mediaArray[i])
  }

  await zip.create(fullFilePath, files)
}

export async function getJsonObj() {
  let files = []

  let speakObj = await getSpeakObj()
  let speaks = speakObj.speaks
  speakObj.files.map((file) => files.push(file))

  let writeObj = await getWriteObj()
  let writes = writeObj.writes
  writeObj.files.map((file) => files.push(file))

  let readObj = await getReadObj()
  let reads = readObj.reads
  readObj.files.map((file) => files.push(file))

  let understandObj = await getUnderstandObj()
  let understand = understandObj.understand
  understandObj.files.map((file) => files.push(file))

  let finalTestObj = await getFinalTestObj()
  let final = finalTestObj.final
  finalTestObj.files.map((file) => files.push(file))

  files = files.filter((v, i, a) => a.indexOf(v) === i)

  let result = {
    timestamp: (new Date).getTime(),
    understand: understand,
    read: reads,
    speak: speaks,
    write: writes,
    final: final,
    files: files
  }

  return result
}

export async function getSpeakObj() {
  let files = []

  let speaks = await speakHandler.find()
  speaks = speaks.map((row) => {
    let speak = row.toObject()
    speak.id = speak._id
    delete speak['_id']
    files.push(extractFile(speak.picture))
    files.push(extractFile(speak.audio))
    return speak
  })

  return { speaks: speaks, files: files }
}

export async function getWriteObj() {
  let files = []

  let writes = await writeHandler.find()
  writes = writes.map((row) => {
    let write = row.toObject()
    write.id = write._id
    delete write['_id']

    let letters = write.letters
    write.letters = letters.map((elem) => {
      let occurences = getAllIndexes(letters, elem)
      return { id: uuid(), text: elem, occurences: occurences }
    })
    write.type = letters.length > 0 ? "basic" : "advanced"
    if (letters.length == 0) {
      delete write['letters']
    }

    files.push(extractFile(write.picture))
    files.push(extractFile(write.audio))

    return write
  })

  return { writes: writes, files: files }
}

export async function getReadObj() {
  let files = []

  let reads = await readHandler.find()
  reads = reads.map((row) => {
    let read = row.toObject()
    read.id = read._id
    delete read['_id']

    let options = read.options
    options.letters = options.map((elem) => {
      elem.id = elem._id
      delete elem['_id']
      elem.read_id = read.id

      files.push(extractFile(elem.audio))

      return elem
    })

    files.push(extractFile(read.picture))

    return read
  })

  return { reads: reads, files: files }
}

export async function getUnderstandObj() {
  let files = []

  let understand = await understandHandler.find()
  understand = understand.map((row) => {
    let understandSingle = row.toObject()
    understandSingle.id = understandSingle._id
    delete understandSingle['_id']
    let understandAnswers = []

    let questions = understandSingle.questions
    understandSingle.questions = questions.map((elem) => {
      elem.id = elem._id
      delete elem['_id']
      elem.section_id = understandSingle.id
      
      elem.answers.map((qA) => {
        qA.id = qA._id
        delete qA['_id']
        qA.question_id = elem.id
        understandAnswers.push(qA)

        files.push(extractFile(qA.audio))

        return qA
      })
      delete elem['answers']

      if (elem.picture) {
        files.push(extractFile(elem.picture))
      }

      files.push(extractFile(elem.audio))

      return elem
    })

    understandSingle.answers = understandAnswers

    files.push(extractFile(understandSingle.audio))

    return understandSingle
  })

  return {understand: understand, files: files}
}

export async function getFinalTestObj() {
  let files = []

  let finalTestRowList = await finalHandler.find()
  let finalTestListObj = finalTestRowList.map((row) => {
    let finalTestObj = row.toObject()
    finalTestObj.id = finalTestObj._id
    delete finalTestObj['_id']

    let questions = finalTestObj.questions
    finalTestObj.questions = questions.map((elem)=>{
      elem.id = elem._id
      delete elem['_id']
      elem.section_id = finalTestObj.id

      if (elem.picture) {
        files.push(extractFile(elem.picture))
      }

      files.push(extractFile(elem.audio))

      return elem
    })

    return finalTestObj
  })

  return { final: finalTestListObj, files: files }
}

function extractFile(mediaObj){
  return mediaObj.value;
}