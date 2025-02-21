// Package main é o ponto de entrada do sistema de estoque
package main

import (
    "fmt"
    "log"
    "os"
    "exemple.com/teste_1/product" // Importa o pacote personalizado de produtos
)

// Constante que define o nome do arquivo de persistência dos produtos
const (
    productFile = "products.json"
)

// init é chamada automaticamente antes da função main
// Configura o prefixo dos logs do sistema
func init() {
    log.SetPrefix("Inventory System: ")
}

// main é o ponto de entrada principal do programa
// Inicializa o sistema e inicia a interface gráfica
func main() {
    // Exibe mensagem de boas-vindas
    printWelcome()
    
    // Inicializa o sistema, verificando e criando arquivos necessários
    if err := initializeSystem(); err != nil {
        // Se houver erro na inicialização, registra o erro e encerra o programa
        log.Fatalf("Erro ao inicializar o sistema: %v", err)
    }

    // Inicia a interface gráfica do usuário
    StartGUI()
}

// printWelcome exibe a mensagem de boas-vindas do sistema
// Mostra informações sobre o sistema e seus desenvolvedores
func printWelcome() {
    fmt.Println("Bem-vindo ao Sistema de Estoque!")
    fmt.Println("Desenvolvido por Murilo")
    fmt.Println("--------------------------------")
}

// initializeSystem prepara o sistema para uso
// Verifica se o arquivo de produtos existe e o cria se necessário
// Returns:
//   - error: erro caso ocorra algum problema na inicialização
func initializeSystem() error {
    // Verifica se o arquivo de produtos existe
    if _, err := os.Stat(productFile); os.IsNotExist(err) {
        fmt.Println("Arquivo products.json não encontrado. Criando um novo...")
        // Se não existir, cria um novo arquivo com uma lista vazia de produtos
        if err := product.SaveProductsToFile([]product.Product{}); err != nil {
            return fmt.Errorf("erro ao criar arquivo de produtos: %v", err)
        }
    }
    return nil
}