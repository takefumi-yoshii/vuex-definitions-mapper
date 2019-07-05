import * as fs from 'fs'

export default (dir: string, fileName: string, code: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  fs.writeFileSync(`${dir}${fileName}.ts`, code)
}
