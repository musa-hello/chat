const express = require('express')
const modules = express.Router()
const {
  successSend,
  warningSend,
  m
} = require('../util/util')
const {
  userAndGoupList
} = require('../models/model')

modules.post('/addContactCategory', (req, res) => {
  const body = req.body.body || {}
  const userId = body.userId || ""
  const name = body.name || ""
  if (!userId || !name) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    userAndGoupList.addUserListById(userId, name)
    successSend(res, {}, "添加成功")
  })
})

modules.post('/addGroupCategory', (req, res) => {
  const body = req.body.body || {}
  const userId = body.userId || ""
  const name = body.name || ""
  if (!userId || !name) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    userAndGoupList.addGroupListById(userId, name)
    successSend(res, {}, "添加成功")
  })
})

modules.post('/addGroup', (req, res) => {
  const group = req.body.body || {}
  if (JSON.stringify(group) == "{}" || !group.belongUserId || !group.name) {
    return warningSend(res, "参数错误")
  }
  m.tryDo(res, () => {
    userAndGoupList.addGroup(group)
    successSend(res, {}, "创建成功")
  })
})
module.exports = modules