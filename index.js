module.exports = (function() {
	const Joi = require('joi')

	return {
		bodySchema : function(schema) {
			return async (ctx, next) => {
				ctx.validate = () => {
					const {error, value} = Joi.validate(ctx.request.body, schema)
					if (!error && value) return value
					else if (error) throw error
				}
				return await next()
			}
		},
		Joi
	}
})()
