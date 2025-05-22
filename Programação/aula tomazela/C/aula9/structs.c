#include <stdio.h>
#include <stdlib.h>

struct Aluno {
    int matricula;
    char nome[50];
    float media;
};

int main() {

    struct Aluno a1, a2;
    a1.matricula = 12345;
    a1.media = 8.5;
    snprintf(a1.nome, sizeof(a1.nome), "João da Silva");

    a2.matricula = 67890;
    a2.media = 7.5;
    snprintf(a2.nome, sizeof(a2.nome), "Maria Oliveira");

    printf("Matricula: %d\n", a1.matricula);
    printf("Nome: %s\n", a1.nome);
    printf("Media: %.2f\n", a1.media);

    printf("Matricula: %d\n", a2.matricula);
    printf("Nome: %s\n", a2.nome);
    printf("Media: %.2f\n", a2.media);
}
