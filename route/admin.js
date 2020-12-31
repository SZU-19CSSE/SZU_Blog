//引用express框架
const express = require('express');
//导入用户集合构造函数
const {User}=require('../model/user')
//导入bcrypt
const bcrypt =require('bcrypt');
//创建博客展示页面路由
const admin = express.Router()
//实现登陆功能
admin.post('/login', async(req, res) => {
  //接受请求参数
  const{email,password}=req.body;
  //验证输入的合法性，防止javascript失效
  if(email.trim().length==0||password.trim().length==0){
      return res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});
  }  
  //根据邮箱地址查询用户信息
  //如果查询到了用户 user变量值为对象 对象中存储的是用户信息
//   如果没有查询到用户 user为空
   let user= await User.findOne({email})
   
   if(user){
        //将客户端传递过来的密码和用户信息中的密码进行比对
        //true比对成功
        //false比对失败
        let isValid=await bcrypt.compare(password,user.password);
        //
        if(isValid){
            //登陆成功
            res.send('登陆成功')
        }
        else {
            //登陆失败
            res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});

        }
   }
   else{
    res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});
   }
  
});
admin.get('/login', (req, res) => {
    res.render('admin/login' )
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