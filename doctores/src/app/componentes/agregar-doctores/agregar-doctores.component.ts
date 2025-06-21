import { Component, Inject } from '@angular/core';
import { Personal } from '../../models/personal';
import { DoctoresService } from '../../doctores.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-doctores',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './agregar-doctores.component.html',
  styleUrl: './agregar-doctores.component.css',
  providers: [DoctoresService]
})

export class AgregarDoctoresComponent {

  mensajeExito: string = '';

  empleado: Personal = {
    id: 0,
    nombre: '',
    especialidad: '',
    antiguedad: 0,
    ciudad: '',
    telefono: '',
    foto: ''
  };

  constructor(@Inject(DoctoresService) private doctoresService: DoctoresService) { }

  esFemenino: boolean = false;

  asignarFotoAleatoria() {
    let genero;
    const id = Math.floor(Math.random() * 100);

    // Cambia el género según el valor de esFemenino
    if (this.esFemenino) {
      genero = "woman";
    }
    else {
      genero = "man";
    }
    this.empleado.foto = `https://randomuser.me/api/portraits/${genero}/${id}.jpg`;
  }

  guardar() {
    this.doctoresService.create(this.empleado);
    this.limpiar();
    console.log("Empleado guardado:", this.empleado);
    console.log("¿Es de sexo femenino?:", this.esFemenino);
  }

  limpiar() {
    this.empleado = {
      id: 0,
      nombre: '',
      especialidad: '',
      antiguedad: 0,
      ciudad: '',
      telefono: '',
      foto: ''
    };
    this.esFemenino = false;
    // Reiniciar el formulario
    // Mostrar mensaje de éxito
    this.mensajeExito = "Formulario enviado correctamente";
  }

  // Ocultar mensaje de éxito después de 3 segundos
  ocultarMensajeExito(): void {
    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }
}
