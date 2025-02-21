// Package product fornece funcionalidades para gerenciamento de produtos
package product

import (
    "errors"
    "fmt"
    "sort"
    "time"
)

// Product representa a estrutura de um produto no sistema
// Todos os campos são serializados em JSON com tags específicas
type Product struct {
    PName        string    `json:"pName"`        // Nome do produto
    PId          int       `json:"pId"`          // ID único do produto
    PQuantity    int       `json:"pQuantity"`    // Quantidade em estoque
    PPrice       float64   `json:"pPrice"`       // Preço unitário
    PCategory    string    `json:"pCategory"`    // Categoria do produto
    PDescription string    `json:"pDescription"` // Descrição detalhada
    CreatedAt    time.Time `json:"createdAt"`    // Data de criação
    UpdatedAt    time.Time `json:"updatedAt"`    // Data da última atualização
    PSupplier    string    `json:"pSupplier"`    // Fornecedor do produto
    PLocation    string    `json:"pLocation"`    // Localização no estoque
}

// ProductList é uma estrutura que encapsula um slice de produtos
// Utilizada principalmente para serialização JSON
type ProductList struct {
    Products []Product `json:"products"`
}

// DashboardStats representa estatísticas calculadas sobre os produtos
type DashboardStats struct {
    TotalProducts     int               // Número total de produtos
    TotalStockValue   float64          // Valor total do estoque
    MostExpensive     Product          // Produto mais caro
    LowestStock       Product          // Produto com menor estoque
    ProductsByCategory map[string]int   // Contagem de produtos por categoria
}

// CalculateDashboardStats calcula estatísticas gerais dos produtos
// Params:
//   - products: slice de produtos para análise
// Returns:
//   - DashboardStats: estrutura com as estatísticas calculadas
func CalculateDashboardStats(products []Product) DashboardStats {
    stats := DashboardStats{
        ProductsByCategory: make(map[string]int),
    }

    if len(products) == 0 {
        return stats
    }

    // Inicializa com o primeiro produto como referência
    stats.TotalProducts = len(products)
    stats.MostExpensive = products[0]
    stats.LowestStock = products[0]

    // Calcula as estatísticas iterando sobre os produtos
    for _, p := range products {
        stats.TotalStockValue += p.PPrice * float64(p.PQuantity)

        if p.PPrice > stats.MostExpensive.PPrice {
            stats.MostExpensive = p
        }
        if p.PQuantity < stats.LowestStock.PQuantity {
            stats.LowestStock = p
        }
        stats.ProductsByCategory[p.PCategory]++
    }

    return stats
}

// New cria uma nova instância de Product com validações
// Returns:
//   - *Product: ponteiro para o novo produto
//   - error: erro caso alguma validação falhe
func New(name string, id int, quantity int, price float64, category, description, supplier, location string) (*Product, error) {
    // Validações dos campos obrigatórios
    if name == "" {
        return nil, errors.New("nome do produto não pode ser vazio")
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

    // Cria e retorna novo produto com timestamps atuais
    return &Product{
        PName:        name,
        PId:          id,
        PQuantity:    quantity,
        PPrice:       price,
        PCategory:    category,
        PDescription: description,
        CreatedAt:    time.Now(),
        UpdatedAt:    time.Now(),
        PSupplier:    supplier,
        PLocation:    location,
    }, nil
}

// Display exibe as informações do produto formatadas
// Utiliza o fuso horário de São Paulo para as datas
func (product Product) Display() {
    loc, err := time.LoadLocation("America/Sao_Paulo")
    if err != nil {
        fmt.Println("Erro ao carregar o fuso horário:", err)
        return
    }
    
    // Formata as datas no padrão brasileiro
    createdAt := product.CreatedAt.In(loc).Format("02/01/2006 15:04:05")
    updatedAt := product.UpdatedAt.In(loc).Format("02/01/2006 15:04:05")
    
    // Exibe as informações formatadas
    fmt.Printf("\n\nSeu produto chamado %v tem as seguintes características:\n", product.PName)
    fmt.Printf("----------------------------------------\n")
    fmt.Printf("ID: %d\n", product.PId)
    fmt.Printf("Quantidade em estoque: %d\n", product.PQuantity)
    fmt.Printf("Preço: R$ %.2f\n", product.PPrice)
    fmt.Printf("Categoria: %s\n", product.PCategory)
    fmt.Printf("Descrição: %s\n", product.PDescription)
    fmt.Printf("Fornecedor: %s\n", product.PSupplier)
    fmt.Printf("Localização no estoque: %s\n", product.PLocation)
    fmt.Printf("Data de criação: %s\n", createdAt)
    fmt.Printf("Última atualização: %s\n", updatedAt)
    fmt.Printf("----------------------------------------\n\n")
}

// Funções de ordenação utilizando o pacote sort
// Cada função permite ordenação ascendente ou descendente

// SortProductsByName ordena produtos pelo nome
func SortProductsByName(products []Product, ascending bool) {
    if ascending {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PName < products[j].PName
        })
    } else {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PName > products[j].PName
        })
    }
}

// SortProductsByID ordena produtos pelo ID
func SortProductsByID(products []Product, ascending bool) {
    if ascending {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PId < products[j].PId
        })
    } else {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PId > products[j].PId
        })
    }
}

// SortProductsByPrice ordena produtos pelo preço
func SortProductsByPrice(products []Product, ascending bool) {
    if ascending {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PPrice < products[j].PPrice
        })
    } else {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PPrice > products[j].PPrice
        })
    }
}

// SortProductsByQuantity ordena produtos pela quantidade
func SortProductsByQuantity(products []Product, ascending bool) {
    if ascending {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PQuantity < products[j].PQuantity
        })
    } else {
        sort.Slice(products, func(i, j int) bool {
            return products[i].PQuantity > products[j].PQuantity
        })
    }
}

// SortProductsByCreationDate ordena produtos pela data de criação
func SortProductsByCreationDate(products []Product, ascending bool) {
    if ascending {
        sort.Slice(products, func(i, j int) bool {
            return products[i].CreatedAt.Before(products[j].CreatedAt)
        })
    } else {
        sort.Slice(products, func(i, j int) bool {
            return products[i].CreatedAt.After(products[j].CreatedAt)
        })
    }
}