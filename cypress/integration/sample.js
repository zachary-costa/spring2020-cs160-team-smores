describe('Hello', () => {
  it('World!', () => {
    expect(true).to.equal(true)
  })
})

describe('Visit Home Page', () => {
  it('Visits the main page', () => {
    cy.visit('http://localhost:8081/')
  })
})

describe('Load Login Page', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:8081/login')
  })
})

describe('Load Add Product Page', () => {
  it('Visits the add product page', () => {
    cy.visit('http://localhost:8081/product/add')
  })
})

describe('Load Products Page', () => {
  it('Visits the products page', () => {
    cy.visit('http://localhost:8081/product')
  })
})

describe('Load Add Storage Page', () => {
  it('Visits the add storage page', () => {
    cy.visit('http://localhost:8081/storage/add')
  })
})

describe('Load Storages Page', () => {
  it('Visits the storages page and checks if it contains certain items', () => {
    cy.visit('http://localhost:8081/storage')
	cy.contains('Storage List')
	cy.contains('Remove All')
	cy.contains('Choose a Storage')
	cy.contains('Add a new Storage').click()
	
	cy.url().should('include', '/storage/add')
  })
})

