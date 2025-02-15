package product

import (
	"errors"
	"time"
	"fmt"
)

type Product struct {
	pName        string
	pId          int
	pQuantity    int
	pPrice       float64
	pCategory    string
	pDescription string
	createdAt    time.Time
	pSupplier    string
	pLocation    string
}

func New(name string, id int, quantity int, price float64, category, description, supplier, location string) (*Product, error) {
	if name == "" {
		return nil, errors.New("nome do produto não pode ser nulo")
	}
	if id <= 0 {
		return nil, errors.New("ID do produto deve ser maior que zero")
	}
	if quantity < 0 {
		return nil, errors.New("quantidade não pode ser negativa")
	}
	if price < 0 {
		return nil, errors.New("preço não pode ser negativo")
	}
	if category == "" {
		return nil, errors.New("categoria não pode ser vazia")
	}

	return &Product{
		pName:        name,
		pId:          id,
		pQuantity:    quantity,
		pPrice:       price,
		pCategory:    category,
		pDescription: description,
		createdAt:    time.Now(), 
		pSupplier:    supplier,
		pLocation:    location,
	}, nil
}

func (product Product) Display() {
    loc, err := time.LoadLocation("America/Sao_Paulo")
    if err != nil {
        fmt.Println("Erro ao carregar o fuso horário:", err)
        return
    }

    localTime := product.createdAt.In(loc)

    fmt.Printf("Seu produto chamado %v tem as seguintes características:\n", product.pName)
    fmt.Printf("----------------------------------------")
    fmt.Printf("ID: %d\n", product.pId)
    fmt.Printf("Quantidade em estoque: %d\n", product.pQuantity)
    fmt.Printf("Preço: R$ %.2f\n", product.pPrice)
    fmt.Printf("Categoria: %s\n", product.pCategory)
    fmt.Printf("Descrição: %s\n", product.pDescription)
    fmt.Printf("Fornecedor: %s\n", product.pSupplier)
    fmt.Printf("Localização no estoque: %s\n", product.pLocation)
    fmt.Printf("Data de criação: %s\n", localTime.Format("02/01/2006 15:04:05")) 
    fmt.Printf("----------------------------------------\n\n")
}