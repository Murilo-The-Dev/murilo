import java.util.InputMismatchException;
import java.util.Scanner;

public class TesteFiguras {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int escolha = -1;

        while (escolha != 0) {
            exibirMenu();
            
            try {
                escolha = sc.nextInt();
                sc.nextLine();

                if (escolha == 1) processarCirculo(sc);
                else if (escolha == 2) processarTrapezio(sc);
                else if (escolha == 3) processarTriangulo(sc);
                else if (escolha == 0) System.out.println("Encerrando o programa.");
                else System.out.println("Opção inválida. Tente novamente.");
                
            } catch (InputMismatchException e) {
                System.out.println("Erro: Entrada inválida. Por favor, digite um número.");
                sc.nextLine();
                escolha = -1;
            }
        }
        sc.close();
    }

    private static void exibirMenu() {
        System.out.println("\n--- Menu de Figuras Geométricas ---");
        System.out.println("1. Círculo");
        System.out.println("2. Trapézio");
        System.out.println("3. Triângulo");
        System.out.println("0. Sair");
        System.out.print("Escolha uma opção: ");
    }

    private static void processarCirculo(Scanner sc) {
        boolean ok = false;
        while (!ok) {
            try {
                System.out.print("Digite o raio do Círculo: ");
                double raio = sc.nextDouble();
                sc.nextLine();

                Circulo circ = new Circulo(raio);
                exibirResultados(circ);
                ok = true;
            } catch (IllegalArgumentException e) {
                System.out.println("Erro de validação: " + e.getMessage());
            } catch (InputMismatchException e) {
                System.out.println("Erro: Entrada inválida. Por favor, digite um número.");
                sc.nextLine();
            }
        }
    }

    private static void processarTrapezio(Scanner sc) {
        boolean ok = false;
        while (!ok) {
            try {
                System.out.print("Digite a Base Maior do Trapézio: ");
                double bMaior = sc.nextDouble();
                System.out.print("Digite a Base Menor do Trapézio: ");
                double bMenor = sc.nextDouble();
                System.out.print("Digite a Altura do Trapézio: ");
                double altura = sc.nextDouble();
                System.out.print("Digite o Lado 1 do Trapézio: ");
                double lado1 = sc.nextDouble();
                System.out.print("Digite o Lado 2 do Trapézio: ");
                double lado2 = sc.nextDouble();
                sc.nextLine();

                Trapezio trap = new Trapezio(bMaior, bMenor, altura, lado1, lado2);
                exibirResultados(trap);
                ok = true;
            } catch (IllegalArgumentException e) {
                System.out.println("Erro de validação: " + e.getMessage());
            } catch (InputMismatchException e) {
                System.out.println("Erro: Entrada inválida. Por favor, digite um número.");
                sc.nextLine();
            }
        }
    }

    private static void processarTriangulo(Scanner sc) {
        boolean ok = false;
        while (!ok) {
            try {
                System.out.print("Digite o Lado A do Triângulo: ");
                double ladoA = sc.nextDouble();
                System.out.print("Digite o Lado B do Triângulo: ");
                double ladoB = sc.nextDouble();
                System.out.print("Digite o Lado C do Triângulo: ");
                double ladoC = sc.nextDouble();
                sc.nextLine();

                Triangulo tri = new Triangulo(ladoA, ladoB, ladoC);
                exibirResultados(tri);
                ok = true;
            } catch (IllegalArgumentException e) {
                System.out.println("Erro de validação: " + e.getMessage());
            } catch (InputMismatchException e) {
                System.out.println("Erro: Entrada inválida. Por favor, digite um número.");
                sc.nextLine();
            }
        }
    }

    private static void exibirResultados(FormaGeometrica forma) {
        System.out.println(forma.obterNome() + " criado com sucesso");
        System.out.println("Área: " + forma.calcularArea());
        System.out.println("Perímetro: " + forma.calcularPerimetro());
    }
}