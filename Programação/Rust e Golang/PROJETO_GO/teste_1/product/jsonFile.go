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

func LoadFromJSON(fileName string) (*Product, error) {

	jsonData, err := os.ReadFile(fileName)
	if err != nil {
		return nil, fmt.Errorf("erro ao ler arquivo JSON: %v", err)
	}

	var product Product
	err = json.Unmarshal(jsonData, &product)
	if err != nil {
		return nil, fmt.Errorf("erro ao decodificar JSON: %v", err)
	}

	fmt.Printf("Produto carregado com sucesso do arquivo: %s\n", fileName)
	return &product, nil
}

func ListJSONFiles() ([]string, error) {
	files, err := os.ReadDir(".")
	if err != nil {
		return nil, fmt.Errorf("erro ao ler arquivos da pasta: %v", err)
	}

	var jsonFiles []string
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".json") {
			jsonFiles = append(jsonFiles, file.Name())
		}
	}

	return jsonFiles, nil
}