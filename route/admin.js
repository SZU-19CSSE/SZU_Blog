//引用express框架
const express = require('express');


//创建博客展示页面路由
const admin = express.Router()
//实现登陆功能
admin.post('/login',require('./admin/login') );
//渲染登录页面
admin.get('/login',require('./admin/loginPage'));
//退出功能
admin.get('/logout',require("./admin/logout"));
//创建用户列表路由
admin.get('/user', require('./admin/userPage'));
admin.get('/article', (req, res) => {
    res.render('admin/article')
});



//将路由对象做为模块成员进行导出
module.exports = admin;