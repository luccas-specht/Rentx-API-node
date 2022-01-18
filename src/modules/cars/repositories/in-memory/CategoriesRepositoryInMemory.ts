import { ICategoriesRepositoy } from '..'
import { Category } from '../../entities';
import { ICreateCategoryDTO } from '../interfaces';

export class CategoriesRepositoryInMemory implements ICategoriesRepositoy {
  list(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  create(data: ICreateCategoryDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  checkIfCategoryNameIsUnique(name: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}