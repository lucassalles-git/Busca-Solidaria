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

//Rota para listar os registrados
app.get("/registros", async (req, res) => {
  const db = await bancoDados(); //chamando a função do database

  const todosOsRegistros = await db.all(`SELECT * FROM registros`);

  res.json(todosOsRegistros);
});

//Rota específica por nome
app.get("/registros/:nome", async (req, res) => {
  const { nome } = req.params;
  const db = await bancoDados();
  const pessoaEspecifica = await db.all(
    `SELECT * FROM registros WHERE nome = ?`,
    [nome],
  );

  res.json(pessoaEspecifica);
});

//novo registro de desaparecido
app.post("/registros", async (req, res) => {
  const { nome, idade } = req.body;
  const db = await bancoDados();

  await db.run(`INSERT INTO registros(nome, idade) VALUES (?, ?)`, [
    nome,
    idade,
  ]);

  res.send(`Cadastro de desaparecido: ${nome}, de ${idade} anos de idade`);
});

//Rota de atualização
app.put("/registros/:nome", async (req, res) => {
  const { nome } = req.params;
  const { situacao, abrigo, endereco } = req.body;
  const db = await bancoDados();

  await db.run(
    `
    UPDATE registros
    SET situacao = ?, abrigo = ?, endereco = ?
    WHERE nome = ?`,
    [situacao, abrigo, endereco, nome],
  );

  res.send(
    `As informações do desaparecido de nome ${nome} foram atualizadas com sucesso`,
  );
});

//rota de remoção
app.delete("/registros/:nome", async (req, res) => {
  const { nome } = req.params;
  const db = await bancoDados();

  await db.run(`DELETE FROM registros WHERE nome = ?`, [nome]);

  res.send(
    `O desaparecido com o nome ${nome} foi encontrado e removido com sucesso`,
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
