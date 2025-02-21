// Package product fornece funcionalidades para gerenciamento de produtos,
// incluindo operações de persistência em arquivo JSON e manipulação de dados
package product

import (
	"encoding/json"
	"fmt"
	"os"
	"time"
)

// fileName define o nome do arquivo JSON onde os produtos serão armazenados
const fileName = "products.json"

// SaveProductsToFile salva uma lista de produtos em um arquivo JSON
// Params:
//   - products: slice de produtos a serem salvos
// Returns:
//   - error: erro em caso de falha na operação
func SaveProductsToFile(products []Product) error {
	// Cria uma estrutura ProductList para encapsular o slice de produtos
	productList := ProductList{Products: products}

	// Converte a lista de produtos para formato JSON com indentação
	jsonData, err := json.MarshalIndent(productList, "", "  ")
	if err != nil {
		return fmt.Errorf("erro ao converter lista de produtos para JSON: %v", err)
	}

	// Salva os dados JSON no arquivo com permissões 0644 (leitura/escrita para owner, leitura para outros)
	err = os.WriteFile(fileName, jsonData, 0644)
	if err != nil {
		return fmt.Errorf("erro ao salvar arquivo JSON: %v", err)
	}

	fmt.Printf("Lista de produtos salva com sucesso no arquivo: %s\n", fileName)
	return nil
}

// LoadProductsFromFile carrega a lista de produtos do arquivo JSON
// Returns:
//   - []Product: slice contendo os produtos carregados
//   - error: erro em caso de falha na operação
func LoadProductsFromFile() ([]Product, error) {
	// Lê o conteúdo do arquivo JSON
	jsonData, err := os.ReadFile(fileName)
	if err != nil {
		// Se o arquivo não existe, retorna um slice vazio sem erro
		if os.IsNotExist(err) {
			return []Product{}, nil
		}
		return nil, fmt.Errorf("erro ao ler arquivo JSON: %v", err)
	}

	// Decodifica o JSON para a estrutura ProductList
	var productList ProductList
	err = json.Unmarshal(jsonData, &productList)
	if err != nil {
		return nil, fmt.Errorf("erro ao decodificar JSON: %v", err)
	}

	return productList.Products, nil
}

// IDExists verifica se um ID de produto já existe na lista
// Params:
//   - id: ID do produto a ser verificado
//   - products: slice de produtos onde será feita a busca
// Returns:
//   - bool: true se o ID já existe, false caso contrário
func IDExists(id int, products []Product) bool {
	for _, product := range products {
		if product.PId == id {
			return true
		}
	}
	return false
}

// AddProduct adiciona um novo produto à lista
// É um método do tipo Product que adiciona a própria instância à lista
// Returns:
//   - error: erro em caso de falha na operação ou ID duplicado
func (p *Product) AddProduct() error {
	// Carrega produtos existentes
	products, err := LoadProductsFromFile()
	if err != nil {
		return err
	}

	// Verifica se o ID já existe
	if IDExists(p.PId, products) {
		return fmt.Errorf("erro: ID %d já está em uso", p.PId)
	}

	// Adiciona o novo produto e salva no arquivo
	products = append(products, *p)
	return SaveProductsToFile(products)
}

// EditProduct atualiza um produto existente na lista
// Params:
//   - index: índice do produto a ser editado no slice
//   - products: slice de produtos
// Returns:
//   - []Product: slice atualizado de produtos
//   - error: erro em caso de falha na operação
func (p *Product) EditProduct(index int, products []Product) ([]Product, error) {
	// Atualiza o timestamp de modificação
	p.UpdatedAt = time.Now()

	// Substitui o produto no índice especificado
	products[index] = *p
	return products, nil
}

// DeleteProduct remove um produto da lista pelo ID
// Params:
//   - id: ID do produto a ser removido
// Returns:
//   - error: erro em caso de falha na operação ou produto não encontrado
func DeleteProduct(id int) error {
	// Carrega a lista atual de produtos
	products, err := LoadProductsFromFile()
	if err != nil {
		return err
	}

	// Procura o produto pelo ID e o remove
	for i, product := range products {
		if product.PId == id {
			// Remove o produto usando slice operations
			products = append(products[:i], products[i+1:]...)
			return SaveProductsToFile(products)
		}
	}

	return fmt.Errorf("erro: produto com ID %d não encontrado", id)
}
