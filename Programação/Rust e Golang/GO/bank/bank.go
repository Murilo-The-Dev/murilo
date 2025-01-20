package main

import (
	"exemple.com/bank/fileops"
	"fmt"
)

const accountBalanceFile = "balance.txt"

func main() {
	accountBalance, err := fileops.GetFloatFromFile(accountBalanceFile)
	if err != nil {
		fmt.Println("ERROR:", err)
		fmt.Println("Starting with zero balance")
		accountBalance = 0
	}

	fmt.Println("Welcome to GoBank!")

	for {

		presentOptions()

		var choice int
		fmt.Print("Select Your Choice: ")
		if _, err := fmt.Scan(&choice); err != nil {
			fmt.Println("Invalid input. Please try again.")
			continue
		}

		switch choice {
		case 1:
			fmt.Printf("Your Balance is: $%.2f\n", accountBalance)
		case 2:
			fmt.Print("Your Deposit is: $")
			var depositAmount float64
			if _, err := fmt.Scan(&depositAmount); err != nil {
				fmt.Println("Invalid input. Please try again.")
				continue
			}
			if depositAmount <= 0 {
				fmt.Println("Invalid Amount. Must be greater than 0.")
				continue
			}
			accountBalance += depositAmount
			if err := fileops.WriteFloatToFile(accountBalance, accountBalanceFile); err != nil {
				fmt.Println("Error saving balance:", err)
				continue
			}
			fmt.Printf("Balance Updated! New Amount: $%.2f\n", accountBalance)
		case 3:
			fmt.Print("Withdrawal Amount: $")
			var withdrawalAmount float64
			if _, err := fmt.Scan(&withdrawalAmount); err != nil {
				fmt.Println("Invalid input. Please try again.")
				continue
			}
			if withdrawalAmount <= 0 {
				fmt.Println("Invalid Amount. Must be greater than 0.")
				continue
			}
			if withdrawalAmount > accountBalance {
				fmt.Println("Invalid Amount. You can't withdraw more than you have.")
				continue
			}
			accountBalance -= withdrawalAmount
			if err := fileops.WriteFloatToFile(accountBalance, accountBalanceFile); err != nil {
				fmt.Println("Error saving balance:", err)
				continue
			}
			fmt.Printf("Balance Updated! New Amount: $%.2f\n", accountBalance)
		case 4:
			fmt.Println("Thanks for choosing our Bank! Goodbye!")
			return
		default:
			fmt.Println("Please enter a valid number (1-4).")
		}
	}
}
