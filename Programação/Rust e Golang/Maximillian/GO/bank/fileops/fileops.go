package fileops

import (
    "fmt"
    "os"
    "strconv"
)

func GetFloatFromFile(fileName string) (float64, error) {
    data, err := os.ReadFile(fileName)
    if err != nil {
        return 0, fmt.Errorf("failed to find file: %w", err)
    }

    valueText := string(data)
    value, err := strconv.ParseFloat(valueText, 64)

    if err != nil {
        return 0, fmt.Errorf("failed to parse stored value: %w", err)
    }

    return value, nil
}

func WriteFloatToFile(value float64 , fileName string) error {
    valueText := fmt.Sprint(value)
    err := os.WriteFile(fileName, []byte(valueText), 0644)

    if err != nil {
        return fmt.Errorf("failed to write balance: %w", err)
    }
    return nil
}