package main

import (
    "fmt"
    "math/rand"
    "time"
    "bufio"
    "os"
    "strings"
    "strconv"
)

func main() {
    rand.Seed(time.Now().UnixNano())
    
    numeroSecreto := rand.Intn(100) + 1
    maxTentativas := 10
    tentativasRestantes := maxTentativas
    scanner := bufio.NewScanner(os.Stdin)

    fmt.Println("Bem-vindo ao Jogo de Adivinhação!")
    fmt.Printf("Você tem %d tentativas para adivinhar um número entre 1 e 100.\n", maxTentativas)

    for tentativasRestantes > 0 {
        fmt.Printf("\nTentativas restantes: %d\n", tentativasRestantes)
        fmt.Print("Digite seu palpite: ")

        scanner.Scan()
        input := strings.TrimSpace(scanner.Text())

        palpite, err := strconv.Atoi(input)
        
        if err != nil {
            fmt.Println("Por favor, digite apenas números inteiros!")
            continue
        }
        
        if palpite < 1 || palpite > 100 {
            fmt.Println("Por favor, digite um número entre 1 e 100!")
            continue
        }

        tentativasRestantes--

        if palpite == numeroSecreto {
            fmt.Printf("\nParabéns! Você acertou! O número era %d!\n", numeroSecreto)
            fmt.Printf("Você acertou com %d tentativas restantes!\n", tentativasRestantes)
            return
        } else if palpite < numeroSecreto {
            fmt.Println("O número secreto é MAIOR que seu palpite!")
        } else {
            fmt.Println("O número secreto é MENOR que seu palpite!")
        }

        if tentativasRestantes == 0 {
            fmt.Printf("\nGame Over! O número secreto era %d!\n", numeroSecreto)
        }
    }
}
