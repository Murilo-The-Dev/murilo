#include <stdio.h>

void soma(float *resultado, float a, float b) {
    *resultado =  a + b;
}

void subtrai(float *resultado, float a, float b) {
    *resultado =  a - b;
}

void multiplica(float *resultado, float a, float b) {
    *resultado =  a * b;
}

void divide(float *resultado, float a, float b) {
    *resultado =  a / b;
}

void inverte(float *a, float *b) {
    float temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    float v1, v2, resultado;
    int continuar = 1;
    char operador;


    printf("===SUPER CALCULADORA===\n\n");

    while(continuar) {
        printf("Digite o primeiro numero: ");
        scanf("%f", &v1);

        printf("Digite o operador (+, -, *, / ou '[' para inverter): ");
        scanf(" %c", &operador);

        printf("Digite o segundo numero: ");
        scanf("%f", &v2);

        if (operador == '+') {
            soma(&resultado, v1, v2);
            printf("Resultado: %.2f\n", resultado);
        } else if (operador == '-') {
            subtrai(&resultado, v1, v2);
            printf("Resultado: %.2f\n", resultado);
        } else if (operador == '*') {
            multiplica(&resultado, v1, v2);
            printf("Resultado: %.2f\n", resultado);
        } else if (operador == '/') {
            if (v2 != 0) {
                divide(&resultado, v1, v2);
                printf("Resultado: %.2f\n", resultado);
            } else {
                printf("Erro: Divisao por zero!\n");
            }
        } else if (operador == '[') {
            inverte(&v1, &v2);
            printf("Valores invertidos: V1=%.2f e V2=%.2f.\n", v1, v2);
        } else {
            printf("Operador invalido!\n");
        }
        
        printf("\nDeseja continuar? (1 para sim, 0 para nao): ");
        scanf("%d", &continuar);
    }
    return 0;
}