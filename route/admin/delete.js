const { User }=require('../../model/user');

module.exports= async(req,res)=>{
    //获取要删除的用户id
  //res.send(req.query.id)

  await User.findByIdAndDelete({_id: req.query.id});
  res.redirect('/admin/user');
}
