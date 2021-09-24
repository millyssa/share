const{ User,validateUser }= require('../../model/user');
const bcrypt=require('bcrypt');

module.exports= async (req,res,next)=>{

   

    try {
        await validateUser(req.body)
    } catch (e) {
        //验证没有通过
       // e.message
       //return res.redirect(`/admin/user-edit?message=${e.message}`);
       //JSON.stringify()将对象数据类型转换为字符串数据类型
      
       return next( JSON.stringify({path:'/admin/user-edit', message: e.message}));
    }
   
  
    let user=await User.findOne({email:req.body.email});
    if(user){
        //重定向回用户添加页面
        //return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已经被占用'}))
    }

   //对密码进行价目处理
   const salt=await bcrypt.genSalt(10);
   const password=await bcrypt.hash(req.body.password,salt);
   //替换密码
   req.body.password=password;
   await User.create(req.body);

   res.redirect('/admin/user');

}