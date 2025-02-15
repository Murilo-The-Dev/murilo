package product

import (
	"errors"
	"time"
	"fmt"
)

type Product struct {
	PName        string    `json:"pName"`
	PId          int       `json:"pId"`
	PQuantity    int       `json:"pQuantity"`
	PPrice       float64   `json:"pPrice"`
	PCategory    string    `json:"pCategory"`
	PDescription string    `json:"pDescription"`
	CreatedAt    time.Time `json:"createdAt"`
	PSupplier    string    `json:"pSupplier"`
	PLocation    string    `json:"pLocation"`
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
		PName:        name,
		PId:          id,
		PQuantity:    quantity,
		PPrice:       price,
		PCategory:    category,
		PDescription: description,
		CreatedAt:    time.Now(), 
		PSupplier:    supplier,
		PLocation:    location,
	}, nil
}

func (product Product) Display() {
    loc, err := time.LoadLocation("America/Sao_Paulo")
    if err != nil {
        fmt.Println("Erro ao carregar o fuso horário:", err)
        return
    }

    localTime := product.CreatedAt.In(loc)

    fmt.Printf("\n\nSeu produto chamado %v tem as seguintes características:\n", product.PName)
    fmt.Printf("----------------------------------------\n")
    fmt.Printf("ID: %d\n", product.PId)
    fmt.Printf("Quantidade em estoque: %d\n", product.PQuantity)
    fmt.Printf("Preço: R$ %.2f\n", product.PPrice)
    fmt.Printf("Categoria: %s\n", product.PCategory)
    fmt.Printf("Descrição: %s\n", product.PDescription)
    fmt.Printf("Fornecedor: %s\n", product.PSupplier)
    fmt.Printf("Localização no estoque: %s\n", product.PLocation)
    fmt.Printf("Data de criação: %s\n", localTime.Format("02/01/2006 15:04:05")) 
    fmt.Printf("----------------------------------------\n\n")
}