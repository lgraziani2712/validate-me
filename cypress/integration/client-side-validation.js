/// <reference types="Cypress" />

describe('Vue plugin', () => {
  describe('Client-side validation', () => {
    it('Fails when obligatory fields exist and are empty', () => {
      cy.visit('/');
      cy.get('[data-cy=submit-button]').click();
      cy.get('[style="color: red;"]').should($elem => {
        expect($elem).to.contain('El campo es requerido.');
      });
    });

    it("Doesn't trigger submit event if native validations fail", () => {
      const onSubmitStub = cy.stub();

      cy.visit('/');
      cy.get('[data-cy=form]').should($elem => {
        $elem.on('submit', onSubmitStub);
      });
      cy.get('[data-cy=submit-button]').click();

      expect(onSubmitStub).to.not.been.called;
    });

    it('Fails if the submit event processes an invalid state', () => {
      cy.visit('/');
      cy.get('[data-cy=form]')
        .submit()
        .then(() => {
          cy.get('[data-cy=submit-button]').should($elem => {
            expect($elem.attr('disabled')).to.be.equal('disabled');
          });
        });
    });
  });
});
