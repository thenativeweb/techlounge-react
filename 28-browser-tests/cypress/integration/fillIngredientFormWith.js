const fillIngredientFormWith = (formId, {
  name,
  amount,
  unit
}) => {
  cy.findByLabelText(formId).within(() => {
    cy.findByLabelText('Zutat:').clear().type(name);
    cy.findByLabelText('Menge:').clear().type(amount);
    cy.findByLabelText('Mengeneinheit').select(unit);
  });
};

module.exports = { fillIngredientFormWith };
