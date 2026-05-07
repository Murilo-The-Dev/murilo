using System.Globalization;

namespace Veiculos;

public class CarroVenda : Veiculo
{
    public decimal PrecoVenda { get; set; }

    public string ObterFicha()
    {
        return ExibirDetalhes();
    }

    protected override string ExibirDetalhes()
    {
        var culturaPtBr = new CultureInfo("pt-BR");
        return $"{base.ExibirDetalhes()}\nPreco de Venda: {PrecoVenda.ToString("C", culturaPtBr)}";
    }
}