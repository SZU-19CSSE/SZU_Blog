//引入mongoose第三方模块
const mongoose =require('mongoose');
//创建用户集合规则
const userSchema=new mongoose.Schema({
    username :{
        type:String,
        require:true,
        minlength:2,
        maxlength: 20
    },
    email:{
        type:String,
        //保证邮箱不重复
        unique: true,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    //admin:超级管理员
    //normal:普通用户
    role:{
        type:String,
        require:true
    },
        // 0 启用状态
        // 1 禁用状态
    state:{
        type:Number,
        default:0
    }


});
//创建集合
const User=mongoose.model('User',userSchema);

// User.create({
//     username:'iteheima',
//     email:'iteheima@itcast.cn',
//     password:'123456',
//     role:'admin',
//     state:0
// }).then(()=>{
//     console.log('用户创建成功')
// }).catch(()=>{
//     console.log('用户创建失败')
// })
 //将用户集合做为模块成员进行导出
module.exports={ 
    User
};