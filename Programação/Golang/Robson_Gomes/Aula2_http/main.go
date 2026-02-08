package main

import (
	"fmt"
	"net/http"
)

type MyHandler struct{}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hello world"))
}

func main() {
	fmt.Println("Servidor rodando na porta 5000")

	http.HandleFunc("/hello", helloHandler)

	http.ListenAndServe(":5000", nil)
}