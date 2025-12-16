package main

import (
	"fmt"
)

func main() {
	var nome string
	var nota float64

	// Solicita o nome do aluno
	fmt.Print("Digite o nome do aluno: ")
	fmt.Scanln(&nome)

	// Solicita a nota do aluno
	fmt.Print("Digite a nota do aluno: ")
	fmt.Scanln(&nota)

	// Determina o status com base na nota
	var status string
	switch {
	case nota <= 4:
		status = "Refazer a Prova"
	case nota > 4 && nota <= 6:
		status = "Aprovado"
	case nota > 6 && nota <= 8:
		status = "Aprovado, parabens"
	case nota > 8:
		status = "Parabens, excelente"
	default:
		status = "Nota inválida"
	}

	// Exibe o resultado
	fmt.Printf("%s. STATUS: %s\n", nome, status)
}
