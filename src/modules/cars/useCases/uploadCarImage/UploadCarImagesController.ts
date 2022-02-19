import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImagesUseCase } from './UploadCarImageUseCase'

interface IFiles {
  filename: string
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const images = request.files as IFiles[]
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)

    const fileNames = images.map(({ filename }) => filename)

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name: fileNames,
    })

    return response.status(201).send()
  }
}
