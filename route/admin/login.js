//导入用户集合构造函数
const { User }=require('../../model/user');
//导入明文加密
const bcrypt=require('bcrypt');

const login=async(req,res)=>{
    //接收请求参数
    const {email,password} = req.body;
    //如果用户没有输入邮件地址
    if(email.trim().length == 0 || password.trim().length==0) return res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'});
   
    //根据邮件地址查询用户信息
    let user=await User.findOne({email});
    //查询到了用户
    if(user){
       //将客户端传递过来的密码和用户信息中的密码比对
       //明文密码比对
       let isValue=await bcrypt.compare(password,user.password)
       if(isValue){
          //登录成功
          req.session.username= user.username;
          //将用户角色存储在请求对象中
          req.session.role=user.role;

          req.app.locals.userInfo=user;
          //对用户角色进行判断
          if(user.role=='admin'){
             //重定向到用户列表
             res.redirect('/admin/user');
          }else{
             res.redirect('/home/');
          }
         
 
       }else{
          res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
       }
    }else{
       //没有查询到用户
       res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
    }
 
 }

module.exports=login;