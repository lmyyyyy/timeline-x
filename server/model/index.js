let fs = require('fs')
let data = fs.readFileSync(__dirname + '/../dist/static/data/data.json')
let int = Number.parseInt

data = JSON.parse(data)

const saveIntoFile = () => {
  fs.writeFile(__dirname + '/../static/data/data.json', JSON.stringify(data))
}

model = {
  get () {
    return data
  },

  set (newRecord) {
    for (let record of data) {
      if (int(record.year) === int(newRecord.year) &&
        int(record.month) === int(newRecord.month) &&
        int(record.date) === int(newRecord.date)) {
        record = newRecord
        saveIntoFile()
        return
      }
    }
    data.push(newRecord)
    data.sort((a, b) => {
      if (int(a.year) < int(b.year)) return -1
      if (int(a.year) > int(b.year)) return 1
      if (int(a.month) < int(b.month)) return -1
      if (int(a.month) > int(b.month)) return 1
      if (int(a.date) < int(b.date)) return -1
      if (int(a.date) > int(b.date)) return 1
      return 0
    })
    saveIntoFile()
  }
}