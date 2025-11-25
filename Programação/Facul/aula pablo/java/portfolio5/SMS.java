public class SMS extends Notificacao {
    private String numero;
    
    public SMS(String numero) {
        this.numero = numero;
    }
    
    @Override
    public void enviar() {
        System.out.println("SMS enviado para " + numero);
    }
}