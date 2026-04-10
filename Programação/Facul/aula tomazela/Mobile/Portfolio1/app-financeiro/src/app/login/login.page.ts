import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // importa o Router pra navegar entre páginas
import { AlertController } from '@ionic/angular'; // pra mostrar alertas bonitinhos

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Variáveis ligadas aos campos do formulário
  nome: string = '';
  senha: string = '';

  // Injeta o Router e o AlertController no construtor
  constructor(private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  // Função chamada quando o usuário clica em "Avançar"
  async avancar() {
    // Verifica se os campos estão preenchidos
    if (!this.nome.trim() || !this.senha.trim()) {
      // Mostra um alerta avisando que falta preencher
      const alerta = await this.alertCtrl.create({
        header: 'Opa!',
        message: 'Preencha o nome e a senha pra continuar.',
        buttons: ['OK']
      });
      await alerta.present();
      return;
    }
    // Se tá tudo certo, navega pra tela de menu
    this.router.navigate(['/menu']);
  }
}
