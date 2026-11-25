<?php
header('Content-Type: application/json; charset=utf-8');
require '../conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método inválido.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$sigla = strtoupper(trim($input['sigla'] ?? ''));
$nome = trim($input['nome'] ?? '');
$carga_horaria = (int)($input['carga_horaria'] ?? 0);

if (empty($sigla)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'A sigla da disciplina é obrigatória.']);
    exit;
}

if (empty($nome)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'O nome da disciplina é obrigatório.']);
    exit;
}

if ($carga_horaria <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Informe uma carga horária válida (maior que zero).']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO disciplinas (sigla, nome, carga_horaria) VALUES (:sigla, :nome, :carga_horaria)");
    $stmt->execute([
        ':sigla' => $sigla,
        ':nome' => $nome,
        ':carga_horaria' => $carga_horaria
    ]);

    echo json_encode(['sucesso' => true, 'mensagem' => 'Disciplina cadastrada com sucesso!']);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Já existe uma disciplina cadastrada com esta sigla.']);
    } else {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao salvar no banco de dados.']);
    }
}