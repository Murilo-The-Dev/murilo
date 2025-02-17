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

	for {
		fmt.Printf("\n\nEscolha uma opção:\n\n")
		fmt.Println("1. Novo produto")
		fmt.Println("2. Ler produto")
		fmt.Println("3. Sair")
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
			fmt.Println("Saindo...")
			return
		default:
			fmt.Println("Erro: Opção inválida. Escolha 1, 2 ou 3.")
		}
	}
}

func cadastrarProduto(reader *bufio.Reader) {
	fmt.Println("\nCadastro de Novo Produto")
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

func lerProduto(reader *bufio.Reader) {
	fmt.Println("\nLeitura de Produto")
	fmt.Println("------------------")

	jsonFiles, err := product.ListJSONFiles()
	if err != nil {
		fmt.Println("Erro ao listar arquivos JSON:", err)
		return
	}

	if len(jsonFiles) == 0 {
		fmt.Printf("\nNenhum produto salvo encontrado.")
		return
	}

	fmt.Println("Produtos salvos:")
	for i, file := range jsonFiles {
		fmt.Printf("%d. %s\n", i+1, file)
	}

	fmt.Print("Escolha o número do produto que deseja visualizar: ")
	choiceStr, _ := reader.ReadString('\n')
	choiceStr = strings.TrimSpace(choiceStr)
	choice, err := strconv.Atoi(choiceStr)
	if err != nil || choice < 1 || choice > len(jsonFiles) {
		fmt.Println("Erro: Escolha inválida.")
		return
	}

	fileName := jsonFiles[choice-1]
	product, err := product.LoadFromJSON(fileName)
	if err != nil {
		fmt.Println("Erro ao carregar produto:", err)
		return
	}

	product.Display()
}