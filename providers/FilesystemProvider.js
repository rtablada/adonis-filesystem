const ServiceProvider = require('adonis-fold').ServiceProvider

class FilesystemProvider extends ServiceProvider {

  * register () {
    // this.app.manager('Adonis/Src/FileSystemManager', Filesystem)
    this.app.bind('AdonisFilesystem/Filesystem', function (app) {
      const config = app.use('Config')

      const Filesystem = require('../src/Filesystem')

      return new Filesystem(config.get('filesystems'), config.get('filesystems.default'))
    })
  }

}

module.exports = FilesystemProvider
