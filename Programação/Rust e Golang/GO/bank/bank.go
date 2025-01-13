package main

import "fmt"

func main() {
	var accountBalance float64 = 1000

	fmt.Println("Welcome to GoBank!")
	fmt.Println("What do you want to do?")
	fmt.Println("1. Check Balance")
	fmt.Println("2. Deposit Money")
	fmt.Println("3. Withdraw Money")
	fmt.Println("4. Exit App")

	var choice int
	fmt.Print("Select Your Choice: ")
	fmt.Scan(&choice)

	if choice == 1 {
		fmt.Println("Your Balance is: $", accountBalance)
	} else if choice == 2 {
		fmt.Print("Your Deposit is: ")
		var depositAmount float64
		fmt.Scan(&depositAmount)
		accountBalance += depositAmount
		fmt.Println("Balance Updated! New Amount: ", accountBalance)
	} else if choice == 3 {
		fmt.Print("Withdrawal Amount: ")
		var withdrawalAmount float64
		fmt.Scan(&withdrawalAmount)
		accountBalance -= withdrawalAmount
		fmt.Println("Balance Updated! New Amount: ", accountBalance)
	} else {
		fmt.Println("Goodbye!")
	}

}
