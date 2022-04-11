const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

//express sayesinde çok kolaylıkla http metotlarını kullanabiliriz.
const app = express()


/* 
mongoose bir odm bizim schemalar içerisinde oluşturduğumuz veri nesnelerini veri tabanı içerisindeki,
dökümanlara dönüştürüyor
*/
//connect DB
mongoose.connect('mongodb+srv://umit:ujQwsUlQTywLUSGt@cluster0.xozyj.mongodb.net/clean-app16?retryWrites=true&w=majority').then(() => {
    console.log('DB CONNECTED');
}).catch((err) => {
    console.log(err);
})

//TEMPLATE ENGINE
app.set('view engine','ejs');

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method', {
    methods:['POST', 'GET']
}));

//ROUTES
app.get('/', postController.getAllPosts);
//index.ejs deki a tagından id'yi yakalamak için ':id' yazdık.
app.get('/posts/:id', postController.getPost );
//add_post.ejs dosyasının içerisindeki form etiketindeki action attributesini yakalıyoruz.
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server ${port} unda başlatıldı`);
})