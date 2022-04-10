const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

//express sayesinde çok kolaylıkla http metotlarını kullanabiliriz.
const app = express()


/* 
mongoose bir odm bizim schemalar içerisinde oluşturduğumuz veri nesnelerini veri tabanı içerisindeki,
dökümanlara dönüştürüyor
*/
//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

/* expresse diyoruz ki biz templete engine olarak ejs kullanacağız
ejs bizim klasör yapısındaki views klasörünün içerisine bakar
*/
//TEMPLATE ENGINE
app.set('view engine','ejs');

//MIDDLEWARES
app.use(express.static('public'))

/* body parser modulünü express içerisinde halledebiliyoruz  */
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
    //postları yakala
    const posts = await Post.find({})
    //yakaladığın postları templete gonder
    res.render("index", {
        posts,
    });
});

app.get('/about',(req, res) => {
    res.render('about');
})

//index.ejs deki a tagından id'yi yakalamak için ':id' yazdık.
app.get('/posts/:id', async (req, res) => {
    //id yardımı ile hangi post olduğunu bulacağız
    const post = await Post.findById(req.params.id)
    //bulduktan sonra ilgili templete yönlendir.
    res.render('post', {
        post,
    })
} )

app.get('/add',(req, res) => {
    res.render('add_post');
})

//add_post.ejs dosyasının içerisindeki form etiketindeki action attributesini yakalıyoruz.
app.post('/posts', async (req, res) => {
/* 
    ilgili post modeline yönlendir ve bu post modeli bunu alacak ve veri tabanına gönderecek.
*/
    await Post.create(req.body);
    res.redirect('/');
})

const port = 5000;

app.listen(port, () => {
    console.log(`server ${port} unda başlatıldı`);
})