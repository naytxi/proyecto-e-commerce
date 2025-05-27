const express = require("express")
const app = express()
const port = 3000
const categoriaRoutes = require('./routes/CategoriaRoutes');

app.use(express.json());
app.use('/categories', categoriaRoutes); 




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

