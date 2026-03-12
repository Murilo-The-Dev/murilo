<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // Recupera parâmetros do formulário
    String destino    = request.getParameter("destino");
    String distStr    = request.getParameter("distancia");
    String autoStr    = request.getParameter("autonomia");
    String litroStr   = request.getParameter("valorLitro");

    // Validação básica
    if (destino == null || distStr == null || autoStr == null || litroStr == null ||
        destino.trim().isEmpty() || distStr.trim().isEmpty() ||
        autoStr.trim().isEmpty() || litroStr.trim().isEmpty()) {
        response.sendRedirect("index.jsp");
        return;
    }

    double distancia  = Double.parseDouble(distStr.replace(",", "."));
    double autonomia  = Double.parseDouble(autoStr.replace(",", "."));
    double valorLitro = Double.parseDouble(litroStr.replace(",", "."));

    // Cálculos
    final double DEPRECIACAO_KM = 0.78;

    double litrosGastos      = distancia / autonomia;
    double valorCombustivel  = litrosGastos * valorLitro;
    double valorDepreciacao  = distancia * DEPRECIACAO_KM;
    double valorTotal        = valorCombustivel + valorDepreciacao;

    // Formatação BR
    java.text.NumberFormat nf = java.text.NumberFormat.getInstance(new java.util.Locale("pt","BR"));
    nf.setMaximumFractionDigits(2);
    nf.setMinimumFractionDigits(2);

    java.text.NumberFormat nfLitro = java.text.NumberFormat.getInstance(new java.util.Locale("pt","BR"));
    nfLitro.setMaximumFractionDigits(2);
    nfLitro.setMinimumFractionDigits(2);
%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado — <%= destino %></title>
    <link rel="stylesheet" href="estilo.css">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body class="resultado-page">
    <div class="bg-grid"></div>
    <div class="container resultado-container">
        <header>
            <div class="label-top">RESULTADO</div>
            <h1>RESUMO<br><span>DA VIAGEM</span></h1>
            <p class="destino-badge"><%= destino %></p>
        </header>

        <div class="cards-grid">
            <div class="result-card card-primary" style="animation-delay: 0.05s">
                <div class="card-icon">⛽</div>
                <div class="card-label">Combustível consumido</div>
                <div class="card-value"><%= nfLitro.format(litrosGastos) %> <span class="unit">L</span></div>
                <div class="card-sub"><%= nf.format(distancia) %> km ÷ <%= nfLitro.format(autonomia) %> km/L</div>
            </div>

            <div class="result-card card-secondary" style="animation-delay: 0.15s">
                <div class="card-icon">💧</div>
                <div class="card-label">Gasto em combustível</div>
                <div class="card-value">R$ <%= nf.format(valorCombustivel) %></div>
                <div class="card-sub"><%= nfLitro.format(litrosGastos) %> L × R$ <%= nf.format(valorLitro) %>/L</div>
            </div>

            <div class="result-card card-accent" style="animation-delay: 0.25s">
                <div class="card-icon">⚙</div>
                <div class="card-label">Depreciação do veículo</div>
                <div class="card-value">R$ <%= nf.format(valorDepreciacao) %></div>
                <div class="card-sub"><%= nf.format(distancia) %> km × R$ 0,78/km</div>
            </div>

            <div class="result-card card-total" style="animation-delay: 0.35s">
                <div class="card-icon">🏁</div>
                <div class="card-label">CUSTO TOTAL DA VIAGEM</div>
                <div class="card-value total-value">R$ <%= nf.format(valorTotal) %></div>
                <div class="card-sub">combustível + depreciação</div>
            </div>
        </div>

        <div class="breakdown-bar">
            <%
                double pctComb = (valorCombustivel / valorTotal) * 100;
                double pctDep  = (valorDepreciacao  / valorTotal) * 100;
            %>
            <div class="bar-label-row">
                <span>Combustível <strong><%= String.format("%.0f", pctComb) %>%</strong></span>
                <span>Depreciação <strong><%= String.format("%.0f", pctDep) %>%</strong></span>
            </div>
            <div class="bar-track">
                <div class="bar-fill-comb" style="width: <%= String.format("%.1f", pctComb) %>%"></div>
                <div class="bar-fill-dep"  style="width: <%= String.format("%.1f", pctDep)  %>%"></div>
            </div>
        </div>

        <a href="index.jsp" class="btn-voltar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>NOVA CONSULTA</span>
        </a>
    </div>
</body>
</html>
