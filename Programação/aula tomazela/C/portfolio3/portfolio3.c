#include <stdio.h>

int contador = 0;

void sacar(float *vSaldo)
{
    float saque;
    printf("\nInforme o valor a ser sacado: R$");
    scanf("%f", &saque);
    *vSaldo = *vSaldo - saque;
    contador++;
}

void depositar(float *vSaldo)
{
    float deposito;
    printf("\nInforme o valor a ser depositado: R$");
    scanf("%f", &deposito);
    *vSaldo = *vSaldo + deposito;
    contador++;
}

void verificarSaldo(float *vSaldo)
{
    printf("Seu saldo eh de R$ %.2f\n\n", *vSaldo);
    contador++;
}

void mostrarHistorico()
{
    printf("Vc fez %d operacoes!\n\n", contador);
}

int main()
{
    int escolha;
    int continuar = 1;
    float saldo = 0;

    printf("=== Caixa Eletronico, Portfolio2 ===\n\n");

    do
    {
        printf("Escolha sua opcao:\n");
        printf("1 - Saldo\n");
        printf("2 - Sacar\n");
        printf("3 - Depositar\n");
        printf("4 - Historico\n");
        printf("5 - Sair\n");
        printf("\nSua escolha: ");
        scanf("%d", &escolha);

        if (escolha < 1 || escolha > 5)
        {
            printf("Escolha invalida! Por favor, escolha 1, 2, 3, 4 ou 5.\n\n");
            continue;
        }

        switch (escolha)
        {
        case 1:
            verificarSaldo(&saldo);
            break;

        case 2:
            sacar(&saldo);
            verificarSaldo(&saldo);
            break;

        case 3:
            depositar(&saldo);
            verificarSaldo(&saldo);

            break;

        case 4:
            mostrarHistorico();
            break;

        default:
            printf("\nSaindo do Sistema...\n\n");
            break;
        }

    } while (escolha != 5);
    
    return 0;
}