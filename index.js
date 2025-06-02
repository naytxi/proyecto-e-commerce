const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const productoRoutes = require('./routes/ProductoRoutes');
app.use('/productos', productoRoutes); 

const categoriaRoutes = require('./routes/CategoriaRoutes');
app.use('/categories', categoriaRoutes); 

const userRoutes = require('./routes/UserRoutes')
app.use('/users', userRoutes)

const pedidoRoutes = require('./routes/PedidoRoutes')
app.use('/pedidos', pedidoRoutes)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
