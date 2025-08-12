#include <stdio.h>

int main() {
    int M [3][3];

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("Digite o elemento [%d][%d]: ", i, j);
            scanf("%d", &M[i][j]);
        }
    }
}