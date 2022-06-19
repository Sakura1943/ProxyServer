/** TODO: 导入模块 */
import Koa from 'koa'
import bodyParser from 'koa-body'
import cors from 'koa2-cors'
import CONFIG_JSON from './config/Config'
import { createProxyMiddleware } from 'http-proxy-middleware'
const k2c = require('koa2-connect')
import { accessLogger, applicationLogger, errorLogger } from './middlewares/logger'

/** TODO: 创建`Koa`应用实例 */
const app: Koa = new Koa()

/** TODO: 创建端口常量 */
const port: number = CONFIG_JSON.port ? CONFIG_JSON.port : 3000

/** TODO: 中间件导入 */
app.use(bodyParser({
  multipart: true
}))
.use(cors())
.use(accessLogger())
.use(errorLogger())
.use(applicationLogger())

/** TODO: 反代中间件 */
app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: () => void) => {
  if (ctx.url.startsWith("/")) {
    ctx.respond = false
    await k2c(
      createProxyMiddleware({
        target: CONFIG_JSON.proxy_url,
        changeOrigin: true
      })
    )(ctx, next)
  }
  await next()
})

/** TODO: 激活路由 */
// routes.IndexRouter(app)

/** TODO: 端口监听 */
app.listen(port, (): void => {
  console.log(`Server running at http://localhost:${port}`)
})