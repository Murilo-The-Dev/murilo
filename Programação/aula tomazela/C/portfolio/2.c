#include <stdio.h>

int main() {

    char nome[50];
    int idade;

    printf("Digite seu nome completo: \n");
    fgets(nome, 50, stdin);

    printf("Digite sua idade: \n");
    scanf("%d",&idade);

    printf("Seu nome eh: %s", nome); 
    
    if (idade >= 0 && idade <= 14){
        printf("Pela sua idade de: %d, vc eh uma crianssa!\n",idade); //não da pra escrever o "ç"
    }else if(idade >= 15 && idade < 18){
        printf("Pela sua idade de: %d, vc eh um jovem!\n",idade);
    }else if(idade >= 18 && idade < 60){
        printf("Pela sua idade de: %d, vc eh um adulto!\n",idade);
    }else if(idade >= 60 && idade < 110){
        printf("Pela sua idade de: %d, vc eh um idoso!\n",idade);
    }else if(idade >= 110){
        printf("Pela sua idade de: %d, pqp vc ja morreu, nn eh possivel!\n",idade);
    }else if(idade < 0){
        printf("Pela sua idade de: %d, pqp vc nem nasceu, nn eh possivel!\n",idade);
    }else{
        printf("digita um numero valido ae! seu maluco!\n");
    }
    return 0;
}