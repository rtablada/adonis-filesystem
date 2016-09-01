const LocalFilesystem = require('./LocalFilesystem')
const fs = require('fs')
const CloudFilesystem = require('./CloudFilesystem')

class Filesystem {
  constructor(config, name) {
    this.config = config
    this.name = name

    this.buildConnection()
  }

  buildConnection() {
    if (Filesystem.connections[this.name]) {
      return Filesystem.connections[this.name]
    }

    const connectionConfig = this.config[this.name]

    if (connectionConfig.driver === 'local') {
      const instance = new LocalFilesystem(connectionConfig)

      Filesystem.connections[this.name] = instance

      return instance
    } else if (connectionConfig.driver === 'pkgcloud') {
      const instance = new CloudFilesystem(connectionConfig)

      Filesystem.connections[this.name] = instance
    }
  }

  connection(name) {
    return new Filesystem(this.config, name)
  }

  put(name, contents, options) {
    return this.buildConnection().put(name, contents, options)
  }

  putStream(name, stream) {
    return this.buildConnection().putStream(name, stream)
  }

  get(name, options) {
    return this.buildConnection().get(name, options)
  }

  upload(name, file) {
    const tmpStream = fs.createReadStream(file.tmpPath())

    return this.putStream(name, tmpStream)
  }
}

Filesystem.connections = []

module.exports = Filesystem
