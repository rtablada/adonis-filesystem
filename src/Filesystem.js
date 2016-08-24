const LocalFilesystem = require('./LocalFilesystem')

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
    }
  }

  connection(name) {
    return new Filesystem(this.config, name)
  }

  put(name, contents, options) {
    return this.buildConnection().put(name, contents, options)
  }

  get(name, options) {
    return this.buildConnection().get(name, options)
  }
}

Filesystem.connections = []

module.exports = Filesystem
