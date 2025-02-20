package product

import (
    "encoding/json"
    "fmt"
    "os"
	"time"
)

const fileName = "products.json" 

func SaveProductsToFile(products []Product) error {
    productList := ProductList{Products: products}
    jsonData, err := json.MarshalIndent(productList, "", "  ")
    if err != nil {
        return fmt.Errorf("erro ao converter lista de produtos para JSON: %v", err)
    }
    err = os.WriteFile(fileName, jsonData, 0644)
    if err != nil {
        return fmt.Errorf("erro ao salvar arquivo JSON: %v", err)
    }
    fmt.Printf("Lista de produtos salva com sucesso no arquivo: %s\n", fileName)
    return nil
}

func LoadProductsFromFile() ([]Product, error) {
    jsonData, err := os.ReadFile(fileName)
    if err != nil {
        if os.IsNotExist(err) {
            return []Product{}, nil
        }
        return nil, fmt.Errorf("erro ao ler arquivo JSON: %v", err)
    }
    var productList ProductList
    err = json.Unmarshal(jsonData, &productList)
    if err != nil {
        return nil, fmt.Errorf("erro ao decodificar JSON: %v", err)
    }
    return productList.Products, nil
}

func IDExists(id int, products []Product) bool {
    for _, product := range products {
        if product.PId == id {
            return true
        }
    }
    return false
}

func (p *Product) AddProduct() error {
    products, err := LoadProductsFromFile()
    if err != nil {
        return err
    }
    if IDExists(p.PId, products) {
        return fmt.Errorf("erro: ID %d já está em uso", p.PId)
    }
    products = append(products, *p)
    return SaveProductsToFile(products)
}


func (p *Product) EditProduct(index int, products []Product) ([]Product, error) {

    p.UpdatedAt = time.Now()

    products[index] = *p
    return products, nil
}

func DeleteProduct(id int) error {
    products, err := LoadProductsFromFile()
    if err != nil {
        return err
    }
    for i, product := range products {
        if product.PId == id {
            products = append(products[:i], products[i+1:]...)
            return SaveProductsToFile(products)
        }
    }
    return fmt.Errorf("erro: produto com ID %d não encontrado", id)
}