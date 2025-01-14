package main

import (
    "fmt"
    "os"
    "strconv"
)

const accountBalanceFile = "balance.txt"

func getBalanceToFile() (float64, error) {
    data, err := os.ReadFile(accountBalanceFile)
    if err != nil {
        return 0, fmt.Errorf("failed to read balance file: %w", err)
    }

    balanceText := string(data)
    balance, err := strconv.ParseFloat(balanceText, 64)
    if err != nil {
        return 0, fmt.Errorf("failed to parse stored balance value: %w", err)
    }

    return balance, nil
}

func writeBalanceToFile(balance float64) error {
    balanceText := fmt.Sprint(balance)
    err := os.WriteFile(accountBalanceFile, []byte(balanceText), 0644)
    if err != nil {
        return fmt.Errorf("failed to write balance: %w", err)
    }
    return nil
}

func main() {
    accountBalance, err := getBalanceToFile()
    if err != nil {
        fmt.Println("ERROR:", err)
        fmt.Println("Starting with zero balance")
        accountBalance = 0
    }

    fmt.Println("Welcome to GoBank!")

    for {
        fmt.Println("\nWhat do you want to do?")
        fmt.Println("1. Check Balance")
        fmt.Println("2. Deposit Money")
        fmt.Println("3. Withdraw Money")
        fmt.Println("4. Exit App")

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
            if err := writeBalanceToFile(accountBalance); err != nil {
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
            if err := writeBalanceToFile(accountBalance); err != nil {
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
