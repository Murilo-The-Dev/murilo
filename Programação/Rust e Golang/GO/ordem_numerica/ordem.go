package main

import (
    "bufio"
    "fmt"
    "os"
    "sort"
    "strconv"
    "strings"
)

func main() {

    fmt.Print("Digite os números separados por espaço: ")
    leitor := bufio.NewReader(os.Stdin)
    entrada, _ := leitor.ReadString('\n')
    
    partes := strings.Split(strings.TrimSpace(entrada), " ")
    
    var numeros []float64
    for _, p := range partes {
        num, err := strconv.ParseFloat(p, 64)
        if err != nil {
            fmt.Printf("Erro ao converter '%s' para número\n", p)
            os.Exit(1)
        }
        numeros = append(numeros, num)
    }
    
    sort.Float64s(numeros)
    
    fmt.Println("\nNúmeros ordenados em ordem crescente:")
    for _, num := range numeros {
        fmt.Printf("%.2f ", num)
    }
    fmt.Println()
}
