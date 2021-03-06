//import zip from 'node-zip'
import path from 'path'
import mime from 'mime'
import fs from 'fs'

/**
 * Download the zip archive
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export async function getBook(req, res, next){
    try {
        var file = path.normalize(__dirname + '/../..') + '/mockbook/book.zip'
        var filename = path.basename(file)
        var mimetype = mime.lookup(file)
        res.setHeader('Content-Disposition', 'attachment; filename='+filename)
        res.setHeader('Content-Type', mimetype)
        res.setHeader('Content-Length', fs.statSync(file).size)
        var filestream = fs.createReadStream(file)
        filestream.pipe(res)
    } catch (err) {
        return next(err)
    }
}

export async function isUpdate(req, res, next){
    try{
        var result = req.params.result ? false : true
        return res.status(200).send(result).end()
    }catch(err){
        return next(err)
    }
}

export async function createZip(req, res, next){
    try{
    }catch(err){
        return next(err)
    }
}