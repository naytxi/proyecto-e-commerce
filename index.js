const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const productoRoutes = require('./routes/ProductoRoutes');
app.use('/productos', productoRoutes); 

const categoriaRoutes = require('./routes/CategoriaRoutes');
app.use('/categories', categoriaRoutes); 

const pedidosRoutes = require('./routes/PedidoRoutes');
app.use('/pedidos', pedidosRoutes);

const usersRoutes = require('./routes/UserRoutes');
app.use('/user', usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
