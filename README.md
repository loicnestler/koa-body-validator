# koa-body-validator
#### A simple [koa-router](https://www.npmjs.com/package/koa-router) body validator middleware based on [Joi](https://www.npmjs.com/package/joi).

##### Usage
> This package requires [koa-body](https://www.npmjs.com/package/koa-body) or an alternative body-parser that saves the parsed body in koas context object (`ctx.request.body`).
```javascript
const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()

const {Joi, bodySchema} = require('koa-body-validator')

const app = new Koa()

app.use(koaBody())


router.post('/', bodySchema({
   name:      Joi.string().min(5).max(128).required(),
   email:     Joi.string().email().required(),
   password:  Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
   birthyear: Joi.number().integer().min(1900).max(2007),
}), async ctx => {
   try {
      ctx.validate()
      
      ctx.body = {
         name:     ctx.request.body.name,
         email:    ctx.request.body.email,
         password: ctx.request.body.password
      }
   } catch(err) {
      ctx.body = err.message
   }
})


app.use(router.routes())
app.use(router.alloweMethods())

app.listen(8080)
```

For more instructions on how to define the schema, see [the detailed Joi API Reference](https://github.com/hapijs/joi/blob/v14.3.1/API.md).
