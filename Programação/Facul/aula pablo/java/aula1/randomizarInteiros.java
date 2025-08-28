
import java.security.SecureRandom;


public class randomizarInteiros{

    public static void main(String[] args) {
        SecureRandom numeroRandomizado = new SecureRandom();
        for (int i=1; i<=20; i++) {
            int Dado = 1 + numeroRandomizado.nextInt(6);
            System.out.printf("%d ",Dado);
            if (i % 5==0) {
                System.out.println();
            }
        }
    }

}