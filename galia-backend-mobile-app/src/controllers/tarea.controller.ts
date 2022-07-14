import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tarea} from '../models';
import {TareaRepository} from '../repositories';

export class TareaController {
  constructor(
    @repository(TareaRepository)
    public tareaRepository : TareaRepository,
  ) {}

  @post('/tareas')
  @response(200, {
    description: 'Tarea model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tarea)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarea, {
            title: 'NewTarea',
            exclude: ['id'],
          }),
        },
      },
    })
    tarea: Omit<Tarea, 'id'>,
  ): Promise<Tarea> {
    return this.tareaRepository.create(tarea);
  }

  @get('/tareas/count')
  @response(200, {
    description: 'Tarea model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tarea) where?: Where<Tarea>,
  ): Promise<Count> {
    return this.tareaRepository.count(where);
  }

  @get('/tareas')
  @response(200, {
    description: 'Array of Tarea model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tarea, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tarea) filter?: Filter<Tarea>,
  ): Promise<Tarea[]> {
    return this.tareaRepository.find(filter);
  }

  @patch('/tareas')
  @response(200, {
    description: 'Tarea PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarea, {partial: true}),
        },
      },
    })
    tarea: Tarea,
    @param.where(Tarea) where?: Where<Tarea>,
  ): Promise<Count> {
    return this.tareaRepository.updateAll(tarea, where);
  }

  @get('/tareas/{id}')
  @response(200, {
    description: 'Tarea model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tarea, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tarea, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarea>
  ): Promise<Tarea> {
    return this.tareaRepository.findById(id, filter);
  }

  @patch('/tareas/{id}')
  @response(204, {
    description: 'Tarea PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarea, {partial: true}),
        },
      },
    })
    tarea: Tarea,
  ): Promise<void> {
    await this.tareaRepository.updateById(id, tarea);
  }

  @put('/tareas/{id}')
  @response(204, {
    description: 'Tarea PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tarea: Tarea,
  ): Promise<void> {
    await this.tareaRepository.replaceById(id, tarea);
  }

  @del('/tareas/{id}')
  @response(204, {
    description: 'Tarea DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tareaRepository.deleteById(id);
  }
}
