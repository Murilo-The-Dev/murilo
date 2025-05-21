#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int randNum() {
    int num = (rand() % 100) + 1;
    return num;
}

void verifica(int *numA, int *tent) {
    if (*numA == *tent) {
        printf("Parabens! Voce acertou o numero!\n");
    } else if (*numA < *tent) {
        printf("O numero aleatorio eh menor que sua tentativa... Tente novamente.\n");
    } else {
        printf("O numero aleatorio eh maior que sua tentativa... Tente novamente.\n");
    }
}

int main() {
    srand(time(NULL));
    int numAleatorio = randNum();
    int contTentativas = 0;
    int tent;

    printf("~~~~Jogo de Adivinhacao~~~~\n\n");
    printf("Tente adivinhar o numero aleatorio entre 1 e 100.\n");  
    printf("Digite 0 para sair do jogo.\n\n");

    while (1) {
        printf("Digite sua tentativa: ");
        char buffer[100];
        if (!fgets(buffer, sizeof(buffer), stdin)) {
            printf("Erro de leitura.\n");
            continue;
        }
        int tent_local;
        char extra;
        if (sscanf(buffer, "%d %c", &tent_local, &extra) != 1) {
            printf("Tentativa invalida! Digite um numero inteiro entre 1 e 100.\n");
            continue;
        }
        tent = tent_local;
        if (tent == 0) {
            printf("Voce saiu do jogo.\n");
            break;
        }
        if (tent < 1 || tent > 100) {
            printf("Tentativa invalida! Digite um numero entre 1 e 100.\n");
            continue;
        }
        
        contTentativas++;
        verifica(&numAleatorio, &tent);

        if (tent == numAleatorio) {
            printf("Voce acertou o numero em %d tentativas!\n", contTentativas);
            break;
        }
    }
}