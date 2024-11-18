CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES (
    "DEKU",
    "deku@teste.com",
    15
);

DELETE FROM usuarios WHERE nome = "DEKU"

SELECT * FROM usuarios WHERE nome = "Daniel Rocha";

SELECT * FROM usuarios WHERE idade <= 8

UPDATE usuarios SET idade = 25 WHERE nome = "Daniel Rocha"