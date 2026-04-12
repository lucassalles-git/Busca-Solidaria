const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const bancoDados = async () => {
  //Abrindo o banco de dados
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS registro(
    
    -- locais
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_abrigo TEXT,
    local_abrigo TEXT,
    capacidade_maxima INTEGER,
    vagas TEXT DEFAULT "Disponível"
    )
        `);

  console.log("Banco de dados configurado: A tabela de registros está pronta");

  const checagem = await db.get(`SELECT COUNT (*) AS total FROM registros`);

  if (checagem.total === 0) {
    await db.exec(`
        INSERT INTO registros(nome_abrigo, local_abrigo, capacidade_maxima) VALUES (
        "AABB Canoas",
        "Rua Santa Terezinha, 860 - Nossa Sra. das Gracas, Canoas - RS, 92025-620",
        343
        ),
        (
        "Alojamento Igreja Assembleia de Deus 8BC",
        "Av. Oitavo Bc, 694 - Fião, São Leopoldo - RS, 93020-530",
        450
        ),
        (
        "1º IGREJA DO EVANGELHO QUADRANGULAR",
        "R. Demétrio Ribeiro, 47 - Centro Histórico, Porto Alegre - RS, 90010-313",
        81
        ),
        (
        "Bigornão",
        "Av. Pres. João Goulart - Morro do Espelho, São Leopoldo - RS, 93020-190",
        500
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
