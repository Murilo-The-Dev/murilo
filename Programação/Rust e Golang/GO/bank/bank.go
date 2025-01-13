package main

import "fmt"

func main() {
	var accountBalance float64

	fmt.Println("Welcome to GoBank!")

	for {

		fmt.Println("What do you want to do?")
		fmt.Println("1. Check Balance")
		fmt.Println("2. Deposit Money")
		fmt.Println("3. Withdraw Money")
		fmt.Println("4. Exit App")

		var choice int
		fmt.Print("Select Your Choice: ")
		fmt.Scan(&choice)

		switch choice {
		case 1 :
			fmt.Println("Your Balance is: $", accountBalance)
		case 2 :
			fmt.Print("Your Deposit is: ")
			var depositAmount float64
			fmt.Scan(&depositAmount)
			if depositAmount <= 0 {
				fmt.Println("Invalid Amount. Must be greater than 0.")
				continue
			}
			accountBalance += depositAmount
			fmt.Println("Balance Updated! New Amount: ", accountBalance)
		case 3 :
			fmt.Print("Withdrawal Amount: ")
			var withdrawalAmount float64
			fmt.Scan(&withdrawalAmount)
			if withdrawalAmount <= 0 {
				fmt.Println("Invalid Amount. Must be greater than 0.")
				continue
			}
			if withdrawalAmount > accountBalance {
				fmt.Println("Invalid Amount. You can't withdraw more than you have.")
				continue
			}
			accountBalance -= withdrawalAmount
			fmt.Println("Balance Updated! New Amount: ", accountBalance)
		case 4 :
			fmt.Println("Thanks for choosing our Bank! Goodbye!")
			return
		default :
			fmt.Println("Please put a valid number.")
			break
		}
	}
}
