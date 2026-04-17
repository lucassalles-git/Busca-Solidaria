const express = require("express");
const { bancoDados } = require("./database");
const cors = require("cors") //pacote que gerencia as permissões de acesso
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`
        <html>
        <head>
          <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          h1 { color: #2c3e50; }
          button { background: #27ae60; border: none; padding: 10px; border-radius: 5px; }
          button a { color: white; text-decoration: none; font-weight: bold; }
          </style>
        </head>

          <body>
          <h1>Busca Solidária</h1>
          <h2>Registros para pessoas desaparecidas</h2>
          <p>Lista de pessoas desaparecidas/encontradas:</p>
          <button><a href="/desaparecidos">Clique aqui</a></button>
          </body>
        </html>

        `);
});

//Rota para listar os desaparecidos
app.get("/desaparecidos", async (req, res) => {
  const db = await bancoDados(); //chamando a função do database

  const todosOsDesaparecidos = await db.all(`SELECT * FROM desaparecidos`);

  res.json(todosOsDesaparecidos);
});

//Rota específica por id
app.get("/desaparecidos/:id", async (req, res) => {
  const { id } = req.params;
  const db = await bancoDados();
  const pessoaEspecifica = await db.all(
    `SELECT * FROM desaparecidos WHERE id = ?`,
    [id],
  );

  res.json(pessoaEspecifica);
});

//novo registro de desaparecido
app.post("/desaparecidos", async (req, res) => {
  const { imagem, nome, idade, descricao, ultima_vezVisto } = req.body;
  const db = await bancoDados();

  await db.run(`INSERT INTO desaparecidos(imagem, nome, idade, descricao, ultima_vezVisto) VALUES (?, ?, ?, ?, ?)`, [
    imagem,
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
    UPDATE desaparecidos
    SET status = ?, abrigo = ?, endereco = ?
    WHERE id = ?`,
    ["encontrado", abrigo, endereco, id],
  );

  res.send(
    `As informações do desaparecido foram atualizadas com sucesso`,
  );
});

//rota de remoção
app.delete("/desaparecidos/:id", async (req, res) => {
  const { id } = req.params;
  const db = await bancoDados();

  await db.run(`DELETE FROM desaparecidos WHERE id = ?`, [id]);

  res.send(
    `O desaparecido com o id ${id} foi encontrado e removido com sucesso`,
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
