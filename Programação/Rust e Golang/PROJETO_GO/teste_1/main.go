package main

import (
    "bufio"
    "exemple.com/teste_1/product"
    "fmt"
    "os"
    "strconv"
    "strings"
	"time"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    for {
        fmt.Println("Escolha uma opção:")
        fmt.Println("1. Novo produto")
        fmt.Println("2. Ler produto")
        fmt.Println("3. Editar produto")
        fmt.Println("4. Excluir produto")
        fmt.Println("5. Sair")
        fmt.Print("Opção: ")
        optionStr, _ := reader.ReadString('\n')
        optionStr = strings.TrimSpace(optionStr)
        option, err := strconv.Atoi(optionStr)
        if err != nil {
            fmt.Println("Erro: Opção inválida. Digite um número.")
            continue
        }
        switch option {
        case 1:
            cadastrarProduto(reader)
        case 2:
            lerProduto(reader)
        case 3:
            editarProduto(reader)
        case 4:
            excluirProduto(reader)
        case 5:
            fmt.Println("Saindo...")
            return
        default:
            fmt.Println("Erro: Opção inválida. Escolha 1, 2, 3, 4 ou 5.")
        }
    }
}

func cadastrarProduto(reader *bufio.Reader) {
    fmt.Println("\nCadastro de Novo Produto")
    fmt.Println("------------------------")

    fmt.Print("Nome do produto: ")
    name, _ := reader.ReadString('\n')
    name = strings.TrimSpace(name)

    var id int
    for {
        fmt.Print("ID do produto: ")
        idStr, _ := reader.ReadString('\n')
        idStr = strings.TrimSpace(idStr)
        var err error
        id, err = strconv.Atoi(idStr)
        if err != nil {
            fmt.Println("Erro: ID deve ser um número inteiro.")
            continue
        }

        products, err := product.LoadProductsFromFile()
        if err != nil {
            fmt.Println("Erro ao carregar produtos:", err)
            return
        }

        if product.IDExists(id, products) {
            fmt.Println("Erro: ID já está em uso. Por favor, escolha outro ID.")
            continue
        }
        break
    }

    fmt.Print("Quantidade em estoque: ")
    quantityStr, _ := reader.ReadString('\n')
    quantityStr = strings.TrimSpace(quantityStr)
    quantity, err := strconv.Atoi(quantityStr)
    if err != nil {
        fmt.Println("Erro: Quantidade deve ser um número inteiro.")
        return
    }

    fmt.Print("Preço do produto: ")
    priceStr, _ := reader.ReadString('\n')
    priceStr = strings.TrimSpace(priceStr)
    priceStr = strings.Replace(priceStr, ",", ".", -1)
    price, err := strconv.ParseFloat(priceStr, 64)
    if err != nil {
        fmt.Println("Erro: Preço deve ser um número válido.")
        return
    }

    fmt.Print("Categoria do produto: ")
    category, _ := reader.ReadString('\n')
    category = strings.TrimSpace(category)

    fmt.Print("Descrição do produto: ")
    description, _ := reader.ReadString('\n')
    description = strings.TrimSpace(description)

    fmt.Print("Fornecedor do produto: ")
    supplier, _ := reader.ReadString('\n')
    supplier = strings.TrimSpace(supplier)

    fmt.Print("Localização do produto no estoque: ")
    location, _ := reader.ReadString('\n')
    location = strings.TrimSpace(location)

    newProduct, err := product.New(name, id, quantity, price, category, description, supplier, location)
    if err != nil {
        fmt.Println("Erro ao criar produto:", err)
        return
    }

    err = newProduct.AddProduct()
    if err != nil {
        fmt.Println("Erro ao salvar produto:", err)
        return
    }
    fmt.Printf("\nProduto cadastrado e salvo com sucesso!\n")
}

func lerProduto(reader *bufio.Reader) {
    products, err := product.LoadProductsFromFile()
    if err != nil {
        fmt.Println("Erro ao carregar produtos:", err)
        return
    }
    if len(products) == 0 {
        fmt.Println("Nenhum produto salvo encontrado.")
        return
    }
    fmt.Println("\nProdutos salvos:")
    for i, p := range products {
        fmt.Printf("%d. %s (ID: %d)\n", i+1, p.PName, p.PId)
    }
    fmt.Print("Escolha o número do produto que deseja visualizar: ")
    choiceStr, _ := reader.ReadString('\n')
    choiceStr = strings.TrimSpace(choiceStr)
    choice, err := strconv.Atoi(choiceStr)
    if err != nil || choice < 1 || choice > len(products) {
        fmt.Println("Erro: Escolha inválida.")
        return
    }
    productToView := products[choice-1]
    productToView.Display()
}

func editarProduto(reader *bufio.Reader) {
    products, err := product.LoadProductsFromFile()
    if err != nil {
        fmt.Println("Erro ao carregar produtos:", err)
        return
    }
    if len(products) == 0 {
        fmt.Println("Nenhum produto salvo encontrado.")
        return
    }
    fmt.Println("\nProdutos salvos:")
    for i, p := range products {
        fmt.Printf("%d. %s (ID: %d)\n", i+1, p.PName, p.PId)
    }
    fmt.Print("Escolha o número do produto que deseja editar: ")
    choiceStr, _ := reader.ReadString('\n')
    choiceStr = strings.TrimSpace(choiceStr)
    choice, err := strconv.Atoi(choiceStr)
    if err != nil || choice < 1 || choice > len(products) {
        fmt.Println("Erro: Escolha inválida.")
        return
    }

    index := choice - 1
    productToEdit := products[index]

    fmt.Println("\nDigite os novos dados do produto (deixe em branco para manter o valor atual):")

    fmt.Printf("Nome do produto [%s]: ", productToEdit.PName)
    name, _ := reader.ReadString('\n')
    name = strings.TrimSpace(name)
    if name != "" {
        productToEdit.PName = name
    }

    fmt.Printf("ID do produto [%d]: ", productToEdit.PId)
    idStr, _ := reader.ReadString('\n')
    idStr = strings.TrimSpace(idStr)
    if idStr != "" {
        newID, err := strconv.Atoi(idStr)
        if err != nil {
            fmt.Println("Erro: ID deve ser um número inteiro.")
            return
        }

        if newID != productToEdit.PId && product.IDExists(newID, products) {
            fmt.Println("Erro: ID já está em uso. Por favor, escolha outro ID.")
            return
        }
        productToEdit.PId = newID
    }

    fmt.Printf("Quantidade em estoque [%d]: ", productToEdit.PQuantity)
    quantityStr, _ := reader.ReadString('\n')
    quantityStr = strings.TrimSpace(quantityStr)
    if quantityStr != "" {
        quantity, err := strconv.Atoi(quantityStr)
        if err != nil {
            fmt.Println("Erro: Quantidade deve ser um número inteiro.")
            return
        }
        productToEdit.PQuantity = quantity
    }

    fmt.Printf("Preço do produto [%.2f]: ", productToEdit.PPrice)
    priceStr, _ := reader.ReadString('\n')
    priceStr = strings.TrimSpace(priceStr)
    if priceStr != "" {
        priceStr = strings.Replace(priceStr, ",", ".", -1)
        price, err := strconv.ParseFloat(priceStr, 64)
        if err != nil {
            fmt.Println("Erro: Preço deve ser um número válido.")
            return
        }
        productToEdit.PPrice = price
    }

    fmt.Printf("Categoria do produto [%s]: ", productToEdit.PCategory)
    category, _ := reader.ReadString('\n')
    category = strings.TrimSpace(category)
    if category != "" {
        productToEdit.PCategory = category
    }

    fmt.Printf("Descrição do produto [%s]: ", productToEdit.PDescription)
    description, _ := reader.ReadString('\n')
    description = strings.TrimSpace(description)
    if description != "" {
        productToEdit.PDescription = description
    }

    fmt.Printf("Fornecedor do produto [%s]: ", productToEdit.PSupplier)
    supplier, _ := reader.ReadString('\n')
    supplier = strings.TrimSpace(supplier)
    if supplier != "" {
        productToEdit.PSupplier = supplier
    }

    fmt.Printf("Localização do produto no estoque [%s]: ", productToEdit.PLocation)
    location, _ := reader.ReadString('\n')
    location = strings.TrimSpace(location)
    if location != "" {
        productToEdit.PLocation = location
    }

    productToEdit.UpdatedAt = time.Now()

    updatedProducts, err := productToEdit.EditProduct(index, products)
    if err != nil {
        fmt.Println("Erro ao editar produto:", err)
        return
    }
    err = product.SaveProductsToFile(updatedProducts)
    if err != nil {
        fmt.Println("Erro ao salvar produtos:", err)
        return
    }
    fmt.Println("\nProduto editado com sucesso!")
}

func excluirProduto(reader *bufio.Reader) {
    products, err := product.LoadProductsFromFile()
    if err != nil {
        fmt.Println("Erro ao carregar produtos:", err)
        return
    }
    if len(products) == 0 {
        fmt.Println("Nenhum produto salvo encontrado.")
        return
    }
    fmt.Println("\nProdutos salvos:")
    for i, p := range products {
        fmt.Printf("%d. %s (ID: %d)\n", i+1, p.PName, p.PId)
    }
    fmt.Print("Escolha o número do produto que deseja excluir: ")
    choiceStr, _ := reader.ReadString('\n')
    choiceStr = strings.TrimSpace(choiceStr)
    choice, err := strconv.Atoi(choiceStr)
    if err != nil || choice < 1 || choice > len(products) {
        fmt.Println("Erro: Escolha inválida.")
        return
    }
    productToDelete := products[choice-1]
    err = product.DeleteProduct(productToDelete.PId)
    if err != nil {
        fmt.Println("Erro ao excluir produto:", err)
        return
    }
    fmt.Println("\nProduto excluído com sucesso!")
}