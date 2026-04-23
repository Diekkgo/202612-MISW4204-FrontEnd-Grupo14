import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditWeeksComponent } from '../create-edit-weeks/create-edit-weeks/create-edit-weeks.component';

interface Semana {
  id: string;
  numero: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

@Component({
  selector: 'app-list-weeks-modal',
  standalone: true,
  imports: [CommonModule, CreateEditWeeksComponent],
  templateUrl: './list-weeks.component.html',
  styleUrls: ['./list-weeks.component.css']
})
export class ListWeeksComponent {
  mostrarModal = false;

  semanas: Semana[] = [
    {
      id: '1',
      numero: 1,
      fechaInicio: '2026-04-01',
      fechaFin: '2026-04-07',
      estado: 'Disponible'
    },
    {
      id: '2',
      numero: 2,
      fechaInicio: '2026-04-08',
      fechaFin: '2026-04-14',
      estado: 'Disponible'
    },
    {
      id: '3',
      numero: 3,
      fechaInicio: '2026-04-15',
      fechaFin: '2026-04-21',
      estado: 'Cerrada'
    }
  ];

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  seleccionarSemana(semana: Semana): void {
    console.log('Semana seleccionada:', semana);
  }

  editarSemana(semana: Semana): void {
    console.log('Editar semana:', semana);
    // aquí luego puedes abrir otro modal o navegar a un formulario
  }

  eliminarSemana(id: string): void {
    const confirmado = confirm('¿Seguro que deseas eliminar esta semana?');
    if (!confirmado) return;

    this.semanas = this.semanas.filter(semana => semana.id !== id);
    console.log('Semana eliminada:', id);
  }

  periodos = [
    { id: '1', nombre: '2026-1' },
    { id: '2', nombre: '2026-2' }
  ];

  mostrarModalSemana = false;
  semanaSeleccionada: any = null;

  abrirModalCrearSemana(): void {
    this.semanaSeleccionada = null;
    this.mostrarModalSemana = true;
  }

  abrirModalEditarSemana(semana: any): void {
    this.semanaSeleccionada = { ...semana };
    this.mostrarModalSemana = true;
  }

  cerrarModalSemana(): void {
    this.mostrarModalSemana = false;
    this.semanaSeleccionada = null;
  }

  guardarSemana(data: any): void {
    if (data.id) {
      this.semanas = this.semanas.map(semana =>
        semana.id === data.id ? { ...data } : semana
      );
    } else {
      const nuevaSemana = {
        ...data,
        id: crypto.randomUUID()
      };
      this.semanas = [...this.semanas, nuevaSemana];
    }

    this.cerrarModalSemana();
  }
}