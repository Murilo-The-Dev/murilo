package main

import "fmt"

func main() {

	userNames := make([]string, 2, 4)

	userNames[0] = "Osvaldo"
	userNames[1] = "Osvanildo"

	userNames = append(userNames, "Max")
	userNames = append(userNames, "Hortêncio")

	fmt.Println(userNames)

}