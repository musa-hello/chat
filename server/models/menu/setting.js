const UserAccount = require('../UserAccount')
const {
  m
} = require('../../util/util')
const User = require('../User')
const user = new User()
const data = user.getData()

class UserSetting extends UserAccount {
  constructor(list, path) {
    super(list, path)
    const data = this.getData()
    this.list = this.list.map((u, index) => {
      if (!data[index]) {
        u.setting = {
          VERIFY_TYPE_ANY: 1,
          /*** 2：需要验证 **/
          VERIFY_TYPE_AUTH: 2,
          /*** 3：需要回答正确的问题 **/
          VERIFY_TYPE_ANSWER: 3,
          /*** 4：需要回答问题并由我确认 **/
          VERIFY_TYPE_CONFIRM: 4,

          userId: '',
          /**
           * 1：允许任何人添加 <br>
           * 2：需要验证 <br>
           * 3：需要回答正确的问题 <br>
           * 4：需要回答问题并由我确认 <br>
           */
          verifyType: 2,
          question: '',
          answer: '',
          onlyQuestions: []
        }
      } else {
        u = data[index]
      }
      return u
    })
    this.save()
  }

  getSettingByUserId(userId) {
    this.list = this.getData()
    const data = this.list.filter(li => {
      return li.userId === userId
    })

    if (data.length == 1) {
      return data[0].setting
    } else {
      return data
    }
  }

  updateDataById(userId, setting) {
    this.list = this.getData()
    const data = this.list.map(li => {
      if (li.userId === userId) {
        li.setting = setting
      }
      return li
    })
    this.update(data)
  }

  getAddUesrSettingByUserId(userId) {
    this.list = this.getData()
    let setting = {}
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].userId == userId) {
        const data = this.list[i]
        setting.question = data.setting.question
        setting.onlyQuestions = data.setting.onlyQuestions
        setting.verifyType = data.setting.verifyType
        break;
      }
    }
    return setting
  }

  checkSettingAnswer(userId, answer) {
    const obj = this.getItemById(userId)
    if (obj.setting.answer == answer) {
      return true
    } else {
      return false
    }
  }

  getItemById(userId) {
    const data = this.getData()
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (item.userId == userId) {
        return item
      }
    }
  }
}

const addUserSettingPath = m.getPath('addUserSetting')
let addUserSetting = new UserSetting(data, addUserSettingPath)

module.exports = {
  UserSetting,
  addUserSetting
}