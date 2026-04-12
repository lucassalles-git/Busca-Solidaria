const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const bancoDados = async () => {
  //Abrindo o banco de dados
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS registros(
    
    -- identificação de desaparecido
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    situacao TEXT DEFAULT "desaparecido",
    abrigo TEXT DEFAULT "nenhum",
    endereco TEXT DEFAULT "nenhum"
    )
        `);

  console.log("Banco de dados configurado: A tabela registros de desaparecidos está pronta");

  const checagem = await db.get(`SELECT COUNT (*) AS total FROM registros`);

  if (checagem.total === 0) {
    await db.exec(`
        INSERT INTO registros(nome, idade, situacao, abrigo, endereco) VALUES (
        "Francisco de Souza Lima",
        60,
        "Encontrado",
        "Alojamento Igreja Assembleia de Deus 8BC",
        "Av. Oitavo Bc, 694 - Fião, São Leopoldo - RS, 93020-530"
        ),
        (
        "Ana Salles Alves",
        10,
        "Encontrado",
        "1º IGREJA DO EVANGELHO QUADRANGULAR",
        "R. Demétrio Ribeiro, 47 - Centro Histórico, Porto Alegre - RS, 90010-313"
        ),
        (
        "Patricia Vasconcelos Almeida",
        34,
        "Encontrado",
        "Bigornão",
        "Av. Pres. João Goulart - Morro do Espelho, São Leopoldo - RS, 93020-190"
        )
        `);
  } else {
    console.log(`Banco pronto com ${checagem.total} registros`);
  }

  const todosOsRegistros = await db.all("SELECT * FROM registros");
  console.table(todosOsRegistros);

  return db;
};

// bancoDados();

module.exports = { bancoDados };
