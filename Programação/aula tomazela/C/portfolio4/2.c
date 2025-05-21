#include <stdio.h>

void maiorNumero(int *vNumeros, int *qNumeros) {
    int maior = *vNumeros;
    for (int i = 1; i < *qNumeros; i++) {
        if (*(vNumeros + i) > maior) {
            maior = *(vNumeros + i);
        }
    }
    printf("\nO maior numero e: %d\n", maior);
}

void numerosPares(int *vNumeros, int *qNumeros) {
    printf("\nOs numeros pares sao: ");
    for (int i = 0; i < *qNumeros; i++) {
        if (*(vNumeros + i) % 2 == 0) {
            printf("%d ", *(vNumeros + i));
        }
    }
    printf("\n");
}

void menorNumero(int *vNumeros, int *qNumeros) {
    int menor = *vNumeros;
    for (int i = 1; i < *qNumeros; i++) {
        if (*(vNumeros + i) < menor) {
            menor = *(vNumeros + i);
        }
    }
    printf("\nO menor numero e: %d\n", menor);
}

int main() {
    int numeros[10];
    int qNumeros = 10;

    printf("\n~~~~ Sistema de Numeros ~~~~\n\n");

    for (int i = 0; i < qNumeros; i++) {
        printf("Digite o %d numero: ", i + 1);
        int temp;
        char c;
        if (scanf("%d%c", &temp, &c) != 2 || c != '\n' || temp < 0) {
            printf("Numero invalido! Digite novamente.\n");
            while (getchar() != '\n');
            i--;
            continue;
        }
        numeros[i] = temp;
    }

    maiorNumero(numeros, &qNumeros);
    menorNumero(numeros, &qNumeros);
    numerosPares(numeros, &qNumeros);

    return 0;
}