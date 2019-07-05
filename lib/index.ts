import * as ts from 'typescript'
import * as path from 'path'
import Watchpack from 'watchpack'
import { getTypeDefinitions } from './declarations/getTypeDefinitions'
import getPrint from './getPrint'
import writefile from './writefile'
//___________________________________________________________________

const storeDir = path.resolve(__dirname + '/../store/')
const wp = new Watchpack({})
wp.watch([], [storeDir])
wp.on('aggregated', main)

async function main() {
  console.time('time')
  // 定義対象ディレクトリから、定義対象ファイル一覧を取得
  const [typeFiles, fileTree] = await getTypeDefinitions(storeDir, 'type.ts')
  // program 用に配列を作成
  const files = typeFiles.map(file => file.filePath)
  // ファイルの内容を読み取るためには program を作成する必要あり
  const program = ts.createProgram(files, {})
  // 型名称からマッピング型を生成
  const print = getPrint(program, typeFiles, fileTree)
  // 型定義の書き出し
  writefile('./types/vuex/', 'impl', print)
  console.timeEnd('time')
}
