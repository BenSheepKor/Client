import { logInWithEmailAndPassword, stubGetCourses } from '../functions'

describe('Course page', () => {
  it('displays a list of user courses', () => {
    logInWithEmailAndPassword()

    goToCoursesPageAndFindTwo()

    collapseCourseCardAndSeeSchedule()
  })
})

const goToCoursesPageAndFindTwo = () => {
  stubGetCourses()

  cy.get('[data-test="navbar"]')

  cy.get('[data-test="courses-tab-button"]').click()

  cy.get('[data-test="courses-header"]').contains('My Courses')

  cy.get('[data-test="courses-list"]')
    .children()
    .should('have.length', 2)
}

const collapseCourseCardAndSeeSchedule = () => {
  cy.get('[data-test="collapse-button"]')
    .first()
    .click()

  cy.get('[data-test="schedule-container"]')

  cy.get('[data-test="schedule-day"')
    .should('have.css', 'color')
    .and('equal', 'rgb(238, 150, 75)')
}
