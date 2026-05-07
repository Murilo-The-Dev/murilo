using Veiculos;

namespace Concessionaria;

public class GerenciadorVeiculos
{
    private readonly List<CarroVenda> _veiculos = [];

    private void CadastrarVeiculo()
    {
        var carro = new CarroVenda();

        Console.Write("Numero de Serie: ");
        carro.NumeroSerie = Console.ReadLine() ?? string.Empty;

        Console.Write("Marca: ");
        carro.Marca = Console.ReadLine() ?? string.Empty;

        Console.Write("Modelo: ");
        carro.Modelo = Console.ReadLine() ?? string.Empty;

        Console.Write("Preco de Venda: ");
        var textoPreco = Console.ReadLine();

        if (!decimal.TryParse(textoPreco, out var precoVenda))
        {
            Console.WriteLine("\nPreco invalido. Cadastro cancelado.\n");
            return;
        }

        carro.PrecoVenda = precoVenda;
        _veiculos.Add(carro);

        Console.WriteLine("\nVeiculo cadastrado com sucesso.\n");
    }

    private void ImprimirFicha()
    {
        if (_veiculos.Count == 0)
        {
            Console.WriteLine("\nNenhum veiculo cadastrado.\n");
            return;
        }

        Console.Write("\nNumero de serie do veiculo: ");
        var numeroSerie = Console.ReadLine() ?? string.Empty;

        var veiculo = _veiculos.FirstOrDefault(v => v.NumeroSerie == numeroSerie);

        if (veiculo is null)
        {
            Console.WriteLine("\nVeiculo nao encontrado.\n");
            return;
        }

        Console.WriteLine($"\n{veiculo.ObterFicha()}\n");
    }

    private static void ExibirMenu()
    {
        Console.WriteLine("1 -- Cadastrar Veiculo para venda");
        Console.WriteLine("2 -- Imprimir ficha do veiculo para venda");
        Console.WriteLine("3 -- Sair");
        Console.Write("Opcao: ");
    }

    private void Executar()
    {
        var executando = true;

        while (executando)
        {
            ExibirMenu();
            var opcao = Console.ReadLine();

            switch (opcao)
            {
                case "1":
                    CadastrarVeiculo();
                    break;
                case "2":
                    ImprimirFicha();
                    break;
                case "3":
                    executando = false;
                    break;
                default:
                    Console.WriteLine("\nOpcao invalida.\n");
                    break;
            }
        }
    }

    public static void Main(string[] args)
    {
        new GerenciadorVeiculos().Executar();
    }
}