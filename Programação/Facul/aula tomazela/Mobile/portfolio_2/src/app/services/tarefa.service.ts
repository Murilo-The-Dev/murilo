import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';

export type TarefaInput = Omit<Tarefa, 'id' | 'concluida'>;

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private tarefas: Tarefa[] = [];
  private nextId = 1;

  listar(): Tarefa[] {
    return [...this.tarefas].sort((a, b) => {
      if (a.concluida !== b.concluida) {
        return Number(a.concluida) - Number(b.concluida);
      }
      return b.id - a.id;
    });
  }

  buscarPorId(id: number): Tarefa | undefined {
    const tarefa = this.tarefas.find((item) => item.id === id);
    return tarefa ? { ...tarefa } : undefined;
  }

  cadastrar(input: TarefaInput): void {
    this.tarefas.push({
      id: this.nextId,
      titulo: input.titulo,
      descricao: input.descricao,
      prioridade: input.prioridade,
      concluida: false,
    });
    this.nextId += 1;
  }

  editar(id: number, input: TarefaInput): boolean {
    const indice = this.tarefas.findIndex((item) => item.id === id);
    if (indice === -1) {
      return false;
    }

    this.tarefas[indice] = {
      ...this.tarefas[indice],
      titulo: input.titulo,
      descricao: input.descricao,
      prioridade: input.prioridade,
    };

    return true;
  }

  excluir(id: number): boolean {
    const totalAntes = this.tarefas.length;
    this.tarefas = this.tarefas.filter((item) => item.id !== id);
    return this.tarefas.length < totalAntes;
  }

  marcarConclusao(id: number, concluida: boolean): boolean {
    const tarefa = this.tarefas.find((item) => item.id === id);
    if (!tarefa) {
      return false;
    }

    tarefa.concluida = concluida;
    return true;
  }
}
