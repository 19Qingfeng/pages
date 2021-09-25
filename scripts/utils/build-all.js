const inquirer = require('inquirer')
const execa = require('execa')
const { log, separator } = require('./constant')
const { entry } = require('./helper')

const packagesList = [...Object.keys(entry)]

async function build(buildLists) {
  const stringLists = buildLists.join(separator)
  await execa('webpack', ['--config', './scripts/webpack.prod.js'], {
    stdio: 'inherit',
    env: {
      packages: stringLists,
    },
  })
}

build(packagesList)
