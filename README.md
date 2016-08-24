# Adonis Filesystem

This package allows uploading files to local fs, cloud storage, or another provider easy.

> **NOTE** This pacakge is currently in development. While the public API will be pretty stable, new features, connectors, and internal plumbing will change over time until v1.0.0 is reached

## Installation

To install this addon:

```bash
npm install --save adonis-filesystem
```

Then update the `bootstrap/app.js`:

* To the `providers` array add: `adonis-filesystem/providers/FilesystemProvider`
* _Optionally_ add `File: 'AdonisFilesystem/Filesystem'` to the `aliases` objects

## Configuration

Add named `config/filesystems.js` with the following:

```js
'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

  default: 'public',

  public: {
    driver: 'local',
    root: Helpers.publicPath('uploads'),
    options: {
      encoding: 'utf8'
    }
  },

  protected: {
    driver: 'local',
    root: Helpers.storagePath('app'),
    options: {
      encoding: 'utf8'
    }
  }

}
```

This will setup file connections to create files in `public/uplodads` using the `public` connection, and `storage/app` for the `protected` connections.
Because the default use case is for image uploading, the `public` connection is set as a default, though this can be changed with the `default` parameter.

## Use - Writing Files

To write to files use the `put` method on a Filesystem connection:

```js
const File = use('File') // or use('AdonisFilesystem/Filesystem') if you did not install the alias

yield File.put('app.js', 'This is the contents of my file')
```

This will use the default connection to write a file named `app.js` with the text content `'This is the contents of my file'`.
The point of the Filesystem connection is that consuming applications do not worry about if files are local or on a cloud provider.

## Use - Reading Files

To read to files use the `get` method on a Filesystem connection:

```js
const File = use('File') // or use('AdonisFilesystem/Filesystem') if you did not install the alias

yield File.get('app.js')
```

This will use the default connection to read a file named `app.js`.

## Use - Uploading Files

Uploading files can be a chore, by using the `upload` method, the Filesystem package will use streams to upload a file from `request.file` to the final upload destination:

```js
const File = use('File') // or use('AdonisFilesystem/Filesystem') if you did not install the alias
const avatar = request.file('avatar', {
    maxSize: '2mb',
    allowedExtensions: ['jpg', 'png', 'jpeg']
})

yield File.upload(avatar.clientName(), avatar)
```

## Use - Other Connectors

To use other connectors, use the `connection` method on the file instance.
This will allow you to use a different connection than the default for a single file transaction:

```js
const File = use('File') // or use('AdonisFilesystem/Filesystem') if you did not install the alias

yield File.connection('protected').put('secret.json', 'The silence will fall when the question is asked.')
```

## License

This package is distributed under the [MIT license](LICENSE.md).
