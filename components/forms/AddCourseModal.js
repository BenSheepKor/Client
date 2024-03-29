import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default class AddCourseModal extends Component {
  constructor(props) {
    super(props)

    // use this inside callbacks
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }

  validate = ({ courseName }) => {
    const errors = {}
    if (!courseName) {
      errors.courseName = 'Required'
    }

    return errors
  }

  handleOnSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    const { courseName } = values
    this.props.onAddCourse(courseName)
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  // Check that target clicked is outside modal
  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.onClickOutside()
    }
  }

  render() {
    return (
      <div
        data-test="add-course-modal"
        className="modal flex justify-center items-center"
      >
        <div
          className="w-11/12 md:w-3/5 xl:w-2/5 bg-white pt-4"
          ref={this.setWrapperRef}
        >
          <Formik
            initialValues={{ courseName: '' }}
            validate={this.validate}
            onSubmit={this.handleOnSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="h-full md:h-auto w-full text-center pt-12 pb-16 flex flex-wrap align-middle items-center">
                <Field
                  className="flex flex-row mx-auto w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver focus:border-blue text-darkgray outline-none pl-4 text-xl"
                  type="text"
                  name="courseName"
                  placeholder="Course name"
                  data-test="course-name-input"
                />
                <ErrorMessage
                  name="courseName"
                  component="div"
                  className="w-4/5 mx-auto text-left text-red pl-1"
                  data-test="error-message"
                />
                <button
                  className="flex flex-row mx-auto mt-12 md:py-6 w-4/5 justify-center text-xl text-white uppercase orange-gradient"
                  data-test="submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding course...' : 'Add course'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}
