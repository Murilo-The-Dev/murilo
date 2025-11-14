<?php
require_once 'includes/session.php';
requireLogin();
$usuario = getUserData();
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Loja Virtual Premium</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
            min-height: 100vh;
            padding: 40px 0 80px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            position: relative;
            overflow-x: hidden;
        }

        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.3), transparent 50%);
            animation: pulse 15s ease-in-out infinite;
            pointer-events: none;
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 0.5;
            }

            50% {
                opacity: 0.8;
            }
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 60px;
            animation: fadeInDown 0.8s ease;
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header h1 {
            font-size: 3.5rem;
            font-weight: 800;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            margin-bottom: 15px;
            background: linear-gradient(90deg, #fff 0%, #e0e7ff 50%, #fff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header p {
            font-size: 1.3rem;
            opacity: 0.95;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            letter-spacing: 0.5px;
        }

        .container {
            position: relative;
            z-index: 1;
        }

        .product-card {
            height: 100%;
            border: none;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            position: relative;
            animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .product-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            opacity: 0;
            transition: opacity 0.3s;
        }

        .product-card:hover::before {
            opacity: 1;
        }

        .product-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
        }

        .product-card:nth-child(2) {
            animation-delay: 0.2s;
        }

        .product-card:nth-child(3) {
            animation-delay: 0.4s;
        }

        .product-img {
            height: 320px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        .product-img::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
        }

        .product-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
            filter: brightness(0.95);
        }

        .product-card:hover .product-img img {
            transform: scale(1.15) rotate(2deg);
            filter: brightness(1);
        }

        .badge-new {
            position: absolute;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 8px 20px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.85rem;
            z-index: 2;
            box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
            animation: pulse-badge 2s ease-in-out infinite;
        }

        @keyframes pulse-badge {

            0%,
            100% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.05);
            }
        }

        .card-body {
            padding: 30px;
            position: relative;
        }

        .card-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #1a202c;
            margin-bottom: 12px;
            letter-spacing: -0.5px;
        }

        .card-text {
            color: #4a5568;
            font-size: 0.95rem;
            margin-bottom: 20px;
            min-height: 45px;
            line-height: 1.6;
        }

        .price {
            font-size: 2.2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
            margin-bottom: 25px;
            display: block;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .quantity-input {
            width: 80px;
            border: 3px solid #e2e8f0;
            border-radius: 12px;
            padding: 12px;
            font-weight: 700;
            text-align: center;
            font-size: 1.1rem;
            transition: all 0.3s;
        }

        .quantity-input:focus {
            border-color: #667eea;
            outline: none;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
            transform: scale(1.05);
        }

        .btn-add {
            flex: 1;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 12px;
            padding: 14px 28px;
            color: white;
            font-weight: 700;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            position: relative;
            overflow: hidden;
        }

        .btn-add::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }

        .btn-add:hover::before {
            left: 100%;
        }

        .btn-add:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
        }

        .btn-add:active {
            transform: translateY(-1px);
        }

        .cart-summary {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            padding: 45px;
            border-radius: 25px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            margin-top: 80px;
            animation: fadeInUp 0.8s ease 0.6s both;
        }

        .cart-summary h3 {
            color: #1a202c;
            font-weight: 800;
            font-size: 2.2rem;
            margin-bottom: 35px;
            position: relative;
            padding-bottom: 20px;
        }

        .cart-summary h3::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80px;
            height: 5px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            border-radius: 3px;
        }

        .cart-item {
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .cart-item:hover {
            background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
            transform: translateX(10px);
            border-color: #cbd5e0;
        }

        .cart-item-name {
            color: #1a202c;
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .cart-item-details {
            color: #4a5568;
            font-size: 0.95rem;
        }

        .cart-item-price {
            color: #667eea;
            font-size: 1.4rem;
            font-weight: 800;
        }

        .total-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            border-radius: 20px;
            margin-top: 35px;
            color: white;
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }

        .total-section h4 {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 15px;
            opacity: 0.95;
        }

        .total-value {
            font-size: 3rem;
            font-weight: 900;
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-clear {
            background: white;
            color: #764ba2;
            border: none;
            border-radius: 15px;
            padding: 16px 40px;
            font-weight: 800;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-clear:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
            background: #f7fafc;
            color: #667eea;
        }

        .btn-pay {
            background: rgba(255, 255, 255, 0.3);
            color: rgba(255, 255, 255, 0.5);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 15px;
            padding: 16px 40px;
            font-weight: 800;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            cursor: not-allowed;
            backdrop-filter: blur(5px);
        }

        .btn-pay:disabled {
            background: rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.4);
            border: 2px solid rgba(255, 255, 255, 0.2);
            transform: none;
        }

        .btn-pay:enabled {
            background: white;
            color: #10b981;
            border: 2px solid white;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }

        .btn-pay:enabled:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
            background: #10b981;
            color: white;
        }

        .empty-cart {
            text-align: center;
            padding: 60px 40px;
            color: #a0aec0;
        }

        .empty-cart-icon {
            font-size: 5rem;
            margin-bottom: 25px;
            opacity: 0.5;
        }

        .empty-cart p {
            font-size: 1.2rem;
            font-weight: 600;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 2.5rem;
            }

            .product-img {
                height: 250px;
            }

            .cart-summary {
                padding: 30px 20px;
            }
        }

        footer {
            background: rgba(26, 32, 44, 0.95);
            backdrop-filter: blur(10px);
            color: white;
            padding: 40px 0;
            margin-top: 80px;
            border-top: 3px solid rgba(102, 126, 234, 0.5);
            position: relative;
            z-index: 10;
        }

        .footer-content {
            text-align: center;
        }

        .footer-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 25px;
            color: #e2e8f0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .team-member {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px 25px;
            border-radius: 12px;
            margin: 10px auto;
            max-width: 500px;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .team-member:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: translateX(10px);
            border-color: rgba(102, 126, 234, 0.5);
        }

        .team-member-name {
            font-weight: 700;
            font-size: 1.1rem;
            color: #fff;
        }

        .team-member-id {
            color: #a0aec0;
            font-size: 0.95rem;
            margin-left: 10px;
        }

        .footer-divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            margin: 30px auto;
            border-radius: 2px;
        }

        .footer-copyright {
            color: #718096;
            font-size: 0.9rem;
            margin-top: 20px;
        }

        .user-bar {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 12px 25px;
            border-radius: 50px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 600;
            color: #1a202c;
        }

        .btn-logout {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 20px;
            border-radius: 20px;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.9rem;
            transition: all 0.3s;
        }

        .btn-logout:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
            color: white;
        }
    </style>
</head>

<body>
    <div class="user-bar">
        <span>Olá, <?= htmlspecialchars($usuario['nome']) ?></span>
        <a href="logout.php" class="btn-logout">Sair</a>
    </div>
    <div class="container">
        <div class="header">
            <h1>🛍️ TechStore Premium</h1>
            <p>Tecnologia de ponta com design excepcional</p>
        </div>

        <div class="row g-4">
            <div class="col-md-4">
                <div class="card product-card">
                    <div class="badge-new">NOVO</div>
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"
                            alt="Smartphone">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Smartphone XZ Pro</h5>
                        <p class="card-text">Tela AMOLED 6.5", 128GB, Câmera 48MP com IA, Rede 5G</p>
                        <span class="price">R$ 1.899,00</span>
                        <div class="quantity-controls">
                            <input type="number" class="form-control quantity-input" min="0" value="0" id="qty-1">
                            <button class="btn btn-add" onclick="addToCart(1, 'Smartphone XZ Pro', 1899)">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card product-card">
                    <div class="badge-new">NOVO</div>
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"
                            alt="Notebook">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Notebook Ultra 15</h5>
                        <p class="card-text">Intel Core i7 12ª Gen, 16GB RAM, SSD 512GB NVMe, Tela Full HD IPS</p>
                        <span class="price">R$ 3.499,00</span>
                        <div class="quantity-controls">
                            <input type="number" class="form-control quantity-input" min="0" value="0" id="qty-2">
                            <button class="btn btn-add" onclick="addToCart(2, 'Notebook Ultra 15', 3499)">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card product-card">
                    <div class="badge-new">NOVO</div>
                    <div class="product-img">
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
                            alt="Fone">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Fone Bluetooth Max</h5>
                        <p class="card-text">Cancelamento ativo de ruído, 30h de bateria, Áudio Hi-Fi Premium</p>
                        <span class="price">R$ 599,00</span>
                        <div class="quantity-controls">
                            <input type="number" class="form-control quantity-input" min="0" value="0" id="qty-3">
                            <button class="btn btn-add" onclick="addToCart(3, 'Fone Bluetooth Max', 599)">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cart-summary">
            <h3>🛒 Carrinho de Compras</h3>
            <div id="cart-items">
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Seu carrinho está vazio</p>
                </div>
            </div>
            <div class="total-section">
                <h4>Total da Compra</h4>
                <div class="total-value" id="total">R$ 0,00</div>
                <div class="d-flex gap-3 mt-3">
                    <button class="btn btn-clear flex-fill" onclick="clearCart()">🗑️ Limpar Carrinho</button>
                    <button class="btn btn-pay flex-fill" id="btn-pay" onclick="pagar()" disabled>💳 Pagar</button>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">Equipe de Desenvolvimento</h3>

                <div class="team-member">
                    <span class="team-member-name">Murilo do Amaral Christofoletti</span>
                    <span class="team-member-id">8204209</span>
                </div>

                <div class="team-member">
                    <span class="team-member-name">Alexandre Ricardo Calore</span>
                    <span class="team-member-id">8205280</span>
                </div>

                <div class="team-member">
                    <span class="team-member-name">Geovanni Adrian de Oliveira Muniz</span>
                    <span class="team-member-id">8203566</span>
                </div>

                <div class="team-member">
                    <span class="team-member-name">Guilherme Rodrigues da Conceição</span>
                    <span class="team-member-id">8183961</span>
                </div>


                <div class="footer-divider"></div>

                <p class="footer-copyright">© 2024 TechStore Premium - Todos os direitos reservados</p>
            </div>
        </div>
    </footer>

    <script>
        let cart = {};

        function loadCart() {
            const saved = localStorage.getItem('cart');
            if (saved) {
                cart = JSON.parse(saved);
                updateCartDisplay();
            }
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function addToCart(id, name, price) {
            const qtyInput = document.getElementById(`qty-${id}`);
            const qty = parseInt(qtyInput.value);

            if (qty > 0) {
                if (cart[id]) {
                    cart[id].quantity += qty;
                } else {
                    cart[id] = {
                        name: name,
                        price: price,
                        quantity: qty
                    };
                }
                qtyInput.value = 0;
                saveCart();
                updateCartDisplay();
            }
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cart-items');
            const totalElement = document.getElementById('total');
            const btnPay = document.getElementById('btn-pay');

            if (Object.keys(cart).length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <p>Seu carrinho está vazio</p>
                    </div>
                `;
                totalElement.textContent = 'R$ 0,00';
                btnPay.disabled = true;
                return;
            }

            let html = '';
            let total = 0;

            for (const [id, item] of Object.entries(cart)) {
                const subtotal = item.price * item.quantity;
                total += subtotal;
                html += `
                    <div class="cart-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <div class="cart-item-name">${item.name}</div>
                                <div class="cart-item-details">Quantidade: ${item.quantity} × R$ ${item.price.toFixed(2)}</div>
                            </div>
                            <div class="text-end">
                                <div class="cart-item-price">R$ ${subtotal.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                `;
            }

            cartItems.innerHTML = html;
            totalElement.textContent = `R$ ${total.toFixed(2)}`;
            btnPay.disabled = false;
        }

        function clearCart() {
            cart = {};
            localStorage.removeItem('cart');
            updateCartDisplay();
        }

        function pagar() {
            if (Object.keys(cart).length > 0) {
                window.location.href = 'hahaha.html';
            }
        }

        loadCart();
    </script>
</body>

</html>