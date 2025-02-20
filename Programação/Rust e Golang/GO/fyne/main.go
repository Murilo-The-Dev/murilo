package main

import (
    "fyne.io/fyne/v2/app"
    "fyne.io/fyne/v2/container"
    "fyne.io/fyne/v2/widget"
)

func main() {
    // Cria uma nova aplicação
    myApp := app.New()

    // Cria uma nova janela
    myWindow := myApp.NewWindow("Meu App Fyne")

    // Cria um botão
    button := widget.NewButton("Clique aqui", func() {
        // Ação ao clicar no botão
        println("Botão clicado!")
    })

    // Adiciona o botão à janela
    myWindow.SetContent(container.NewVBox(
        button,
    ))

    // Mostra a janela e roda a aplicação
    myWindow.ShowAndRun()
}                         