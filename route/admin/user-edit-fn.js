//引入joi模块
const Joi = require('joi')

//引入加密模块
const bcrypt = require('bcrypt');

//引入用户集合的构造函数
const { User } = require('../../model/user');

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
        return res.redirect(`/admin/user-edit?message=${e.message}`);
    }

    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    //如果用户已经存在 邮箱地址已经被别人占用
    if (user) {
        //重定向回用户添加页面
        return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
    }

    //对密码进行加密
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;

    //将用户信息添加到数据库中
    await User.create(req.body);
    res.redirect('/admin/user');
}