package main

import "fmt"

type floatMap map[string]float64

func (m floatMap) output() {
	fmt.Println(m)
}

func main() {

	userNames := make([]string, 2, 4)

	userNames[0] = "Osvaldo"
	userNames[1] = "Osvanildo"

	userNames = append(userNames, "Max")
	userNames = append(userNames, "Hortêncio")

	fmt.Println(userNames)

	courseRatings := make(floatMap, 3)

	courseRatings["Go"] = 4.7
	courseRatings["React"] = 3.3
	courseRatings["NodeJs"] = 4.1

	courseRatings.output()

	for index, value := range userNames {
		fmt.Println("index: ",index)
		fmt.Println("value: ",value)
	}

	for key, value := range courseRatings {
		fmt.Println("index: ",key)
		fmt.Println("value: ",value)
	}
}