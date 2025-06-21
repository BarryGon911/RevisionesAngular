import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListarDoctoresComponent } from './componentes/listar-doctores/listar-doctores.component';
import { AgregarDoctoresComponent } from './componentes/agregar-doctores/agregar-doctores.component';
import { ListarDoctores } from "./componentes/listar-doctores/listar-doctores.component";
import { AgregarDoctores } from "./componentes/agregar-doctores/agregar-doctores.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ListarDoctoresComponent, AgregarDoctoresComponent, ListarDoctores, AgregarDoctores],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})

export class AppComponent {
    title = "repasoAngular";
}
