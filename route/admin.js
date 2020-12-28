//引用express框架
const express = require('express');

//创建博客展示页面路由
const admin = express.Router()
//实现登陆功能
admin.post('/login', (req, res) => {
  //接受请求参数
  const{email,password}=req.body;
  //验证输入的合法性，防止javascript失效
  if(email.trim().length==0){
      return res.status(400).send('<h4>邮件地址或者密码错误</h4>')
  }  
});
admin.get('/login', (req, res) => {
    res.render('admin/login')
});
//创建用户列表路由
admin.get('/user', (req, res) => {
    res.render('admin/user')
});
admin.get('/article', (req, res) => {
    res.render('admin/article')
});


//将路由对象做为模块成员进行导出
module.exports = admin;