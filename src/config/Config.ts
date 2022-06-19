import { readFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

/** TODO: 定义配置文件json数据类型 */
/**
 * @description 配置文件json数据类型
 * @property {number} port
 * @property {string} host
 * @property {string} proxy_url
*/
export type ConfigJSONType = {
  port: number
  host: string
  proxy_url: string
}

/** 配置文件路径 */
const CONFIG_PATH: string = join(__dirname, '../config').toString()

/** TODO: 判断配置文件夹是否存在 */
if (!existsSync(CONFIG_PATH)) {
  mkdirSync(CONFIG_PATH)
}

/** TODO: 查询配置文件是否存在 */
if (!existsSync(join(CONFIG_PATH, './config.json'))) {
  throw new Error(`请检查 ${CONFIG_PATH} 文件夹以及 ${join(CONFIG_PATH, './config.json') } 是否存在!`)
}


/** TODO: 读取文件位字符串 */
/**
 * @description 服务端配置
 * @type {ConfigJSONType}
 * @example CONFIG_JSON.port
 *          CONFIG_JSON.host
 *          CONFIG_JSON.proxy_url
*/
const CONFIG_JSON: ConfigJSONType = JSON.parse(readFileSync(join(CONFIG_PATH, './config.json')).toString())

/** TODO: 导出配置 */
export default CONFIG_JSON