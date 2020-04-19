describe('First Test: Visit all the pages', () => {
  it('Visits website and checks and makes sure they are the correct pages', () => {
    cy.visit('localhost:8081/login')
    cy.contains('Login or Create an Account')

    cy.contains('Products').click()
    cy.url().should('include', '/product')
    cy.contains('Product List')

    cy.contains('Add a new Product').click()
    cy.url().should('include', '/product/add')
    cy.contains('Name')
    cy.contains('Size')

    cy.contains('Storages').click()
    cy.url().should('include', '/storage')
    cy.contains('Storage List')

    cy.contains('Add a new Storage').click()
    cy.url().should('include', '/storage/add')
    cy.contains('Title')
    cy.contains('Description')


})})
describe('Second Test: Add Products', () => {
it('Goes to another page and adds a new product and checks if it was indeed added', () => {
    cy.contains('Add a new Product').click()

    cy.url().should('include', '/product/add')

    cy.get('input[id="name"]')
      .type('Cantaloupe')
      .should('have.value', 'Cantaloupe')

      cy.get('input[id="size"]')
        .clear()
        .type('5')
        .should('have.value', '5')

      cy.contains('Submit').click()

      cy.contains("Successfully Submitted")

      cy.contains("Add Another Product").click()

      cy.contains('Product').click()

      cy.contains('Product List')
      cy.contains('Cantaloupe').click()
      cy.contains('Name: Cantaloupe')
      cy.contains('Size: 5')


  })
it('Adds many products to the product list', () => {
  cy.visit('localhost:8081/product/add')
  cy.get('input[id="name"]')
    .type('abcdefghijklmnopqrstuvwxyz')
    .should('have.value', 'abcdefghijklmnopqrstuvwxyz')
  cy.get('input[id="size"]')
    .clear()
    .type('-5')
    .should('have.value', '-5')
  cy.contains('Submit').click()
  cy.contains("Successfully Submitted")
  cy.contains("Add Another Product").click()

  cy.get('input[id="name"]')
    .type('12345abc')
    .should('have.value', '12345abc')
  cy.get('input[id="size"]')
    .clear()
    .type('4.3')
    .should('have.value', '4.3')
  cy.contains('Submit').click()
  cy.contains("Successfully Submitted")
  cy.contains("Add Another Product").click()

  cy.get('input[id="name"]')
    .type('(_/*-.)')
    .should('have.value', '(_/*-.)')
  cy.get('input[id="size"]')
    .clear()
    .type('0')
    .should('have.value', '0')
  cy.contains('Submit').click()
  cy.contains("Successfully Submitted")
  cy.contains("Add Another Product").click()

  cy.get('input[id="name"]')
    .type(' ')
    .should('have.value', ' ')
  cy.get('input[id="size"]')
    .clear()
    .type('-3')
    .should('have.value', '-3')
  cy.contains('Submit').click()
  cy.contains("Successfully Submitted")
  cy.contains("Add Another Product").click()

  cy.get('input[id="name"]')
    .type('very long text string name that can be inputted to test that this accepts long inputs and does not give an error even though there would never likely be a product with a name of this length. However our website could be exploited due to a long name length so this is why it is important for this to be tested')
    .should('have.value', 'very long text string name that can be inputted to test that this accepts long inputs and does not give an error even though there would never likely be a product with a name of this length. However our website could be exploited due to a long name length so this is why it is important for this to be tested')
  cy.get('input[id="size"]')
    .clear()
    .type('100000000000000000000000000000000000000000000000000000')
    .should('have.value', '100000000000000000000000000000000000000000000000000000')
  cy.contains('Submit').click()
  cy.contains("Successfully Submitted")
  cy.contains("Add Another Product").click()


})
it('Checks the product list for these added products', () => {
  cy.contains("Products").click()

        cy.contains('Product List')
        cy.contains('Cantaloupe').click()
        cy.contains('Name: Cantaloupe')
        cy.contains('Size: 5')

        cy.contains('abcdefghijklmnopqrstuvwxyz').click()
        cy.contains('Name: abcdefghijklmnopqrstuvwxyz')
        cy.contains('Size: -5')
        //Website uses int for size so 4.3 converts to 4.
        cy.contains('12345abc').click()
        cy.contains('Name: 12345abc')
        cy.contains('Size: 4')

        cy.contains('(_/*-.)').click()
        cy.contains('Name: (_/*-.)')
        cy.contains('Size: 0')

})
it('Edit Product', () => {
  cy.contains("Products").click()
  cy.contains('Cantaloupe').click()
  cy.contains('Edit').click()
  cy.get('input[id="name"]')
    .clear()
    .type('Big Cantaloupe')
    .should('have.value', 'Big Cantaloupe')
  cy.get('input[id="size"]')
    .clear()
    .type('10')
    .should('have.value', '10')
  cy.contains("Update").click()
  cy.contains("Successfully updated Product")
  cy.contains("Products").click()
  cy.contains('Big Cantaloupe').click()
  cy.contains('Name: Big Cantaloupe')
  cy.contains('Size: 10')

})
})
describe('Third Test: Add Storages', () => {
  it('Create a Storage', () => {
    cy.contains("Add a new Storage").click()
    cy.get('input[id="title"]')
      .type('Fridge')
      .should('have.value', 'Fridge')
    cy.get('input[id="description"]')
      .type('Main Fridge in the Kitchen')
      .should('have.value', 'Main Fridge in the Kitchen')
    cy.contains('+').click()
    cy.get('select').eq(0).select('Big Cantaloupe')
    cy.contains('+').click()
    cy.get('select').eq(1).select('(_/*-.)')
    cy.contains('+').click()
    cy.get('select').eq(2).select('abcdefghijklmnopqrstuvwxyz')

    cy.contains("Submit").click()

    cy.contains("Successfully Submitted")

  })
it('Check if storage was created', () => {
  cy.contains("Storages").click()
  cy.contains("Storage List")
  cy.contains("Fridge").click()
  cy.contains('Title: Fridge')
  cy.contains('Description: Main Fridge in the Kitchen')
  cy.contains('Big Cantaloupe')
  cy.contains('(_/*-.)')
  cy.contains('abcdefghijklmnopqrstuvwxyz')
})
it('Edit and Publish Storage', () => {
  cy.contains('Edit').click()
  cy.contains('+').click()
  cy.get('select').eq(0).select('Big Cantaloupe')
  cy.contains('+').click()
  cy.get('select').eq(1).select('(_/*-.)')
  cy.contains('+').click()
  cy.get('select').eq(2).select('abcdefghijklmnopqrstuvwxyz')
  cy.contains('+').click()
  cy.get('select').eq(3).select('12345abc')

  cy.contains('Publish').click()
  cy.contains('Update').click()
  cy.contains('Successfully')
  cy.contains('Storages').click()
  cy.contains('Fridge').click()
  cy.contains('Published')
})
})

describe('Final Test: Remove Everything', () => {
it('Remove Products', () => {
  cy.contains("Products").click()
  cy.contains("Remove All").click()
})
it('Remove Storages', () => {
  cy.contains("Storages").click()
  cy.contains("Remove All").click()
})

})
