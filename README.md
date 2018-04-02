# klg-mongoose-number-fix
a mongoose plugin for fix number like 0.30000000000000004 to 0.3

## QuickStart

```
npm i klg-mongoose-number-fix --save
```

```
import {fixNumber} from 'klg-mongoose-number-fix'
// 设置全局插件
mongoose.plugin(fixNumber)
```

### 效果

```
await new User({name: 'ab', amount: 0.1 + 0.2}).save()
const user = await User.findOne()
expect(user.name).toEqual('ab')
expect(user.amount).toEqual(0.3)
```
如果不使用插件，写入 db 的数据将是 user.amount === 0.30000000000000004

### Test

```bash
$ npm i
$ npm test
```

### 原理
配置 mongoose 全局插件，过滤所有的 save update 请求，在写入 db 之前 fix number