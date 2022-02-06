/* import 'reflect-metadata' */

import { ICreateUserDTO } from '@modules/accounts/dtos'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory'

import { AppError } from '@shared/errors/AppError'

import { AuthenticatedUserUseCase } from '.'
import { CreateUserUseCase } from '../createUser'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticatedUserUseCase: AuthenticatedUserUseCase

describe('Authenticated user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticatedUserUseCase = new AuthenticatedUserUseCase(
      usersRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'luccastest@gmail.com',
      password: '0%luZApapapa',
      name: 'Luccas Test',
    }

    await createUserUseCase.execute(user)

    const result = await authenticatedUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      const userWhoDoesNotExists = {
        email: 'lukinhasppt@nonexistent.com.br',
        password: '1D0n7Ex1$8',
      }

      await authenticatedUserUseCase.execute({
        email: userWhoDoesNotExists.email,
        password: userWhoDoesNotExists.password,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an user when your password is incorrect', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000123',
        email: 'silva.carlos@gmail.com',
        password: '123Rw!@',
        name: 'Luccas Test',
      }

      const incorrectPassword = '123123HiIMFake'

      await createUserUseCase.execute(user)

      await authenticatedUserUseCase.execute({
        email: user.email,
        password: incorrectPassword,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate an user when your email is incorrect', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '99999',
        email: 'luccasSPECHT@gmail.com',
        password: '0%luZApapapa',
        name: 'Luccas Juan',
      }

      const incorrectEmail = 'luccasHiImFakeemail.com.br'

      await createUserUseCase.execute(user)

      await authenticatedUserUseCase.execute({
        email: incorrectEmail,
        password: user.password,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
