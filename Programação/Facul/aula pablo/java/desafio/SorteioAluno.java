import java.util.Random;

public class SorteioAluno {
    public static void main(String[] args) {
        String[] alunos = {
            "Aaron Samuel",
            "Adryel Henrique",
            "Alexandre Ricardo",
            "Amanda Carminatti",
            "Ana Julia",
            "Andre Rubin",
            "Cesar Augusto",
            "Eduardo Henrryk",
            "Enzo Negreto",
            "Erik Henrique",
            "Eryck Mussarelli",
            "Fernando Luis",
            "Gabriel Guedes",
            "Gabriel Tobias",
            "Geovanni Adrian",
            "Guilherme Cardoso",
            "Guilherme Rodrigues",
            "João Augusto",
            "Lucas Pinheiro",
            "Lucas Renato",
            "Luis Miguel",
            "Matheus Kauan",
            "Murilo do Amaral",
            "Paulo Roberto",
            "Paulo Sergio",
            "Rafael Farinazzo",
            "Sara de Lima",
            "Sofia Alves",
            "Thales Henrique",
            "Theo Ribeiro",
            "Victor Ferreira"
        };

        Random random = new Random();
        int numeroSorteado = random.nextInt(alunos.length) + 1; // 1 a 31
        String alunoSelecionado = alunos[numeroSorteado - 1];

        System.out.println("Numero sorteado: " + numeroSorteado);
        System.out.println("Aluno: " + alunoSelecionado);
    }
}