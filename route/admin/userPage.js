//导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    //将用户信息从数据库中查询出来
    let users = await User.find({});
    // res.send(users);
    //渲染用户列表模块
    res.render('admin/user', {
        users: users,
        msg: req.session.username
    });
}