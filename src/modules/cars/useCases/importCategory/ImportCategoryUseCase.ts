import csvParse from 'csv-parse'
import fs from 'fs'

import { ICategoriesRepositoy } from '../../repositories'

interface IImportCategory {
  name: string
  description: string
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepositoy) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []

      const stream = fs.createReadStream(file.path)
      const parseFile = csvParse()

      // temos o arquivo em stream, após isso nós vamos utilizar o pipe para que a cada chunk lido,
      // o pipe possa enviar esse chunk "pedaço" para o lugar determinado
      stream.pipe(parseFile)

      parseFile
        .on('data', async ([name, description]) => {
          // estrutura de dado: ["name", "description"]
          // -> exemplo: "SUV", "Grande e confortavel para total a familia"
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

  insertCategoryIntoDatabase({ name, description }: IImportCategory): void {
    const categoryNameAlreadyExists =
      this.categoriesRepository.checkIfCategoryNameIsUnique(name)

    if (!categoryNameAlreadyExists) {
      this.categoriesRepository.create({
        name,
        description,
      })
    }
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.forEach(({ name, description }) =>
      this.insertCategoryIntoDatabase({ name, description })
    )
  }
}
