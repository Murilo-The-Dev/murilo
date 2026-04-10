import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular'; // alerta e toast pra feedback

@Component({
  standalone: false,
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  // Variáveis dos campos do formulário
  nome: string = '';
  tipo: string = '';
  endereco: string = '';

  // Array que guarda todos os cadastros feitos (fica só na memória, sem banco de dados)
  listaCadastros: any[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  // Função que adiciona um novo cadastro na lista
  async cadastrar() {
    // Valida se pelo menos o nome foi preenchido
    if (!this.nome.trim()) {
      const alerta = await this.alertCtrl.create({
        header: 'Opa!',
        message: 'Preencha pelo menos o nome pra cadastrar.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }

    // Cria um objeto com os dados digitados
    let novoCadastro = {
      nome: this.nome,
      tipo: this.tipo,
      endereco: this.endereco
    };

    // unshift adiciona no início do array (aparece no topo da lista)
    this.listaCadastros.unshift(novoCadastro);

    // Limpa o formulário depois de cadastrar
    this.limparFormulario();

    // Mostra um toast rápido confirmando
    const toast = await this.toastCtrl.create({
      message: 'Cadastro adicionado!',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  // Função que remove um item da lista pelo índice
  async excluir(index: number) {
    // Pergunta antes de excluir
    const alerta = await this.alertCtrl.create({
      header: 'Excluir?',
      message: 'Tem certeza que quer remover esse cadastro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            // splice remove 1 item na posição indicada
            this.listaCadastros.splice(index, 1);
          }
        }
      ]
    });
    await alerta.present();
  }

  // Função que reseta os campos do formulário
  limparFormulario() {
    this.nome = '';
    this.tipo = '';
    this.endereco = '';
  }

  // Volta pro menu principal
  voltarMenu() {
    this.router.navigate(['/menu']);
  }
}
