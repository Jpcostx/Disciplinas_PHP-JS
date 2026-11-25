<?php
header('Content-Type: application/json; charset=utf-8');
require '../conexao.php';

$stmt = $pdo->query("SELECT id, sigla, nome, carga_horaria FROM disciplinas ORDER BY id ASC");
$disciplinas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['sucesso' => true, 'dados' => $disciplinas]);