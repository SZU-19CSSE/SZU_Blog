//引入joi模块
const Joi = require('joi')

module.exports = async(req, res) => {
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法 ')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    try {
        //实施验证
        await Joi.validate(req.body, schema);
    } catch (e) {
        //验证没有通过
        //重定向回用户添加页面
        // e.message
        res.redirect(`/admin/user-edit?message=${e.message}`);
    }


    res.send(req.body);
}