import {NumberUtil} from 'klg-number'

export function fixNumber (schema, options) {
  schema.pre('save', function (next) {
    this._doc = NumberUtil.fixObj(this._doc)
    next()
  })

  schema.pre('update', function (next) {
    this._update = NumberUtil.fixObj(this._update)
    next()
  })

  schema.pre('findOneAndUpdate', function (next) {
    this._update = NumberUtil.fixObj(this._update)
    next()
  })
}
