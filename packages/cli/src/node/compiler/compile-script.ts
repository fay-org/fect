import fs from 'fs'
import { replaceExt, replaceStyleInJs } from '../../shared/constant'
import { transformAsync } from '@babel/core'
import { logErr } from '../../shared/logger'

export const resolveScriptFile = async (filePath: string) => {
  try {
    let code: string
    code = await fs.promises.readFile(filePath, 'utf-8')
    code = replaceStyleInJs(code)
    const raw = await transform(code, filePath)
    const resolvedPath = replaceExt(filePath, '.js')
    fs.unlinkSync(filePath)
    fs.writeFileSync(resolvedPath, raw.code)
  } catch (error) {
    logErr(error)
    throw error
  }
}

export const transform = async (code: string, fileName) => {
  try {
    const res = await transformAsync(code, { filename: fileName })
    return {
      code: res.code
    }
  } catch (error) {
    logErr(error)
    throw error
  }
}
