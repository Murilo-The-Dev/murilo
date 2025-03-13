#include <stdio.h>

int main() {
    float num1, num2, resultado;
    char operador;

    printf("Digite o primeiro numero: ");
    scanf("%f", &num1);

    printf("Digite o operador (+, -, *, /): ");
    scanf(" %c", &operador);

    printf("Digite o segundo numero: ");
    scanf("%f", &num2);

    if (operador == '+') {
        resultado = num1 + num2;
        printf("Resultado: %.2f\n", resultado);
    } else if (operador == '-') {
        resultado = num1 - num2;
        printf("Resultado: %.2f\n", resultado);
    } else if (operador == '*') {
        resultado = num1 * num2;
        printf("Resultado: %.2f\n", resultado);
    } else if (operador == '/') {
        if (num2 != 0) {
            resultado = num1 / num2;
            printf("Resultado: %.2f\n", resultado);
        } else {
            printf("Erro: Divisaum por zero!\n");
        }
    } else {
        printf("Operador invalido!\n");
    }
    return 0;
}
