package veiculos;

public class Veiculo {
    private String numeroSerie;
    protected String marca;
    protected String modelo;

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    protected String exibirDetalhes() {
        return String.format("Número de Série: %s%nMarca: %s%nModelo: %s",
                numeroSerie, marca, modelo);
    }
}