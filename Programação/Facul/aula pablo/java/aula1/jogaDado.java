
import java.security.SecureRandom;



public class jogaDado {
    
    public static void main(String[] args) {
        SecureRandom randomNumber = new SecureRandom();
        int frequencia1 = 0;
        int frequencia2 = 0;
        int frequencia3 = 0;
        int frequencia4 = 0;
        int frequencia5 = 0;
        int frequencia6 = 0;
        for (int jogada = 1; jogada<=6000; jogada++) {
            int lado = 1 + randomNumber.nextInt(6);
            switch(lado) {
                case 1 -> ++frequencia1;
                case 2 -> ++frequencia2;
                case 3 -> ++frequencia3;
                case 4 -> ++frequencia4;
                case 5 -> ++frequencia5;
                case 6 -> ++frequencia6;
            }
        }
        System.out.printf("1- %d%n 2- %d%n 3- %d%n 4- %d%n 5- %d%n 6- %d%n", frequencia1,frequencia2,frequencia3,frequencia4,frequencia5,frequencia6);
    }

}
