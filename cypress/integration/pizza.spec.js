describe('Pizza App', () => {
    // Start with a fresh state
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza');
    })
    // I could not run the tests because of an an error that is permanently in my console.
    const textInput = () => cy.get('input[name=name]');
    const size = () => cy.get('select[name=size]');
    const pepperoni= () => cy.get('input[name=pepperoni]')
    const ham = () => cy.get('input[name=ham]')
    const veggies = () => cy.get('input[name=veggies]')
    const mushroom = () => cy.get('input[name=mushroom]')
    const submit = () => cy.get('button[id=order-button]')

    it('can type in the inputs', () => {
        textInput()
            .should('have.value', '')
            .type('HelloYou')
            .should('have.value', 'HelloYou')

        size()
            .should('have.value', 'Select a Size')
            .select('Small')
            .should('have.value', 'Small')
    })
    
})