import csvParse from 'csv-parse'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import { ICategoriesRepositoy } from '../../repositories'

interface IImportCategory {
  name: string
  description: string
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepositoy
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []
      const stream = fs.createReadStream(file.path)
      const parseFile = csvParse()
      stream.pipe(parseFile)

      parseFile
        .on('data', async ([name, description]) => {
          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          resolve(categories)
          fs.promises.unlink(file.path)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async insertCategoryIntoDatabase({
    name,
    description,
  }: IImportCategory): Promise<void> {
    const categoryNameAlreadyExists =
      await this.categoriesRepository.checkIfCategoryNameIsUnique(name)

    if (!categoryNameAlreadyExists) {
      await this.categoriesRepository.create({
        name,
        description,
      })
    }
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.forEach(async ({ name, description }) => {
      await this.insertCategoryIntoDatabase({ name, description })
    })
  }
}
