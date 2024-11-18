let saldo = 0;

function realizarOperacao() {
    while (true) {
        const operacao = prompt("Escolha uma operação:\n1. Depósito\n2. Saque\n3. Ver Saldo\n4. Sair");

        // Convertendo a operação para número
        const op = parseInt(operacao);

        // Usando switch para determinar a operação
        switch (op) {
            case 1: // Depósito
                const valorDeposito = parseFloat(prompt("Digite o valor para depósito:"));

                // Lógica de programação para o valor de depósito
                if (isNaN(valorDeposito) || valorDeposito <= 0) {
                    alert("Valor inválido para depósito. Por favor, insira um valor numérico maior que zero.");
                } else {
                    saldo += valorDeposito;
                    alert(`Depósito de R$ ${valorDeposito.toFixed(2)} realizado com sucesso. Novo saldo: R$ ${saldo.toFixed(2)}`);
                }
                break;

            case 2: // Saque
                const valorSaque = parseFloat(prompt("Digite o valor para saque:"));

                // Lógica de programação para o valor de saque
                if (isNaN(valorSaque) || valorSaque <= 0) {
                    alert("Valor inválido para saque. Por favor, insira um valor numérico maior que zero.");
                } else if (valorSaque > saldo) {
                    alert("Saldo insuficiente para realizar o saque.");
                } else {
                    saldo -= valorSaque;
                    alert(`Saque de R$ ${valorSaque.toFixed(2)} realizado com sucesso. Novo saldo: R$ ${saldo.toFixed(2)}`);
                }
                break;

            case 3: // Ver Saldo
                // Função para imprimir o saldo na tela
                alert(`Seu saldo atual é: R$ ${saldo.toFixed(2)}`);
                break;

            case 4: // Sair
                // Função para sair
                alert("Obrigado por utilizar nosso sistema bancário. Até a próxima!");
                return;

            default: // Opção inválida
                // Validar uma função inválida
                alert("Opção inválida. Por favor, escolha uma opção válida.");
        }
    }
}

realizarOperacao();
