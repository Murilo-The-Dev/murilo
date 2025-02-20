package main

import (
	"fmt"
	"net/url"
	"strconv"
	"strings"
	"time"

	"exemple.com/teste_1/product"
	"fyne.io/fyne/v2/canvas"
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/dialog"
	"fyne.io/fyne/v2/theme"
	"fyne.io/fyne/v2/widget"
)

const (
	windowWidth  = 800
	windowHeight = 600
)

func parsePrice(value string) (float64, error) {
	value = strings.Replace(value, ",", ".", -1)

	price, err := strconv.ParseFloat(value, 64)
	if err != nil {
		return 0, fmt.Errorf("preço deve ser um número válido (use '.' ou ',' como separador decimal)")
	}
	return price, nil
}

func formatProductList(products []product.Product) string {
	var list string
	for _, p := range products {
		loc, err := time.LoadLocation("America/Sao_Paulo")
		if err != nil {
			return fmt.Sprintf("Erro ao carregar o fuso horário: %v", err)
		}
		createdAt := p.CreatedAt.In(loc).Format("02/01/2006 15:04:05")
		updatedAt := p.UpdatedAt.In(loc).Format("02/01/2006 15:04:05")

		list += fmt.Sprintf(
			"ID: %d\n"+
				"Nome: %s\n"+
				"Quantidade: %d\n"+
				"Preço: R$ %.2f\n"+
				"Categoria: %s\n"+
				"Descrição: %s\n"+
				"Fornecedor: %s\n"+
				"Localização: %s\n"+
				"Data de Criação: %s\n"+
				"Última Atualização: %s\n"+
				"----------------------------------------\n",
			p.PId, p.PName, p.PQuantity, p.PPrice, p.PCategory, p.PDescription,
			p.PSupplier, p.PLocation, createdAt, updatedAt,
		)
	}
	return list
}

func StartGUI() {
	myApp := app.New()
	myWindow := myApp.NewWindow("Controle de Estoque")
	myWindow.Resize(fyne.NewSize(windowWidth, windowHeight))

	var createHomeScreen func() fyne.CanvasObject
	var createAddProductScreen func() fyne.CanvasObject
	var createViewProductsScreen func() fyne.CanvasObject
	var createEditProductScreen func() fyne.CanvasObject
	var createDeleteProductScreen func() fyne.CanvasObject
	var createDashboardScreen func() fyne.CanvasObject

	updateProductList := func() []product.Product {
		products, err := product.LoadProductsFromFile()
		if err != nil {
			dialog.ShowError(fmt.Errorf("erro ao carregar produtos: %v", err), myWindow)
			return nil
		}
		return products
	}

	createSignature := func() *widget.Hyperlink {
		signature := widget.NewHyperlink("By Murilo", &url.URL{
			Scheme: "https",
			Host:   "github.com",
			Path:   "/MatuzalemOLD/murilo",
		})
		signature.Alignment = fyne.TextAlignCenter
		return signature
	}

	createAddProductScreen = func() fyne.CanvasObject {
		nameEntry := widget.NewEntry()
		idEntry := widget.NewEntry()
		quantityEntry := widget.NewEntry()
		priceEntry := widget.NewEntry()
		categoryEntry := widget.NewEntry()
		descriptionEntry := widget.NewEntry()
		supplierEntry := widget.NewEntry()
		locationEntry := widget.NewEntry()

		validateAndCreateProduct := func() error {
			id, err := strconv.Atoi(idEntry.Text)
			if err != nil {
				return fmt.Errorf("id deve ser um número inteiro")
			}

			quantity, err := strconv.Atoi(quantityEntry.Text)
			if err != nil {
				return fmt.Errorf("quantidade deve ser um número inteiro")
			}

			price, err := parsePrice(priceEntry.Text)
			if err != nil {
				return err
			}

			products := updateProductList()
			if product.IDExists(id, products) {
				return fmt.Errorf("id já está em uso. por favor, escolha outro id")
			}

			newProduct, err := product.New(
				nameEntry.Text,
				id,
				quantity,
				price,
				categoryEntry.Text,
				descriptionEntry.Text,
				supplierEntry.Text,
				locationEntry.Text,
			)
			if err != nil {
				return fmt.Errorf("erro ao criar produto: %v", err)
			}

			return newProduct.AddProduct()
		}

		addButton := widget.NewButton("Adicionar Produto", func() {
			if err := validateAndCreateProduct(); err != nil {
				dialog.ShowError(err, myWindow)
				return
			}
			dialog.ShowInformation("Sucesso", "Produto adicionado com sucesso!", myWindow)
			myWindow.SetContent(createHomeScreen())
		})

		backButton := widget.NewButton("Voltar", func() {
			myWindow.SetContent(createHomeScreen())
		})

		return container.NewVBox(
			widget.NewLabel("Novo Produto"),
			widget.NewLabel("Nome:"), nameEntry,
			widget.NewLabel("ID:"), idEntry,
			widget.NewLabel("Quantidade:"), quantityEntry,
			widget.NewLabel("Preço:"), priceEntry,
			widget.NewLabel("Categoria:"), categoryEntry,
			widget.NewLabel("Descrição:"), descriptionEntry,
			widget.NewLabel("Fornecedor:"), supplierEntry,
			widget.NewLabel("Localização:"), locationEntry,
			addButton,
			backButton,
			createSignature(),
		)
	}

	createHomeScreen = func() fyne.CanvasObject {
		title := canvas.NewText("Controle de Estoque", nil)
		title.TextStyle = fyne.TextStyle{Bold: true}
		title.TextSize = 24
		title.Alignment = fyne.TextAlignCenter
		newProductButton := widget.NewButtonWithIcon("Novo Produto", theme.DocumentCreateIcon(), func() {
			myWindow.SetContent(createAddProductScreen())
		})
		viewProductsButton := widget.NewButtonWithIcon("Ver Produtos", theme.ListIcon(), func() {
			myWindow.SetContent(createViewProductsScreen())
		})
		editProductButton := widget.NewButtonWithIcon("Editar Produto", theme.DocumentCreateIcon(), func() {
			myWindow.SetContent(createEditProductScreen())
		})
		deleteProductButton := widget.NewButtonWithIcon("Excluir Produto", theme.DeleteIcon(), func() {
			myWindow.SetContent(createDeleteProductScreen())
		})
		dashboardButton := widget.NewButtonWithIcon("Dashboard", theme.InfoIcon(), func() {
			myWindow.SetContent(createDashboardScreen())
		})
		exitButton := widget.NewButtonWithIcon("Sair do App", theme.CancelIcon(), func() {
			myApp.Quit()
		})

		buttons := container.NewGridWithColumns(
			2,
			newProductButton,
			viewProductsButton,
			editProductButton,
			deleteProductButton,
			dashboardButton,
			exitButton,
		)

		content := container.NewVBox(
			title,
			widget.NewLabel(""),
			buttons,
			widget.NewLabel(""),
			createSignature(),
		)

		return container.NewCenter(content)
	}

	createViewProductsScreen = func() fyne.CanvasObject {
		products := updateProductList()

		productList := widget.NewLabel("")
		sortCriteria := widget.NewSelect([]string{
			"Nome (A-Z)", "Nome (Z-A)",
			"ID (Menor-Maior)", "ID (Maior-Menor)",
			"Preço (Maior-Menor)", "Preço (Menor-Maior)",
			"Quantidade (Maior-Menor)", "Quantidade (Menor-Maior)",
			"Data de Criação (Recente-Antigo)", "Data de Criação (Antigo-Recente)",
		}, func(selected string) {
			switch selected {
			case "Nome (A-Z)":
				product.SortProductsByName(products, true)
			case "Nome (Z-A)":
				product.SortProductsByName(products, false)
			case "ID (Menor-Maior)":
				product.SortProductsByID(products, true)
			case "ID (Maior-Menor)":
				product.SortProductsByID(products, false)
			case "Preço (Maior-Menor)":
				product.SortProductsByPrice(products, false)
			case "Preço (Menor-Maior)":
				product.SortProductsByPrice(products, true)
			case "Quantidade (Maior-Menor)":
				product.SortProductsByQuantity(products, false)
			case "Quantidade (Menor-Maior)":
				product.SortProductsByQuantity(products, true)
			case "Data de Criação (Recente-Antigo)":
				product.SortProductsByCreationDate(products, false)
			case "Data de Criação (Antigo-Recente)":
				product.SortProductsByCreationDate(products, true)
			}

			productList.SetText(formatProductList(products))
		})
		sortCriteria.PlaceHolder = "Ordenar por..."

		backButton := widget.NewButton("Voltar", func() {
			myWindow.SetContent(createHomeScreen())
		})

		productList.SetText(formatProductList(products))

		scrollContainer := container.NewVScroll(
			container.NewVBox(
				widget.NewLabel("Lista de Produtos"),
				sortCriteria,
				productList,
			),
		)

		return container.NewBorder(
			nil,
			container.NewVBox(backButton, createSignature()),
			nil,
			nil,
			scrollContainer,
		)
	}

	createEditProductScreen = func() fyne.CanvasObject {
		editIDEntry := widget.NewEntry()
		editNameEntry := widget.NewEntry()
		editQuantityEntry := widget.NewEntry()
		editPriceEntry := widget.NewEntry()
		editCategoryEntry := widget.NewEntry()
		editDescriptionEntry := widget.NewEntry()
		editSupplierEntry := widget.NewEntry()
		editLocationEntry := widget.NewEntry()

		instructions := widget.NewLabel(
			"Preencha apenas os campos que deseja alterar. Campos deixados em branco manterão o valor atual.",
		)
		instructions.Wrapping = fyne.TextWrapWord

		validateAndUpdateProduct := func() error {
			id, err := strconv.Atoi(editIDEntry.Text)
			if err != nil {
				return fmt.Errorf("id deve ser um número inteiro")
			}

			products := updateProductList()
			var productToEdit *product.Product
			var index int

			for i, p := range products {
				if p.PId == id {
					productToEdit = &products[i]
					index = i
					break
				}
			}

			if productToEdit == nil {
				return fmt.Errorf("produto com id %d não encontrado", id)
			}

			if editNameEntry.Text != "" {
				productToEdit.PName = editNameEntry.Text
			}

			if editQuantityEntry.Text != "" {
				quantity, err := strconv.Atoi(editQuantityEntry.Text)
				if err != nil {
					return fmt.Errorf("quantidade deve ser um número inteiro")
				}
				productToEdit.PQuantity = quantity
			}

			if editPriceEntry.Text != "" {
				price, err := parsePrice(editPriceEntry.Text)
				if err != nil {
					return err
				}
				productToEdit.PPrice = price
			}

			if editCategoryEntry.Text != "" {
				productToEdit.PCategory = editCategoryEntry.Text
			}
			if editDescriptionEntry.Text != "" {
				productToEdit.PDescription = editDescriptionEntry.Text
			}
			if editSupplierEntry.Text != "" {
				productToEdit.PSupplier = editSupplierEntry.Text
			}
			if editLocationEntry.Text != "" {
				productToEdit.PLocation = editLocationEntry.Text
			}

			productToEdit.UpdatedAt = time.Now()

			updatedProducts, err := productToEdit.EditProduct(index, products)
			if err != nil {
				return fmt.Errorf("erro ao editar produto: %v", err)
			}

			return product.SaveProductsToFile(updatedProducts)
		}

		editButton := widget.NewButton("Editar Produto", func() {
			if err := validateAndUpdateProduct(); err != nil {
				dialog.ShowError(err, myWindow)
				return
			}
			dialog.ShowInformation("Sucesso", "Produto editado com sucesso!", myWindow)
			myWindow.SetContent(createHomeScreen())
		})

		backButton := widget.NewButton("Voltar", func() {
			myWindow.SetContent(createHomeScreen())
		})

		return container.NewVBox(
			widget.NewLabel("Editar Produto"),
			instructions,
			widget.NewLabel("ID do Produto a Editar:"), editIDEntry,
			widget.NewLabel("Novo Nome:"), editNameEntry,
			widget.NewLabel("Nova Quantidade:"), editQuantityEntry,
			widget.NewLabel("Novo Preço:"), editPriceEntry,
			widget.NewLabel("Nova Categoria:"), editCategoryEntry,
			widget.NewLabel("Nova Descrição:"), editDescriptionEntry,
			widget.NewLabel("Novo Fornecedor:"), editSupplierEntry,
			widget.NewLabel("Nova Localização:"), editLocationEntry,
			editButton,
			backButton,
			createSignature(),
		)
	}

	createDeleteProductScreen = func() fyne.CanvasObject {
		deleteIDEntry := widget.NewEntry()

		deleteButton := widget.NewButton("Excluir Produto", func() {
			id, err := strconv.Atoi(deleteIDEntry.Text)
			if err != nil {
				dialog.ShowError(fmt.Errorf("ID deve ser um número inteiro"), myWindow)
				return
			}

			products, err := product.LoadProductsFromFile()
			if err != nil {
				dialog.ShowError(fmt.Errorf("erro ao carregar produtos: %v", err), myWindow)
				return
			}

			var productName string
			for _, p := range products {
				if p.PId == id {
					productName = p.PName
					break
				}
			}

			dialog.ShowConfirm(
				"Confirmar Exclusão",
				fmt.Sprintf("Tem certeza que deseja excluir o produto:\nID: %d | Nome: %s?", id, productName),
				func(confirm bool) {
					if confirm {
						if err := product.DeleteProduct(id); err != nil {
							dialog.ShowError(fmt.Errorf("erro ao excluir produto: %v", err), myWindow)
							return
						}
						dialog.ShowInformation("Sucesso", "Produto excluído com sucesso!", myWindow)
						myWindow.SetContent(createHomeScreen())
					}
				},
				myWindow,
			)
		})

		backButton := widget.NewButton("Voltar", func() {
			myWindow.SetContent(createHomeScreen())
		})

		return container.NewVBox(
			widget.NewLabel("Excluir Produto"),
			widget.NewLabel("ID do Produto a Excluir:"),
			deleteIDEntry,
			deleteButton,
			backButton,
			createSignature(),
		)
	}

	createDashboardScreen = func() fyne.CanvasObject {
		products := updateProductList()
		stats := product.CalculateDashboardStats(products)

		statsLabel := widget.NewLabel(
			fmt.Sprintf(
				"📊 Dashboard de Estoque:\n\n"+
					"Total de Produtos: %d\n"+
					"Valor Total do Estoque: R$ %.2f\n"+
					"Produto Mais Caro: %s (R$ %.2f)\n"+
					"Produto com Menor Estoque: %s (%d unidades)\n\n"+
					"Produtos por Categoria:\n",
				stats.TotalProducts,
				stats.TotalStockValue,
				stats.MostExpensive.PName, stats.MostExpensive.PPrice,
				stats.LowestStock.PName, stats.LowestStock.PQuantity,
			),
		)

		for category, count := range stats.ProductsByCategory {
			statsLabel.Text += fmt.Sprintf("- %s: %d\n", category, count)
		}

		statsLabel.Wrapping = fyne.TextWrapWord

		backButton := widget.NewButton("Voltar", func() {
			myWindow.SetContent(createHomeScreen())
		})

		return container.NewVBox(
			statsLabel,
			backButton,
			createSignature(),
		)
	}

	myWindow.SetContent(createHomeScreen())
	myWindow.ShowAndRun()
}

