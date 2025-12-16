package main

import (
    "fmt"
)

func main() {
    var num1, num2, total float64

	fmt.Print("Insira o Primeiro Número: ")
	fmt.Scanln(&num1)

	fmt.Print("Insira o Segundo Número: ")
	fmt.Scanln(&num2)

    total = num1

    for num1 != num2 && num1 < num2 {
        num1++
        fmt.Println(num1)
        total += num1
    }

    fmt.Println("Total:",total)
}