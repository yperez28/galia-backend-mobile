import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {GaliaDataSource} from '../datasources';
import {Tarea, TareaRelations} from '../models';

export class TareaRepository extends DefaultCrudRepository<
  Tarea,
  typeof Tarea.prototype.id,
  TareaRelations
> {
  constructor(
    @inject('datasources.galia') dataSource: GaliaDataSource,
  ) {
    super(Tarea, dataSource);
  }
}
