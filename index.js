const express = require("express");
const cors = require("cors");  
const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,                
}));

app.use(express.json());
app.use(cors());

const productoRoutes = require('./routes/ProductoRoutes');
app.use('/productos', productoRoutes); 

const categoriaRoutes = require('./routes/CategoriaRoutes');
app.use('/categories', categoriaRoutes); 

const pedidosRoutes = require('./routes/PedidoRoutes');
app.use('/pedidos', pedidosRoutes);

const usersRoutes = require('./routes/UserRoutes');
app.use('/user', usersRoutes);

const reviewRoutes = require('./routes/ReviewRoutes');
app.use('/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
