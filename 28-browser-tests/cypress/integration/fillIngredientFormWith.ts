interface IngredientFormArgs {
  name: string;
  amount: string;
  unit: string;
}

const fillIngredientFormWith = (formId: string, {
  name,
  amount,
  unit
}: IngredientFormArgs): void => {
  cy.findByLabelText(formId).within((): void => {
    cy.findByLabelText('Zutat:').clear().type(name);
    cy.findByLabelText('Menge:').clear().type(amount);
    cy.findByLabelText('Mengeneinheit').select(unit);
  });
};

export {
  fillIngredientFormWith
};
