package main

import "fmt"

func main() {

var revenue float64
var expenses float64
var tax float64

fmt.Println("Insira o valor das receitas totais: ")
fmt.Scan(&revenue)

fmt.Println("Insira o valor das despesas totais: ")
fmt.Scan(&expenses)

fmt.Println("Insira o valor de impostos: ")
fmt.Scan(&tax)

EBT := revenue - expenses
profit := EBT - tax

fmt.Println("Seu resultado bruto foi de: R$",EBT)
fmt.Println("Seu resultado liquido foi de: R$",profit)

}