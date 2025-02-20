package main

import (
    "fmt"
    "log"
    "os"
    "exemple.com/teste_1/product"
)

const (
    productFile = "products.json"
)

func init() {
    log.SetPrefix("Inventory System: ")
}

func main() {
    printWelcome()
    
    if err := initializeSystem(); err != nil {
        log.Fatalf("Erro ao inicializar o sistema: %v", err)
    }

    StartGUI()
}

func printWelcome() {
    fmt.Println("Bem-vindo ao Sistema de Estoque!")
    fmt.Println("Desenvolvido por Murilo")
    fmt.Println("--------------------------------")
}

func initializeSystem() error {
    if _, err := os.Stat(productFile); os.IsNotExist(err) {
        fmt.Println("Arquivo products.json não encontrado. Criando um novo...")
        if err := product.SaveProductsToFile([]product.Product{}); err != nil {
            return fmt.Errorf("erro ao criar arquivo de produtos: %v", err)
        }
    }
    return nil
}