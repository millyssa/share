const {Article}=require('../../model/article');
const pagination=require('mongoose-sex-page');
module.exports=async(req,res)=>{
    const page=req.query.page;
    //标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink='article';
    
    //查询所有文字数据
    let temp= await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    let articles=JSON.parse(JSON.stringify(temp));
    //res.send(articles);
    res.render('admin/article.art',{
        articles:articles
    });
}