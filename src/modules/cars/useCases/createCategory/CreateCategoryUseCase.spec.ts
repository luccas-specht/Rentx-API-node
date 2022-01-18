/* eslint-disable prettier/prettier */

// agroup tests
describe('Examples', () => {
  // tests always are inside it()
  it('Espero que a soma de 2 + 2 seja 4', () => {
    const sum = 2 + 2
    const result =  4
    expect(sum).toBe(result)
  })
  it('Espero que 2 + 2 !== 5', () => {
    const sum = 2 + 2
    const result = 5

    expect(sum).not.toBe(result)
  })
})


describe('Create Category', ()  =>  {
  it('Should be able to create a new category', () => {

  })
})