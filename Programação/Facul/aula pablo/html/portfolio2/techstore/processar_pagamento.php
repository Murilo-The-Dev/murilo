<?php
require_once 'config/database.php';
require_once 'includes/session.php';

requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: portfolio2.php');
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados || empty($dados['carrinho'])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Carrinho vazio']);
    exit;
}

$usuario = getUserData();
$carrinho = $dados['carrinho'];
$total = 0;

foreach ($carrinho as $item) {
    $total += $item['price'] * $item['quantity'];
}

try {
    $conn = getConnection();
    $conn->beginTransaction();
    
    $stmt = $conn->prepare("INSERT INTO pedidos (usuario_id, total) VALUES (?, ?)");
    $stmt->execute([$usuario['id'], $total]);
    $pedido_id = $conn->lastInsertId();
    
    $stmt = $conn->prepare("INSERT INTO pedidos_itens (pedido_id, produto_nome, produto_preco, quantidade, subtotal) VALUES (?, ?, ?, ?, ?)");
    
    foreach ($carrinho as $item) {
        $subtotal = $item['price'] * $item['quantity'];
        $stmt->execute([
            $pedido_id,
            $item['name'],
            $item['price'],
            $item['quantity'],
            $subtotal
        ]);
    }
    
    $conn->commit();
    echo json_encode(['sucesso' => true, 'pedido_id' => $pedido_id]);
    
} catch(PDOException $e) {
    $conn->rollBack();
    http_response_code(500);
    echo json_encode(['erro' => 'Falha ao processar']);
}