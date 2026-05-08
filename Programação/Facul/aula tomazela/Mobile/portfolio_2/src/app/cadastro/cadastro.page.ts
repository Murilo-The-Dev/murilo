import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TarefaService } from '../services/tarefa.service';

@Component({
  standalone: false,
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  titulo = '';
  descricao = '';
  prioridade: 'baixa' | 'media' | 'alta' = 'media';

  modoEdicao = false;
  tarefaId: number | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastCtrl: ToastController,
    private readonly tarefaService: TarefaService,
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.prepararNovoCadastro();
      return;
    }

    const id = Number(idParam);
    if (Number.isNaN(id)) {
      this.voltar();
      return;
    }

    const tarefa = this.tarefaService.buscarPorId(id);
    if (!tarefa) {
      this.voltar();
      return;
    }

    this.modoEdicao = true;
    this.tarefaId = id;
    this.titulo = tarefa.titulo;
    this.descricao = tarefa.descricao;
    this.prioridade = tarefa.prioridade;
  }

  async salvar(): Promise<void> {
    if (!this.titulo.trim() || !this.descricao.trim()) {
      await this.mostrarToast('Preencha titulo e descricao.', 'warning');
      return;
    }

    const payload = {
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      prioridade: this.prioridade,
    };

    if (this.modoEdicao && this.tarefaId !== null) {
      const atualizou = this.tarefaService.editar(this.tarefaId, payload);
      if (!atualizou) {
        await this.mostrarToast('Nao foi possivel editar a tarefa.', 'danger');
        return;
      }

      await this.mostrarToast('Tarefa atualizada com sucesso.', 'success');
      this.voltar();
      return;
    }

    this.tarefaService.cadastrar(payload);
    await this.mostrarToast('Tarefa cadastrada com sucesso.', 'success');
    this.voltar();
  }

  limparFormulario(): void {
    this.titulo = '';
    this.descricao = '';
    this.prioridade = 'media';
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }

  private prepararNovoCadastro(): void {
    this.modoEdicao = false;
    this.tarefaId = null;
    this.limparFormulario();
  }

  private async mostrarToast(
    mensagem: string,
    color: 'success' | 'warning' | 'danger',
  ): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 1600,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
