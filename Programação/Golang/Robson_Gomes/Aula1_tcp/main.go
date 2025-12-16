// TCP Básico em Go

package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
)

func main() {
	ls, err := net.Listen("tcp", ":5000")

	if err != nil {
		panic(err)
	}

	defer ls.Close()

	for {
		conn, err := ls.Accept()
		fmt.Println("Conexão estabelecida.")
		if err != nil {
		panic(err)
		}
		go func (conn net.Conn) {
			for {
				data, _ :=bufio.NewReader(conn).ReadString('\n')
				fmt.Println("Dado recebido: ", data)
				if strings.Contains(data, "quit") {
					break
				}
				conn.Write([]byte("Sua mensagem foi recebida com sucesso.\n"))
			}
			conn.Close()
			fmt.Println("Conexão encerrada.")
		} (conn)
	}
}