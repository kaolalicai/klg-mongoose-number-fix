import * as mongoose from 'mongoose'
import {Connection, Document, Model} from 'mongoose'
import {Mockgoose} from 'mockgoose'

/**
 * todo 改成 npm module
 */
export class TestHelper {
  static async initMockDbConnection () {
    return new Promise<Connection>((resolve, reject) => {
      const mockgoose = new Mockgoose(mongoose)
      // mockgoose.helper.setDbVersion('3.2.1')
      mockgoose.prepareStorage().then(() => {
        console.log('enter prepareStorage')
        const db = mongoose.createConnection('mongodb://abb:27017/test')
        db.on('connected', () => {
          console.log('enter connected')
          console.log(`mongodb connected successfully`)
          resolve(db)
        })

        db.on('error', err => {
          console.log('db err', err)
          reject(err)
        })
        db.on('disconnected', () => {
          console.log('db disconnected')
        })
      })
    })
  }
}
