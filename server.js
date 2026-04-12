const express = require("express");
const { bancoDados } = require("./database");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
        <body>
        <h1>SOS Enchentes</h1>
        
        <h2>Registros para pessoas desaparecidas</h2>
            
        <p>Lista de pessoas: /registros</p>
        </body>


        `);
});

//Rota para listar os abrigos
app.get("/registros", async (req, res) => {
  const db = await bancoDados(); //chamando a função do database

  const todosOsRegistros = await db.all(`SELECT * FROM registros`);

  res.json(todosOsRegistros);
});







const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
