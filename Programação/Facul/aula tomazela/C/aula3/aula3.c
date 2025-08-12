#include <stdio.h>

int main() {
    int numero;
    printf("Informe um numero:");
    scanf("%d",&numero);

    if(numero > 0){
        printf("O numero %d eh positivo\n",numero);
    }else if(numero < 0){
        printf("O numero %d eh negativo\n",numero);
    }else{
        printf("O numero eh zero\n");
    }
    return 0;
}