public class Email extends Notificacao {
    private String destinatario;
    
    public Email(String destinatario) {
        this.destinatario = destinatario;
    }
    
    @Override
    public void enviar() {
        System.out.println("Email enviado para " + destinatario);
    }
}