import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tarefa } from '../models/tarefa.model';
import { TarefaService } from '../services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tarefas: Tarefa[] = [];
  filtro: 'todas' | 'pendentes' | 'concluidas' = 'todas';

  constructor(
    private readonly tarefaService: TarefaService,
    private readonly router: Router,
    private readonly alertCtrl: AlertController,
  ) {}

  ionViewWillEnter(): void {
    this.carregar();
  }

  get tarefasFiltradas(): Tarefa[] {
    if (this.filtro === 'pendentes') {
      return this.tarefas.filter((item) => !item.concluida);
    }

    if (this.filtro === 'concluidas') {
      return this.tarefas.filter((item) => item.concluida);
    }

    return this.tarefas;
  }

  get totalConcluidas(): number {
    return this.tarefas.filter((item) => item.concluida).length;
  }

  novaTarefa(): void {
    this.router.navigate(['/cadastro']);
  }

  editarTarefa(id: number): void {
    this.router.navigate(['/cadastro', id]);
  }

  alterarConclusao(id: number, event: CustomEvent<{ checked: boolean }>): void {
    const concluida = Boolean(event.detail.checked);
    this.tarefaService.marcarConclusao(id, concluida);
    this.carregar();
  }

  async excluirTarefa(id: number): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Excluir tarefa',
      message: 'Deseja realmente excluir esta tarefa?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.tarefaService.excluir(id);
            this.carregar();
          },
        },
      ],
    });

    await alert.present();
  }

  corPrioridade(prioridade: Tarefa['prioridade']): 'success' | 'warning' | 'danger' {
    if (prioridade === 'alta') {
      return 'danger';
    }
    if (prioridade === 'media') {
      return 'warning';
    }
    return 'success';
  }

  private carregar(): void {
    this.tarefas = this.tarefaService.listar();
  }

}
