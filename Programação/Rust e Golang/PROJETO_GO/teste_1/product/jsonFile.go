package product

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

func (product Product) SaveToJSON() error {

	fileName := strings.ReplaceAll(product.PName, " ", "_")
	fileName = strings.ToLower(fileName) + ".json"

	jsonData, err := json.MarshalIndent(product, "", "  ")
	if err != nil {
		return fmt.Errorf("erro ao converter produto para JSON: %v", err)
	}

	err = os.WriteFile(fileName, jsonData, 0644)
	if err != nil {
		return fmt.Errorf("erro ao salvar arquivo JSON: %v", err)
	}

	fmt.Printf("Produto salvo com sucesso no arquivo: %s\n", fileName)
	return nil
}