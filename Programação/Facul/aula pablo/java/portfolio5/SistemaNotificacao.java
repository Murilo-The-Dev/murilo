public class SistemaNotificacao {
    public static void main(String[] args) {
        Notificacao[] notificacoes = new Notificacao[3];
        
        notificacoes[0] = new Email("aluno@escola.com");
        notificacoes[1] = new SMS("(11) 99999-9999");
        notificacoes[2] = new Email("professor@escola.com");
        
        for (int i = 0; i < notificacoes.length; i++) {
            notificacoes[i].enviar();
        }
    }
}