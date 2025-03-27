#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <windows.h>

int main(){
    int aleatorio;
    int moeda;
    double valor;
    double conversao;
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(hConsole, 1);
    srand(time(NULL));
    while(1){
        aleatorio = (rand() % 16 + 1);
        switch(aleatorio){
            case 1:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;
            
            case 2:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 3:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 4:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 5:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 6:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 7:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 8:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 9:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 10:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 11:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 12:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 13:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;
            
            case 14:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;

            case 15:
                SetConsoleTextAttribute(hConsole, aleatorio);
                printf("Numero eh: %d ", aleatorio);
                break;
        }
    }
    // printf("De um valor em reais\n");
    // scanf("%lf", &valor);

    // retorno:
    // printf("Selecione a moeda para converter:\n 1 = Dollar\n 2 = Euro\n 3 = Libra");
    // scanf("%d", &moeda);

    // switch(moeda){
    //     case 1:
    //         printf("Valor em Dollar: %2.lf\n", (valor / 5.74));
    //         break;
        
    //     case 2:
    //         printf("Valor em Euro: %2.lf\n", (valor / 6.16));
    //         break;

    //     case 3:
    //         printf("Valor em Libra: %2.lf\n", (valor / 7.53));
    //         break;
        
    //     default:
    //         printf("Moeda invalida\n");
    //         goto retorno;
    // }
}