package main

import (
	"fmt"
	"math"
)

func main() {
	var inflationRate float64
	var investmentAmount float64
	var expectedReturnRate float64
	var years float64

	fmt.Println("Calculadora de Investimentos:")
	fmt.Print("Coloque o valor do investimento inicial: R$ ")
	fmt.Scan(&investmentAmount)

	fmt.Print("Coloque a porcentagem de retorno esperado: ")
	fmt.Scan(&expectedReturnRate)

	fmt.Print("Coloque a porcentagem de inflação ao ano: ")
	fmt.Scan(&inflationRate)

	fmt.Print("Coloque a quantidade de anos do investimento: ")
	fmt.Scan(&years)

	futureValue := investmentAmount * math.Pow(1+expectedReturnRate/100, years)
	futureRealValue := futureValue / math.Pow(1+inflationRate/100, years)

	fmt.Println("Valor Esperado Total: R$ ", futureValue)
	fmt.Println("Valor Recebido Real: R$ ", futureRealValue)
}
