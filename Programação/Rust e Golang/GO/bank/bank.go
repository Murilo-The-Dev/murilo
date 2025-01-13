package main

import "fmt"

func main() {

	fmt.Println("Welcome to GoBank!")
	fmt.Println("What do you want to do?")
	fmt.Println("1. Check Balance")
	fmt.Println("2. Deposit Money")
	fmt.Println("3. Withdraw Money")
	fmt.Println("4. Exit App")

	var choice int
	fmt.Print("Your Choice:")
	fmt.Scan(&choice)

	fmt.Println("Your Choice:", choice)

}
