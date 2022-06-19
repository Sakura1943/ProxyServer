import log4js from 'koa-log4'
import { mkdirSync, existsSync } from 'fs'
import { join } from 'path'

/** log日志路径 */
const LOG_PATH = join(__dirname, '../logs')

/** TODO: 判断存储日志的文件夹是否存在 */
if (!existsSync(LOG_PATH)) {
  mkdirSync(LOG_PATH)
}

/** TODO: koa-log4模型配置 */
log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: join(LOG_PATH, './access.log')
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      encoding: 'utf-8',
      filename: join(LOG_PATH, './application.log'),
    },
    out: {
      type: 'console'
    },
    error: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      encoding: 'utf-8',
      filename: join(LOG_PATH, './error.log')
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info'
    },
    access: {
      appenders: ['access'],
      level: 'info'
    },
    application: {
      appenders: ['application'],
      level: 'all'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    }
  }
})


/** TODO: 导出模块 */
export const accessLogger = () => log4js.koaLogger(log4js.getLogger('access'))
export const errorLogger = () => log4js.koaLogger(log4js.getLogger('error'))
export const applicationLogger = () => log4js.koaLogger(log4js.getLogger('application'))