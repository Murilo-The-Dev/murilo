public class Email extends Notificacao {
    @SuppressWarnings("FieldMayBeFinal")
    private String destinatario;
    
    public Email(String destinatario) {
        this.destinatario = destinatario;
    }
    
    @Override
    public void enviar() {
        System.out.println("Email enviado para " + destinatario);
    }
}