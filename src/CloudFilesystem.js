const thunkify = require('thunkify')
const fs = require('fs')
const path = require('path')
const pkgcloud = require('pkgcloud')

class CloudFilesystem {
  constructor(config) {
    this.config = config;
    this.client = pkgcloud.storage.createClient(this.config.options);
  }



  putStream(name, readStream) {
    return new Promise((resolve, reject) => {
      const writeStream = this.client.upload({
        container: this.config.container,
        remote: name,
      })

      readStream.on('error', (e) => {
        console.log(e);
        reject(arguments)
      })

      writeStream.on('error', (e) => {
        console.log(e);
        reject(arguments)
      })

      writeStream.on('success', () => {
        resolve(arguments)
      })

      readStream.pipe(writeStream);
    })
  }

  getStream(name) {
    return this.client.download({
      container: this.config.container,
      remote: name,
    });
  }

  // put(name, contents, options) {
  //   options = options || this.config.options
  //   return thunkify(fs.writeFile)(this.getFileName(name), contents, options)
  // }

  get(name, options) {
    options = options !== undefined ? options : this.config.options
    return thunkify(fs.readFile)(this.getFileName(name), options)
  }
}

module.exports = CloudFilesystem
