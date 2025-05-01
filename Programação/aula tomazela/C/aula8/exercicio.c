#include <stdio.h>

    int main() {
        int alunos = 0;
        int qntNotas = 0;
        float media = 0.0;
        float mediaSala = 0.0;

        printf("\n~~~~Calculadora de Media das Notas~~~~\n\n");
        printf("Digite a quantidade de alunos: ");
        scanf("%d", &alunos);
        printf("Digite a quantidade de notas por aluno: ");
        scanf("%d", &qntNotas);
        printf("\n");
        float notas[alunos][qntNotas];

        for (int i = 0; i < alunos; i++) {
            float soma = 0.0;
            printf("Aluno %d:\n", i + 1);
            for (int j = 0; j < qntNotas; j++) {
                printf("  Nota %d: ", j + 1);
                scanf("%f", &notas[i][j]);
                soma += notas[i][j];
            }
            media = soma / qntNotas;
            printf("\n  Media do aluno %d: %.2f\n\n", i + 1, media);
            if (media < 6.0) {
                printf("  Aluno %d reprovado\n", i + 1);
            } else {
                printf("  Aluno %d aprovado\n", i + 1);
            }
            printf("  ------------------------------\n");
        }

        printf("\n~~~~Resumo da Sala~~~~\n\n");

        float somaMedias = 0.0;
        for (int i = 0; i < alunos; i++) {
            float soma = 0.0;
            for (int j = 0; j < qntNotas; j++) {
                soma += notas[i][j];
            }
            somaMedias += soma / qntNotas;
        }
        mediaSala = somaMedias / alunos;
        printf("Media da sala: %.2f\n\n", mediaSala);

        int reprovados = 0;
        for (int i = 0; i < alunos; i++) {
            float soma = 0.0;
            for (int j = 0; j < qntNotas; j++) {
                soma += notas[i][j];
            }
            if (soma / qntNotas < 6.0) {
                reprovados++;
            }
        }
        printf("Quantidade de alunos reprovados: %d\n\n", reprovados);
        printf("Quantidade de alunos aprovados: %d\n\n", alunos - reprovados);

        return 0;
    }