#include <stdio.h>

int main(){

    int nota;
    printf("Informe sua nota:");
    scanf("%d",&nota);

    if(nota >= 9 && nota <= 10){
        printf("Vc foi aprovado! Tirou um A!\n");
    }else if(nota >= 7 && nota < 9){
        printf("Vc foi aprovado! Tirou um B!\n");
    }else if(nota >= 5 && nota < 7){
        printf("Vc foi aprovado! Tirou um C!\n");
    }else if(nota >= 3 && nota < 5){
        printf("Vc passou por pouco, estude mais! Tirou um D!\n");
    }else if(nota >= 0 && nota < 3){
        printf("Vc nem passou, estude mais! Reprovado!\n");
    }else{
        printf("Sua nota nem eh valida!\n\n");
    }
    return 0;
}