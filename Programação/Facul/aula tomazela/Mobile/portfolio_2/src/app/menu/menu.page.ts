import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  // Navega pra tela de cadastro
  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  // Navega pra tela de contas a receber
  irParaReceber() {
    this.router.navigate(['/receber']);
  }

  // Navega pra tela de contas a pagar
  irParaPagar() {
    this.router.navigate(['/pagar']);
  }

  // Volta pra tela de login (sair)
  sair() {
    this.router.navigate(['/login']);
  }
}
