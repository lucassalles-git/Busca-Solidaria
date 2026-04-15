const express = require("express");
const { bancoDados } = require("./database");
const cors = require("cors") //pacote que gerencia as permissões de acesso
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`
        <body>
        <h1>SOS Enchentes</h1>
        
        <h2>Registros para pessoas desaparecidas</h2>
            
        <p>Lista de pessoas: /desaparecidos</p>
        </body>


        `);
});

//Rota para listar os desaparecidos
app.get("/desaparecidos", async (req, res) => {
  const db = await bancoDados(); //chamando a função do database

  const todosOsDesaparecidos = await db.all(`SELECT * FROM desaparecidos`);

  res.json(todosOsDesaparecidos);
});

//Rota específica por nome
app.get("/desaparecidos/:nome", async (req, res) => {
  const { nome } = req.params;
  const db = await bancoDados();
  const pessoaEspecifica = await db.all(
    `SELECT * FROM desaparecidos WHERE nome = ?`,
    [nome],
  );

  res.json(pessoaEspecifica);
});

//novo registro de desaparecido
app.post("/desaparecidos", async (req, res) => {
  const { nome, idade, descricao, ultima_vezVisto } = req.body;
  const db = await bancoDados();

  await db.run(`INSERT INTO desaparecidos(nome, idade, descricao, ultima_vezVisto) VALUES (?, ?, ?, ?)`, [
    nome,
    idade,
    descricao, 
    ultima_vezVisto
  ]);

  res.send(`Cadastro de desaparecido: ${nome}, de ${idade} anos de idade`);
});

//Rota de atualização
app.put("/desaparecidos/:id", async (req, res) => {
  const { abrigo, endereco } = req.body;
  const id = req.params.id
  const db = await bancoDados();

  await db.run(
    `
    UPDATE registros
    SET status = ?, abrigo = ?, endereco = ?
    WHERE id = ?`,
    ["encontrado", abrigo, endereco, id],
  );

  res.send(
    `As informações do desaparecido de nome ${nome} foram atualizadas com sucesso`,
  );
});

//rota de remoção
app.delete("/desaparecidos/:id", async (req, res) => {
  const { id } = req.params;
  const db = await bancoDados();

  await db.run(`DELETE FROM desaparecidos WHERE id = ?`, [id]);

  res.send(
    `O desaparecido com o nome ${id} foi encontrado e removido com sucesso`,
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
