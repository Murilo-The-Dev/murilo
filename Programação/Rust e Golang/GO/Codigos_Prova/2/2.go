package main

import "fmt"

func main() {

	var idade float64

	fmt.Print("Digite sua idade:")
	fmt.Scanln(&idade)

	if (idade >= 18) {
		fmt.Println("Você é maior de idade")
	} else {
		fmt.Println("Você é menor de idade")
	}

}




