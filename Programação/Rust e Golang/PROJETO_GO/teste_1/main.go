package main

import (
	"bufio"
	"exemple.com/teste_1/product"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Println("Cadastro de Novo Produto")
	fmt.Println("------------------------")

	fmt.Print("Nome do produto: ")
	name, _ := reader.ReadString('\n')
	name = strings.TrimSpace(name)

	fmt.Print("ID do produto: ")
	idStr, _ := reader.ReadString('\n')
	idStr = strings.TrimSpace(idStr)
	id, err := strconv.Atoi(idStr)
	if err != nil {
		fmt.Println("Erro: ID deve ser um número inteiro.")
		return
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

	product, err := product.New(name, id, quantity, price, category, description, supplier, location)
	if err != nil {
		fmt.Println("Erro ao criar produto:", err)
		return
	}

	product.Display()

	err = product.SaveToJSON()
	if err != nil {
		fmt.Println("Erro ao salvar produto:", err)
		return
	}

	fmt.Printf("\nProduto cadastrado e salvo com sucesso!\n")
}
	

