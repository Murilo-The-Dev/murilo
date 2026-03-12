<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autonomia de Viagem</title>
    <link rel="stylesheet" href="estilo.css">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>
    <div class="bg-grid"></div>
    <div class="container">
        <header>
            <div class="label-top">CALCULADORA</div>
            <h1>AUTONOMIA<br><span>DE VIAGEM</span></h1>
            <p class="subtitle">Estime custos reais da sua rota antes de partir</p>
        </header>

        <form action="resultado.jsp" method="post" class="form-card">
            <div class="field-group">
                <label for="destino">Destino da viagem</label>
                <input
                    type="text"
                    id="destino"
                    name="destino"
                    placeholder="Ex: São Paulo → Rio de Janeiro"
                    required
                >
            </div>

            <div class="field-row">
                <div class="field-group">
                    <label for="distancia">Distância (km)</label>
                    <input
                        type="number"
                        id="distancia"
                        name="distancia"
                        placeholder="Ex: 450"
                        min="1"
                        step="0.1"
                        required
                    >
                </div>
                <div class="field-group">
                    <label for="autonomia">Autonomia (km/L)</label>
                    <input
                        type="number"
                        id="autonomia"
                        name="autonomia"
                        placeholder="Ex: 12"
                        min="1"
                        step="0.1"
                        required
                    >
                </div>
            </div>

            <div class="field-group">
                <label for="valorLitro">Valor do litro (R$)</label>
                <input
                    type="number"
                    id="valorLitro"
                    name="valorLitro"
                    placeholder="Ex: 5.89"
                    min="0.01"
                    step="0.01"
                    required
                >
            </div>

            <div class="depreciation-note">
                <span class="dep-icon">⚙</span>
                Depreciação do veículo incluída automaticamente: <strong>R$ 0,78/km</strong>
            </div>

            <button type="submit" class="btn-calcular">
                <span>CALCULAR</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </form>
    </div>
</body>
</html>
