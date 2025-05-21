#include <stdio.h>

double calcMedia(double *vNotas, int *qAlunos) {
    double soma = 0;
    for (int i = 0; i < *qAlunos; i++) {
        soma += *(vNotas + i);
    }
    return soma / *qAlunos;
}

int main() {
    int alunos = 5;
    double notas[alunos];

    printf("~~~~Sistema de Notas~~~~\n\n");

    for (int i = 0; i < alunos; i++) {
        printf("Digite a nota do aluno %d: ", i + 1);
        scanf("%lf", &notas[i]);
        if (notas[i] < 0 || notas[i] > 10) {
            printf("Nota invalida! Digite novamente.\n");
            i--;
            continue;
        }
    }

    double media = calcMedia(notas, &alunos);
    printf("\nA media das notas e: %.2f\n", media);

    printf("\n~~~~Resultado dos Alunos~~~~\n\n");
    for (int i = 0; i < alunos; i++) {
        printf("Aluno %d: Nota = %.2f - ", i + 1, notas[i]);
        switch ((notas[i] >= 6.0)) {
            case 1:
                printf("Aprovado\n");
                break;
            case 0:
                printf("Reprovado\n");
                break;
        }
    }

    return 0;
}