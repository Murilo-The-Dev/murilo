import java.util.Scanner;

class HeartRates {
    private String nome;
    private String sobrenome;
    private int idade;
    
    public HeartRates(String nome, String sobrenome, int idade) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.idade = idade;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getSobrenome() {
        return sobrenome;
    }
    
    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }
    
    public int getIdade() {
        return idade;
    }
    
    public void setIdade(int idade) {
        this.idade = idade;
    }
    
    public int calcularFrequenciaMaxima() {
        return 220 - idade;
    }
    
    public String calcularFrequenciaAlvo() {
        int frequenciaMaxima = calcularFrequenciaMaxima();
        int limiteInferior = (int)(frequenciaMaxima * 0.50);
        int limiteSuperior = (int)(frequenciaMaxima * 0.85);
        return limiteInferior + " - " + limiteSuperior + " bpm";
    }
}

public class MonitorFrequenciaCardiaca {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Nome: ");
            String nome = scanner.nextLine();
            
            System.out.print("Sobrenome: ");
            String sobrenome = scanner.nextLine();
            
            System.out.print("Idade: ");
            int idade = scanner.nextInt();
            
            HeartRates pessoa = new HeartRates(nome, sobrenome, idade);
            
            System.out.println("\n=== DADOS DA PESSOA ===");
            System.out.println("Nome: " + pessoa.getNome() + " " + pessoa.getSobrenome());
            System.out.println("Idade: " + pessoa.getIdade() + " anos");
            System.out.println("Frequência cardíaca máxima: " + pessoa.calcularFrequenciaMaxima() + " bpm");
            System.out.println("Frequência cardíaca alvo: " + pessoa.calcularFrequenciaAlvo());
        }
    }
}