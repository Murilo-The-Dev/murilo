<?php
require_once 'config/database.php';
require_once 'includes/session.php';

$erro = '';
$sucesso = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $senha = $_POST['senha'] ?? '';
    $confirma_senha = $_POST['confirma_senha'] ?? '';
    $telefone = trim($_POST['telefone'] ?? '');
    $cpf = preg_replace('/[^0-9]/', '', $_POST['cpf'] ?? '');
    
    if (empty($nome) || empty($email) || empty($senha)) {
        $erro = 'Preencha todos os campos obrigatórios';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erro = 'Email inválido';
    } elseif (strlen($senha) < 6) {
        $erro = 'Senha deve ter no mínimo 6 caracteres';
    } elseif ($senha !== $confirma_senha) {
        $erro = 'Senhas não conferem';
    } else {
        try {
            $conn = getConnection();
            $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, telefone, cpf) VALUES (?, ?, ?, ?, ?)");
            $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
            $stmt->execute([$nome, $email, $senha_hash, $telefone, $cpf]);
            $sucesso = 'Cadastro realizado com sucesso!';
        } catch(PDOException $e) {
            if ($e->getCode() == 23000) {
                $erro = 'Email ou CPF já cadastrado';
            } else {
                $erro = 'Erro ao cadastrar';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro - TechStore</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .form-container {
            background: white;
            border-radius: 25px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 500px;
            width: 100%;
        }
        .form-title {
            font-size: 2rem;
            font-weight: 800;
            color: #1a202c;
            margin-bottom: 30px;
            text-align: center;
        }
        .form-control {
            border-radius: 12px;
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            transition: all 0.3s;
        }
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }
        .btn-submit {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 12px;
            padding: 14px;
            color: white;
            font-weight: 700;
            width: 100%;
            transition: all 0.3s;
        }
        .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        .alert {
            border-radius: 12px;
        }
        .link-login {
            text-align: center;
            margin-top: 20px;
            color: #4a5568;
        }
        .link-login a {
            color: #667eea;
            font-weight: 700;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1 class="form-title">📝 Criar Conta</h1>
        
        <?php if ($erro): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($erro) ?></div>
        <?php endif; ?>
        
        <?php if ($sucesso): ?>
            <div class="alert alert-success"><?= htmlspecialchars($sucesso) ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="mb-3">
                <label class="form-label">Nome Completo *</label>
                <input type="text" class="form-control" name="nome" required value="<?= htmlspecialchars($_POST['nome'] ?? '') ?>">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Email *</label>
                <input type="email" class="form-control" name="email" required value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
            </div>
            
            <div class="mb-3">
                <label class="form-label">CPF</label>
                <input type="text" class="form-control" name="cpf" maxlength="14" placeholder="000.000.000-00" value="<?= htmlspecialchars($_POST['cpf'] ?? '') ?>">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Telefone</label>
                <input type="text" class="form-control" name="telefone" placeholder="(00) 00000-0000" value="<?= htmlspecialchars($_POST['telefone'] ?? '') ?>">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Senha *</label>
                <input type="password" class="form-control" name="senha" required minlength="6">
            </div>
            
            <div class="mb-3">
                <label class="form-label">Confirmar Senha *</label>
                <input type="password" class="form-control" name="confirma_senha" required minlength="6">
            </div>
            
            <button type="submit" class="btn btn-submit">Cadastrar</button>
        </form>
        
        <div class="link-login">
            Já tem conta? <a href="login.php">Fazer login</a>
        </div>
    </div>
</body>
</html>