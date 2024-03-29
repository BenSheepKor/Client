import {
  USER_EMAIL,
  USER_PASSWORD,
  BAD_PASSWORD,
  TAKEN_EMAIL,
} from '../messages'

import { stubDuplicateEmail, stubSuccessfulSignup } from '../functions'

describe('Sign up', () => {
  it("fails registering a user until it doesn't", () => {
    cy.visit('localhost:3000')

    cy.get('[data-test="sign-up-button"]').click()

    tryBadPassword()

    stubDuplicateEmail()
    tryTakenEmail()

    stubSuccessfulSignup(USER_EMAIL)
    signUp()

    cy.get('[data-test="navbar"]')
  })
})

const tryBadPassword = () => {
  cy.get('[data-test="email-input"]')
    .focus()
    .clear()
    .type(USER_EMAIL)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(BAD_PASSWORD)

  cy.get('[data-test="submit"]').click()

  cy.get('[data-test="error-message"]').contains('Password must have at least')
}

const tryTakenEmail = () => {
  cy.get('[data-test="email-input"]')
    .focus()
    .clear()
    .type(TAKEN_EMAIL)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(USER_PASSWORD)

  cy.get('[data-test="submit"]').click()

  cy.get('[data-test="error-message"]').contains('This email is already')
}

const signUp = () => {
  cy.get('[data-test="email-input"]')
    .focus()
    .clear()
    .type(USER_EMAIL)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(USER_PASSWORD)

  cy.get('[data-test="submit"]').click()
}
