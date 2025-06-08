#include <stdio.h>
#include <string.h>

#define MAX_ALUNOS 5
#define TAM_NOME 100

typedef struct {
    char nome[TAM_NOME];
    int idade;
    float nota_final;
} Aluno;

void analisar_turma(Aluno alunos[], int total) {
    float soma_notas = 0;
    int aprovados = 0, reprovados = 0;
    
    for (int i = 0; i < total; i++) {
        soma_notas += alunos[i].nota_final;
        if (alunos[i].nota_final >= 6.0) {
            aprovados++;
        } else {
            reprovados++;
        }
    }
    
    float media = soma_notas / total;
    
    printf("\n=== ANALISE DA TURMA ===\n");
    printf("Media da sala: %.2f\n", media);
    printf("Alunos aprovados: %d\n", aprovados);
    printf("Alunos reprovados: %d\n", reprovados);
    
    if (reprovados > 0) {
        printf("\n=== ALUNOS REPROVADOS ===\n");
        for (int i = 0; i < total; i++) {
            if (alunos[i].nota_final < 6.0) {
                printf("    Nome: %s", alunos[i].nome);
                printf("    Nota: %.2f\n", alunos[i].nota_final);
                printf("    ---\n");
            }
        }
    }
}

int main() {
    Aluno alunos[MAX_ALUNOS];
    int total_alunos = 0;
    
    printf("=== CADASTRO DE ALUNOS ===\n");
    printf("Digite os dados de ate %d alunos:\n\n", MAX_ALUNOS);
    
    while (total_alunos < MAX_ALUNOS) {
        printf("Aluno %d:\n", total_alunos + 1);
        
        printf("Nome: ");
        fgets(alunos[total_alunos].nome, TAM_NOME, stdin);
        
        int idade_valida = 0;
        while (!idade_valida) {
            printf("Idade: ");
            char buffer[32];
            if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
                if (sscanf(buffer, "%d", &alunos[total_alunos].idade) == 1 && alunos[total_alunos].idade > 0) {
                    idade_valida = 1;
                } else {
                    printf("Idade invalida! Digite um numero inteiro positivo.\n");
                }
            }
        }
        
        int nota_valida = 0;
        while (!nota_valida) {
            printf("Nota final: ");
            char buffer[32];
            if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
                if (sscanf(buffer, "%f", &alunos[total_alunos].nota_final) == 1 && alunos[total_alunos].nota_final >= 0.0 && alunos[total_alunos].nota_final <= 10.0) {
                    nota_valida = 1;
                } else {
                    printf("Nota invalida! Digite um valor entre 0 e 10.\n");
                }
            }
        }
        
        total_alunos++;
        
        if (total_alunos < MAX_ALUNOS) {
            printf("\nDeseja cadastrar outro aluno? (s/n): ");
            char resposta;
            scanf(" %c", &resposta);
            getchar();
            
            if (resposta != 's' && resposta != 'S') {
                break;
            }
            printf("\n");
        }
    }
    
    printf("\n=== ALUNOS CADASTRADOS ===\n");
    for (int i = 0; i < total_alunos; i++) {
        printf("    Nome: %s", alunos[i].nome);
        printf("    Idade: %d anos\n", alunos[i].idade);
        printf("    Nota final: %.2f\n", alunos[i].nota_final);
        printf("    ---\n");
    }
    
    analisar_turma(alunos, total_alunos);
    
    return 0;
}