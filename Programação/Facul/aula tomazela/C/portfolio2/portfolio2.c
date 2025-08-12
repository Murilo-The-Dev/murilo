#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int escolhaUsuario, escolhaComputador;
    int jogarNovamente = 1;
    
    srand(time(NULL));
    
    printf("=== JOGO DE PEDRA, PAPEL E TESOURA ===\n\n");
    
    while (jogarNovamente) {

        printf("Escolha sua jogada:\n");
        printf("1 - Pedra\n");
        printf("2 - Papel\n");
        printf("3 - Tesoura\n");
        printf("Sua escolha: ");
        scanf("%d", &escolhaUsuario);

        if (escolhaUsuario < 1 || escolhaUsuario > 3) {
            printf("Escolha invalida! Por favor, escolha 1, 2 ou 3.\n\n");
            continue;
        }

        escolhaComputador = rand() % 3 + 1;

        printf("\nSua escolha: ");
        switch(escolhaUsuario) {
            case 1: printf("Pedra\n"); break;
            case 2: printf("Papel\n"); break;
            case 3: printf("Tesoura\n"); break;
        }
        
        printf("Escolha do computador: ");
        switch(escolhaComputador) {
            case 1: printf("Pedra\n"); break;
            case 2: printf("Papel\n"); break;
            case 3: printf("Tesoura\n"); break;
        }

        printf("\nResultado: ");
        if (escolhaUsuario == escolhaComputador) {
            printf("EMPATE!\n");
        } else if ((escolhaUsuario == 1 && escolhaComputador == 3) || 
                   (escolhaUsuario == 2 && escolhaComputador == 1) || 
                   (escolhaUsuario == 3 && escolhaComputador == 2)) {
            printf("VOCE VENCEU!\n");
        } else {
            printf("COMPUTADOR VENCEU!\n");
        }

        printf("\nQuer jogar novamente? (1 para Sim, 0 para Nao): ");
        scanf("%d", &jogarNovamente);
        printf("\n");
    }
    
    printf("Obrigado por jogar!\n");
    
    return 0;
}