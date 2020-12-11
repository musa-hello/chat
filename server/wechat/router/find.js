const express = require('express')
const find = express.Router()
const {
  successSend,
  warningSend
} = require('../util/util')
const {
  user
} = require('../models/model')

find.post('/searchUser', (req, res) => {
  const body = req.body.body || {}
  const text = body.text || ""
  if (text.trim() == "") {
    warningSend(res, '参数错误')
  }
  const data = user.getSearchUser(text)
  if (data) {
    successSend(res, data)
  }
})

module.exports = find