import {Entity, model, property} from '@loopback/repository';

@model()
export class Tarea extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  paciente: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaLimite: string;

  @property({
    type: 'string',
    required: true,
  })
  prioridad: string;

  @property({
    type: 'string',
    required: true,
  })
  modo: string;

  @property({
    type: 'string',
    required: true,
  })
  asignado: string;


  constructor(data?: Partial<Tarea>) {
    super(data);
  }
}

export interface TareaRelations {
  // describe navigational properties here
}

export type TareaWithRelations = Tarea & TareaRelations;
