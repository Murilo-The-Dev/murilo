import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  // Campos do formulário de contas a pagar
  fornecedor: string = '';
  vencimento: string = '';
  pagamento: string = '';
  valor: number = 0;

  // Array com todas as contas a pagar cadastradas
  listaPagar: any[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  // Adiciona uma nova conta a pagar na lista
  async cadastrar() {
    // Valida se pelo menos o fornecedor e o valor foram preenchidos
    if (!this.fornecedor.trim() || this.valor <= 0) {
      const alerta = await this.alertCtrl.create({
        header: 'Opa!',
        message: 'Preencha o fornecedor e um valor maior que zero.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    let novaConta = {
      fornecedor: this.fornecedor,
      vencimento: this.vencimento,
      pagamento: this.pagamento,
      valor: this.valor
    };

    // Adiciona no topo da lista
    this.listaPagar.unshift(novaConta);

    // Limpa os campos
    this.limparFormulario();

    // Toast de confirmação
    const toast = await this.toastCtrl.create({
      message: 'Conta a pagar adicionada!',
      duration: 1500,
      position: 'bottom',
      color: 'warning'
    });
    await toast.present();
  }

  // Remove uma conta da lista pelo índice
  async excluir(index: number) {
    const alerta = await this.alertCtrl.create({
      header: 'Excluir?',
      message: 'Tem certeza que quer remover essa conta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.listaPagar.splice(index, 1);
          }
        }
      ]
    });
    await alerta.present();
  }

  // Calcula o total das contas a pagar
  calcularTotal(): number {
    return this.listaPagar.reduce((total, item) => total + Number(item.valor), 0);
  }

  // Reseta os campos do formulário
  limparFormulario() {
    this.fornecedor = '';
    this.vencimento = '';
    this.pagamento = '';
    this.valor = 0;
  }

  // Volta pro menu
  voltarMenu() {
    this.router.navigate(['/menu']);
  }
}
