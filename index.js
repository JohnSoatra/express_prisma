const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const ProductController = require('./controllers/ProductController');
const CategoryController = require('./controllers/CategoryController');
const { onConnection } = require('./handles/socketIO');

io.on('connection', onConnection);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.get('/products', ProductController.getAllProducts);
app.get('/products/:id', ProductController.getProduct);
app.post('/products', ProductController.createProduct);
app.delete('/products/:id', ProductController.deleteProduct);
app.patch('/products/:id', ProductController.updateProduct);

app.get('/categories', CategoryController.getAllCategories);
app.get('/categories/:id', CategoryController.getCategory);
app.post('/categories', CategoryController.createCategory);
app.delete('/categories/:id', CategoryController.deleteCategory);
app.patch('/categories/:id', CategoryController.updateCategory);

server.listen(8000, () => console.log("The app is running on port 8000\nhttp://localhost:8000"));
