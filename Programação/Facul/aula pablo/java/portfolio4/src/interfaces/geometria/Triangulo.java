public class Triangulo implements FormaGeometrica {
    private double a, b, c;

    public Triangulo(double a, double b, double c) {
        definirLados(a, b, c);
    }

    private void checarPositivo(double val, String campo) {
        if (val <= 0) {
            throw new IllegalArgumentException("Erro: " + campo + " precisa ser positivo. Recebido: " + val);
        }
    }

    private void checarDesigualdade(double a, double b, double c) {
        boolean valido = (a + b > c) && (a + c > b) && (b + c > a);
        if (!valido) {
            throw new IllegalArgumentException("Erro: Lados não formam triângulo válido: " + a + ", " + b + ", " + c);
        }
    }

    public double obterLadoA() { return a; }
    public double obterLadoB() { return b; }
    public double obterLadoC() { return c; }

    public void definirLados(double a, double b, double c) {
        checarPositivo(a, "Lado A");
        checarPositivo(b, "Lado B");
        checarPositivo(c, "Lado C");
        checarDesigualdade(a, b, c);
        
        this.a = a;
        this.b = b;
        this.c = c;
    }

    @Override
    public double calcularArea() {
        double sp = calcularPerimetro() / 2.0;
        return Math.sqrt(sp * (sp - a) * (sp - b) * (sp - c));
    }

    @Override
    public double calcularPerimetro() {
        return a + b + c;
    }

    @Override
    public String obterNome() {
        return "Triângulo";
    }
}