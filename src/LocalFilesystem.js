const thunkify = require('thunkify')
const fs = require('fs')
const path = require('path')

class LocalFilesystem {
  constructor(config) {
    this.config = config
  }

  getFileName(name) {
    return path.normalize(`${this.config.root}/${name}`)
  }

  put(name, contents, options) {
    options = options || this.config.options
    return thunkify(fs.writeFile)(this.getFileName(name), contents, options)
  }

  get(name, options) {
    options = options !== undefined ? options : this.config.options
    return thunkify(fs.readFile)(this.getFileName(name), options)
  }
}

module.exports = LocalFilesystem
