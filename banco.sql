CREATE DATABASE IF NOT EXISTS academico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE academico;

CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sigla VARCHAR(15) NOT NULL UNIQUE,
    nome VARCHAR(120) NOT NULL,
    carga_horaria INT NOT NULL
);

INSERT INTO disciplinas (sigla, nome, carga_horaria) VALUES
('3DAW', 'Desenvolvimento de Aplicações Web', 80),
('3POB', 'Programação Orientada a Objetos', 80);