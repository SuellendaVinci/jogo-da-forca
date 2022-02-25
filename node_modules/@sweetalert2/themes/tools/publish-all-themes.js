const execute = require('@sweetalert2/execute')
const replaceInFile = require('replace-in-file')
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const packageJson = require('../package.json')
const log = console.log // eslint-disable-line

;(async () => {
  const directories = readdirSync('.')
    .map((name) => join('.', name))
    .filter((source) => lstatSync(source).isDirectory())

  for (directory of directories) {
    const changedFiles = await replaceInFile({
      files: join(directory, 'package.json'),
      from: /"version": ".*?"/,
      to: `"version": "${packageJson.version}"`,
    }).catch(() => {
      // ignore
    })

    if (changedFiles) {
      for (changedFile of changedFiles) {
        await execute(`cd ${directory} && npm publish --access=public`)
        await execute(`curl --silent https://purge.jsdelivr.net/npm/@sweetalert2/theme-${directory}/${directory}.css`, {
          skipLogging: true,
        })
      }
    }
  }

  log('OK!')
})().catch(console.error)
