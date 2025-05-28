#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int matricula;
    char nome[50];
    float nota;
}Aluno;

#define TAM 50

int main() {
    Aluno turma[TAM];

    printf("Cadastro de Alunos\n\n");

    for(int i = 0; i < TAM; i++) {
        printf("Digite a matricula do aluno %d: ", i + 1);
        scanf("%d", &turma[i].matricula);

        if (turma[i].matricula == 0) {
            break;
        }

        printf("Digite o nome do aluno %d: ", i + 1);
        scanf(" %[^\n]", turma[i].nome);

        printf("Digite a nota do aluno %d: ", i + 1);
        scanf("%f", &turma[i].nota);

        if (turma[i].nota < 0 || turma[i].nota > 10) {
            printf("Nota invalida! Digite novamente.\n");
            i--;
            continue;
        }

        if (i >= TAM) {
            printf("Limite de alunos atingido.\n");
            break;
        }
        printf("\n");
    }

    printf("\nLista de Alunos:\n");
    for(int i = 0; i < TAM; i++) {
        if (turma[i].matricula == 0) {
            break; 
        }
        printf("Matricula: %d, Nome: %s, Nota: %.2f\n\n", turma[i].matricula, turma[i].nome, turma[i].nota);
    }

}