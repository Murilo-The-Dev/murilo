#include <stdio.h>

void dobrarValores(int *v, int tamanho)
{
    for (int i = 0; i < tamanho; i++)
    {
        *(v + i) = *(v + i) * 2;
    }
}

float calcMedia(int v[], int tamanho)
{
    int soma = 0;
    for (int i = 0; i < tamanho; i++)
    {
        soma += v[i];
    }
    return (float)soma / tamanho;
}

int main()
{
    int notas[3] = {7, 3, 9};
    float media = calcMedia(notas, 3);
    int pDobrar[5] = {1, 2, 3, 4, 5};

    printf("A Media das notas eh de: %.2f\n", media);

    dobrarValores(pDobrar, 5);

    printf("Os valores dobrados sao: ");
    for (int i = 0; i < 5; i++)
    {
        printf("%d ", pDobrar[i]);
    }
    printf("\n");

    return 0;
}
