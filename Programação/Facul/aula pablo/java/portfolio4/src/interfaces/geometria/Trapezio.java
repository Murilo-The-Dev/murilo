public class Trapezio implements FormaGeometrica {
    private double bMaior, bMenor, h, lat1, lat2;

    public Trapezio(double bMaior, double bMenor, double h, double lat1, double lat2) {
        definirBaseMaior(bMaior);
        definirBaseMenor(bMenor);
        definirAltura(h);
        definirLateral1(lat1);
        definirLateral2(lat2);
    }

    private void checarPositivo(double val, String campo) {
        if (val <= 0) {
            throw new IllegalArgumentException("Erro: " + campo + " precisa ser positivo. Recebido: " + val);
        }
    }

    public double obterBaseMaior() { return bMaior; }
    public void definirBaseMaior(double bMaior) {
        checarPositivo(bMaior, "Base Maior");
        this.bMaior = bMaior;
    }

    public double obterBaseMenor() { return bMenor; }
    public void definirBaseMenor(double bMenor) {
        checarPositivo(bMenor, "Base Menor");
        this.bMenor = bMenor;
    }

    public double obterAltura() { return h; }
    public void definirAltura(double h) {
        checarPositivo(h, "Altura");
        this.h = h;
    }

    public double obterLateral1() { return lat1; }
    public void definirLateral1(double lat1) {
        checarPositivo(lat1, "Lado 1");
        this.lat1 = lat1;
    }

    public double obterLateral2() { return lat2; }
    public void definirLateral2(double lat2) {
        checarPositivo(lat2, "Lado 2");
        this.lat2 = lat2;
    }

    @Override
    public double calcularArea() {
        return (bMaior + bMenor) * h / 2.0;
    }

    @Override
    public double calcularPerimetro() {
        return bMaior + bMenor + lat1 + lat2;
    }

    @Override
    public String obterNome() {
        return "Trapézio";
    }
}