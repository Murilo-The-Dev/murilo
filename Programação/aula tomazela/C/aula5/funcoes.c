#include <stdio.h>

void saudacao() {
    printf("Hello World!\n");
}

int soma(int *a, int *b) {
    return *a + *b;
}

int main() {
    int v1, v2, resultado;

    saudacao();

    printf("Coloque o primeiro numero: \n");
    scanf("%d", &v1);
    printf("Coloque o segundo numero: \n");
    scanf("%d", &v2);

    resultado = soma(&v1, &v2);

    printf("A soma eh: %d\n", resultado);
    return 0;
}