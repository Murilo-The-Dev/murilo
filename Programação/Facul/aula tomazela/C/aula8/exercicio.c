#include <stdio.h>

float validarNota(int numNota) {
    float nota;
    int valid = 0;
    while (!valid) {
        printf("  Nota %d: ", numNota);
        if (scanf("%f", &nota) != 1) {
            printf("  Entrada invalida! Digite um numero.\n");
            while (getchar() != '\n');
        } else if (nota < 0.0 || nota > 10.0) {
            printf("  Nota invalida! Digite um valor entre 0 e 10.\n");
        } else {
            valid = 1;
        }
    }
    return nota;
}

float calcularMediaAluno(int qntNotas) {
    float soma = 0.0;
    for (int j = 0; j < qntNotas; j++) {
        soma += validarNota(j + 1);
    }
    return soma / qntNotas;
}

void exibirResumo(int alunos, float medias[], int reprovados) {
    float somaMedias = 0.0;
    for (int i = 0; i < alunos; i++) {
        somaMedias += medias[i];
    }
    float mediaSala = somaMedias / alunos;

    printf("\n~~~~Resumo da Sala~~~~\n\n");
    printf("Quantidade de alunos: %d\n", alunos);
    printf("Media da sala: %.2f\n", mediaSala);
    printf("Quantidade de alunos reprovados: %d\n", reprovados);
    printf("Quantidade de alunos aprovados: %d\n\n", alunos - reprovados);
}

int main() {
    int alunos = 0;
    int qntNotas = 0;

    printf("\n~~~~Calculadora de Media das Notas~~~~\n\n");
    printf("Digite a quantidade de alunos: ");
    scanf("%d", &alunos);
    printf("Digite a quantidade de notas por aluno: ");
    scanf("%d", &qntNotas);
    printf("\n");

    float medias[alunos];
    int reprovados = 0;

    for (int i = 0; i < alunos; i++) {
        printf("Aluno %d:\n", i + 1);
        medias[i] = calcularMediaAluno(qntNotas);

        printf("\n  Media do aluno %d: %.2f\n", i + 1, medias[i]);
        if (medias[i] < 6.0) {
            printf("  Aluno %d reprovado\n", i + 1);
            reprovados++;
        } else {
            printf("  Aluno %d aprovado\n", i + 1);
        }
        printf("  ------------------------------\n");
    }

    exibirResumo(alunos, medias, reprovados);

    return 0;
}