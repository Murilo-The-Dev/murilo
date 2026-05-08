import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-receber',
  templateUrl: './receber.page.html',
  styleUrls: ['./receber.page.scss'],
})
export class ReceberPage implements OnInit {

  // Campos do formulário de contas a receber
  cliente: string = '';
  vencimento: string = '';
  pagamento: string = '';
  valor: number = 0;

  // Array com todas as contas a receber cadastradas
  listaReceber: any[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  // Adiciona uma nova conta a receber
  async cadastrar() {
    // Valida se pelo menos o cliente e o valor foram preenchidos
    if (!this.cliente.trim() || this.valor <= 0) {
      const alerta = await this.alertCtrl.create({
        header: 'Opa!',
        message: 'Preencha o cliente e um valor maior que zero.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    let novaConta = {
      cliente: this.cliente,
      vencimento: this.vencimento,
      pagamento: this.pagamento,
      valor: this.valor
    };

    // Coloca no início da lista
    this.listaReceber.unshift(novaConta);

    // Limpa o formulário
    this.limparFormulario();

    // Toast de confirmação
    const toast = await this.toastCtrl.create({
      message: 'Conta a receber adicionada!',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  // Remove uma conta pelo índice
  async excluir(index: number) {
    const alerta = await this.alertCtrl.create({
      header: 'Excluir?',
      message: 'Tem certeza que quer remover essa conta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.listaReceber.splice(index, 1);
          }
        }
      ]
    });
    await alerta.present();
  }

  // Calcula o total das contas a receber
  calcularTotal(): number {
    return this.listaReceber.reduce((total, item) => total + Number(item.valor), 0);
  }

  // Zera os campos do formulário
  limparFormulario() {
    this.cliente = '';
    this.vencimento = '';
    this.pagamento = '';
    this.valor = 0;
  }

  // Volta pro menu
  voltarMenu() {
    this.router.navigate(['/menu']);
  }
}
