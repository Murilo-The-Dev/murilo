@SuppressWarnings("FieldMayBeFinal")
class Pessoa {
    private String nome;
    private int idade;
    private String email;
    private String telefone;

    public Pessoa(String nome, int idade, String email, String telefone) {
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.telefone = telefone;
    }

    public void exibirDados() {
        System.out.println("Nome: " + nome);
        System.out.println("Idade: " + idade);
        System.out.println("Email: " + email);
        System.out.println("Telefone: " + telefone);
    }

    protected String getNome() {
        return nome;
    }

    protected int getIdade() {
        return idade;
    }

    protected String getEmail() {
        return email;
    }

    protected String getTelefone() {
        return telefone;
    }
}

@SuppressWarnings("FieldMayBeFinal")
class Aluno extends Pessoa {
    private String matricula;
    private String curso;
    private double[] notas;

    public Aluno(String nome, int idade, String email, String telefone, 
                 String matricula, String curso, int quantidadeNotas) {
        super(nome, idade, email, telefone);
        this.matricula = matricula;
        this.curso = curso;
        this.notas = new double[quantidadeNotas];
    }

    public void adicionarNota(int posicao, double nota) {
        if (nota < 0 || nota > 10) {
            System.out.println("Nota inválida. Deve estar entre 0 e 10.");
            return;
        }
        if (posicao < 0 || posicao >= notas.length) {
            System.out.println("Posição inválida.");
            return;
        }
        notas[posicao] = nota;
    }

    public double calcularMedia() {
        if (notas.length == 0) {
            return 0.0;
        }
        
        double soma = 0;
        for (double nota : notas) {
            soma += nota;
        }
        return soma / notas.length;
    }

    public String situacaoFinal() {
        double media = calcularMedia();
        
        if (media >= 7.0) {
            return "Aprovado";
        } else if (media >= 5.0) {
            return "Exame";
        } else {
            return "Reprovado";
        }
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Matrícula: " + matricula);
        System.out.println("Curso: " + curso);
        System.out.printf("Média: %.2f%n", calcularMedia());
        System.out.println("Situação: " + situacaoFinal());
    }
}

@SuppressWarnings("FieldMayBeFinal")
class Professor extends Pessoa {
    private String registroFuncionario;
    private String departamento;
    private double salario;

    public Professor(String nome, int idade, String email, String telefone,
                     String registroFuncionario, String departamento, double salario) {
        super(nome, idade, email, telefone);
        this.registroFuncionario = registroFuncionario;
        this.departamento = departamento;
        this.salario = salario;
    }

    public void aplicarAumento(double percentual) {
        if (percentual < 0) {
            System.out.println("Percentual inválido.");
            return;
        }
        salario += salario * (percentual / 100);
    }

    @Override
    public void exibirDados() {
        super.exibirDados();
        System.out.println("Registro: " + registroFuncionario);
        System.out.println("Departamento: " + departamento);
        System.out.printf("Salário: R$ %.2f%n", salario);
    }
}

public class escola {
    public static void main(String[] args) {
        Aluno aluno = new Aluno("Carlos Silva", 20, "carlos@email.com", 
                                "11987654321", "2024001", "Ciência da Computação", 4);
        
        aluno.adicionarNota(0, 8.5);
        aluno.adicionarNota(1, 7.0);
        aluno.adicionarNota(2, 9.0);
        aluno.adicionarNota(3, 6.5);

        System.out.println("=== DADOS DO ALUNO ===");
        aluno.exibirDados();
        
        System.out.println("\n=== DADOS DO PROFESSOR ===");
        Professor professor = new Professor("Ana Paula", 35, "ana@email.com",
                                            "11912345678", "FUNC2020", "Matemática", 4500.00);
        
        professor.exibirDados();
        
        System.out.println("\n=== APLICANDO AUMENTO ===");
        professor.aplicarAumento(10);
        professor.exibirDados();
    }
}