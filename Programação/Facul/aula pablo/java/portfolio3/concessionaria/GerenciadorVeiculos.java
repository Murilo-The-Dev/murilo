package concessionaria;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import veiculos.CarroVenda;

public class GerenciadorVeiculos {
    private final List<CarroVenda> veiculos;

    public GerenciadorVeiculos() {
        this.veiculos = new ArrayList<>();
    }

    private void cadastrarVeiculo(Scanner scanner) {
        CarroVenda carro = new CarroVenda();

        System.out.print("Número de Série: ");
        carro.setNumeroSerie(scanner.nextLine());

        System.out.print("Marca: ");
        carro.setMarca(scanner.nextLine());

        System.out.print("Modelo: ");
        carro.setModelo(scanner.nextLine());

        System.out.print("Preço de Venda: ");
        carro.setPrecoVenda(new BigDecimal(scanner.nextLine()));

        veiculos.add(carro);
        System.out.println("\nVeículo cadastrado com sucesso.\n");
    }

    private void imprimirFicha(Scanner scanner) {
        if (veiculos.isEmpty()) {
            System.out.println("\nNenhum veículo cadastrado.\n");
            return;
        }

        System.out.print("\nNúmero de série do veículo: ");
        String numeroSerie = scanner.nextLine();

        veiculos.stream()
                .filter(v -> v.getNumeroSerie().equals(numeroSerie))
                .findFirst()
                .ifPresentOrElse(
                        v -> System.out.println("\n" + v.obterFicha() + "\n"),
                        () -> System.out.println("\nVeículo não encontrado.\n")
                );
    }

    private void exibirMenu() {
        System.out.println("1 -- Cadastrar Veículo para venda");
        System.out.println("2 -- Imprimir ficha do veículo para venda");
        System.out.println("3 -- Sair");
        System.out.print("Opção: ");
    }

    private void executar() {
        try (Scanner scanner = new Scanner(System.in)) {
            boolean executando = true;

            while (executando) {
                exibirMenu();
                String opcao = scanner.nextLine();

                switch (opcao) {
                    case "1" -> cadastrarVeiculo(scanner);
                    case "2" -> imprimirFicha(scanner);
                    case "3" -> executando = false;
                    default -> System.out.println("\nOpção inválida.\n");
                }
            }
        }
    }

    public static void main(String[] args) {
        new GerenciadorVeiculos().executar();
    }
}