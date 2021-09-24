const { Article }= require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports=async (req,res)=>{
    const page = req.query.page;

    let temp= await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    let result=JSON.parse(JSON.stringify(temp));
    //res.send(result);
    // return;
    // res.send('欢迎来到首页')
     res.render('home/default.art',{
         result:result
     });
}