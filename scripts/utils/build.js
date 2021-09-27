const inquirer = require('inquirer')
const execa = require('execa')
const { log, separator } = require('./constant')
const { entry, isEmptyArray } = require('./helper')

const packagesList = [...Object.keys(entry)]

if (isEmptyArray(packagesList)) {
  log('不合法目录，请检查src/packages/*/main.tsx', 'warning')
  return
}
const allPackagesList = [...packagesList, 'all']

inquirer
  .prompt([
    {
      type: 'checkbox',
      message: '请选择需要打包的项目:',
      name: 'buildLists',
      choices: allPackagesList, // 选项
      validate(value) {
        return !value.length ? new Error('至少选择一个内容进行打包') : true
      },
      filter(value) {
        if (value.includes('all')) {
          return packagesList
        }
        return value
      },
    },
  ])
  .then(res => {
    // 拿到所有结果进行打包
    const message = `当前选中Package: ${res.buildLists.join(' , ')}`
    log(message, 'success')
    runParallel(res.buildLists)
  })

function runParallel(packages) {
  const message = `开始打包: ${packages.join('-')}`
  log(message, 'warning')
  build(packages)
}

async function build(buildLists) {
  const stringLists = buildLists.join(separator)
  await execa('webpack', ['--config', './scripts/webpack.prod.js'], {
    stdio: 'inherit',
    env: {
      packages: stringLists,
    },
  })
}
