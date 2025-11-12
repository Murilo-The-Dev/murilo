public class Circulo implements FormaGeometrica {
    private double r;

    public Circulo(double r) {
        definirRaio(r);
    }

    private void checarPositivo(double val, String campo) {
        if (val <= 0) {
            throw new IllegalArgumentException("Erro: " + campo + " precisa ser positivo. Recebido: " + val);
        }
    }

    public double obterRaio() {
        return r;
    }

    public void definirRaio(double r) {
        checarPositivo(r, "Raio");
        this.r = r;
    }

    @Override
    public double calcularArea() {
        return Math.PI * Math.pow(r, 2);
    }

    @Override
    public double calcularPerimetro() {
        return 2.0 * Math.PI * r;
    }

    @Override
    public String obterNome() {
        return "Círculo";
    }
}