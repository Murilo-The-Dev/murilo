package main

import "fmt"

func main(){

const pi = 3.14
var raio float64

fmt.Print("Insira o Raio do Círculo:")
fmt.Scanln(&raio)

A := pi * (raio * raio)

fmt.Printf("Área do Círculo é de: %.2f",A)

}