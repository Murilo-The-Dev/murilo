namespace Veiculos;

public class Veiculo
{
    public string NumeroSerie { get; set; } = string.Empty;

    public string Marca { get; set; } = string.Empty;

    public string Modelo { get; set; } = string.Empty;

    protected virtual string ExibirDetalhes()
    {
        return $"Numero de Serie: {NumeroSerie}\nMarca: {Marca}\nModelo: {Modelo}";
    }
}