import { Injectable } from '@angular/core';
import doctores from '../data/doctores.json';
import { Personal } from './models/personal';

@Injectable({
  providedIn: 'root'
})

export class DoctoresService {// Este servicio maneja los datos de los doctores

  empleados: Personal[] = doctores;

  constructor() { }

  ngOnInit(): void { }

  getAll(): Personal[] {  // El metodo retora un arreglo del tipo de la interface Personal

    const recuperaDatos: Personal[] = JSON.parse(localStorage.getItem('trabajadores') ?? '[]');

    if (recuperaDatos.length === 0) {
      this.empleados = doctores; // Si no hay datos en localStorage, se asigna el arreglo inicial de doctores
    }
    else {
      this.empleados = recuperaDatos;
    }
    return this.empleados;
  }

  /*
  Recibimos el id del empleado a consultar, vamos a retornar un objeto del tipo de la interface Personal con los datos de ese empleado o en su defecto un null porque ese id NO existe.
  */
  /*
  La constante encontrado guarda el objeto con los datos del empleado siempre y cuando este en el arreglo.
  La funcion find busca el primer elemento del arreglo this.empleados que cumpla con la condición: emp.id === idEmp y lo retorna si no lo encuentra devuelve como undefined.
  */
  getById(idEmp: number): Personal | null {
    const encontrado = this.empleados.find(emp => emp.id === idEmp);

    return encontrado || null;  //Si encontrado tiene los datos del objeto lo retorna; SI NO, retorna null
  } // Fin del método getById

  delete(idEmp: number): void {
    /*
    La funcion findIndex busca el id del empleado en el arreglo si lo encuentra devuelve la posicion que ocupa ese empleado en el arreglo si no lo encuetra devuelve un -1, ese valor es almacenado en la constante index
    */
    const index = this.empleados.findIndex(emp => emp.id === idEmp);
    if (index !== -1) {
      this.empleados.splice(index, 1); // Elimina el objeto del arreglo
      /*
      Actualiza el localStorage, setItem, almacena el arreglo this.empleados en el localstorage con el nombre de trabajadores, antes de grabar en localStorage con JSON.stringify cambia el formato del arreglo de javascript a formato texto.
      */
      localStorage.setItem('trabajadores', JSON.stringify(this.empleados));
    }
  }  // Fin del método delete

  /*
  Create es un método que agrega los datos de un nuevo empleado al arreglo de empleados y actualiza el localstorage
  */
  create(objeto: Personal): void {
    this.empleados.push(objeto);
    /*
    Push agrega al arreglo de empleados, el objeto con los datos del empleado que llego como parametro
    */
    /*
    setItem guarda el arreglo actualizado en el localstorage, con el nombre trabajadores
    */
    localStorage.setItem('trabajadores', JSON.stringify(this.empleados)); // Guarda en localStorage
  }// Fin del método create

  /*
  update es un metodo que actualiza los datos de un   empleado en el arreglo de empleados y actualiza el localStorage
  */
  update(objeto: Personal): void {
    /*
    findIndex busca si el id del objeto que llega como parametro se encuentra en el arreglo de empleados, de ser asi, guarda la posicion de ese empleado en el arreglo en la constante index, sino esta el id entonces en index se almacena un -1
    */
    const index = this.empleados.findIndex(emp => emp.id === objeto.id);
    if (index !== -1) { // Si index es diferente de -1 entonces procede la actualizacion de datos

      this.empleados[index] = objeto; // Actualiza arreglo de empleados en la posicion index con los datos del objeto que llego como parametro

      // setItem guarda el arreglo actualizado en el localstorage, con el nombre trabajadores
      localStorage.setItem('trabajadores', JSON.stringify(this.empleados)); // Guarda en localStorage
    }// Fin del if

  }//fin update
}// Fin del servicio DoctoresService
