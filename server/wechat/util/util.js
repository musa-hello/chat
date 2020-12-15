const fs = require('fs')
const path = require('path')

function successSend(res, body, message) {
  res.send({
    info: {
      success: true,
      prompts: [{
        text: message
      }]
    },
    body: body
  })
}

function warningSend(res, message, body) {
  res.send({
    info: {
      success: false,
      warnings: [{
        text: message
      }]
    },
    body: body
  })
}

class M {
  readFile(path) {
    try {
      let data = fs.readFileSync(path)
      data = JSON.parse(data)
      return data
    } catch (e) {
      return false
    }
  }

  writeFile(path, data) {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (e) {

    }
  }

  getPath(name) {
    return path.join(__dirname, '../data/' + name + '.json')
  }

  getId(id) {
    return ('000000000' + id).slice(-6)
  }

  getBody(req) {
    return req.body.body
  }

  hasEmpty(...data) {
    let empty = false;
    for (const value of data) {
      if (value instanceof Array) {
        if (value.length <= 0) {
          empty = true
        }
      } else {
        if (value.trim && value.trim() === '' || value === undefined || value === null || value === 'undefined' || value === 'null' || JSON.stringify(value) == "{}") {
          empty = true
        }
      }
    }
    return empty;
  }

  getDataObjById(list, userId) {
    const data = list.filter(p => p.userId == userId)
    return data[0]
  }

  compare(property, desc) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      if (desc == true) {
        // 升序排列
        return value1 - value2;
      } else {
        // 降序排列
        return value2 - value1;
      }
    }
  }
}

function resetJsonExUser() {
  let o = [
    m.getPath('addUserSetting'),
    m.getPath('userAndGoupList'),
    m.getPath('userStatus'),
    m.getPath('notice_userAdd')
  ]
  for (const v of o) {
    m.writeFile(v, [])
  }
}

class J {
  _strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }
  /**
   *map转换为json
   */
  _mapToJson(map) {
    return JSON.stringify(this._strMapToObj(map));
  }

  _objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }
  /**
   *json转换为map
   */
  _jsonToMap(jsonStr) {
    return this._objToStrMap(JSON.parse(jsonStr));
  }
}

const m = new M()
const j = new J()
module.exports = {
  successSend,
  warningSend,
  m,
  j,
  resetJsonExUser
}