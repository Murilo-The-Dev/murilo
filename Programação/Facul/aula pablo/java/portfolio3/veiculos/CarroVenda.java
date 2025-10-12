package veiculos;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

public class CarroVenda extends Veiculo {
    protected BigDecimal precoVenda;

    public BigDecimal getPrecoVenda() {
        return precoVenda;
    }

    public void setPrecoVenda(BigDecimal precoVenda) {
        this.precoVenda = precoVenda;
    }

    public String obterFicha() {
    return exibirDetalhes();
}

    @Override
    protected String exibirDetalhes() {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.of("pt", "BR"));
        return String.format("%s%nPreço de Venda: %s",
                super.exibirDetalhes(),
                formatter.format(precoVenda));
    }
}