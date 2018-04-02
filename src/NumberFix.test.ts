import {Model, Schema, Document} from 'mongoose'
import * as mongoose from 'mongoose'
import {fixNumber} from './NumberFix'
import {TestHelper} from './TestHelper'

interface IUser extends Document {
  name: string
  amount: number
}

describe('NumberFix test', async function () {
  let User: Model<IUser>

  beforeAll(async () => {
    // mockgoose 会下载一个 mongodb 实例，所以这里要等待比较久
    jest.setTimeout(200e3)

    // 设置插件
    mongoose.plugin(fixNumber)

    // User Schema
    const modelName = 'User'
    const userSchema = new Schema({
      name: {type: String, require: true, index: true},
      amount: Number
    })
    const db = await TestHelper.initMockDbConnection()
    User = db.model<IUser>(modelName, userSchema, modelName)
  })

  it(' test save ', async () => {
    await new User({name: 'ab', amount: 0.1 + 0.2}).save()
    const user = await User.findOne()
    expect(user.name).toEqual('ab')
    expect(user.amount).toEqual(0.3)
  })

  it(' update ', async () => {
    await new User({name: 'ab', amount: 4}).save()
    await User.update({name: 'ab'}, {$set: {amount: 0.1 + 0.2}})

    const user = await User.findOne({name: 'ab'})
    expect(user.name).toEqual('ab')
    expect(user.amount).toEqual(0.3)
  })

  it(' findOneAndUpdate ', async () => {
    await new User({name: 'ab', amount: 4}).save()
    await User.findOneAndUpdate({name: 'ab'}, {$set: {amount: 0.1 + 0.2}})

    const user = await User.findOne({name: 'ab'})
    expect(user.name).toEqual('ab')
    expect(user.amount).toEqual(0.3)
  })

  afterAll((done) => {
    mongoose.disconnect(done)
  })
})
