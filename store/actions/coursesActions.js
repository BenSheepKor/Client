import Router from 'next/router'
import api from '../api'

export const STORE_COURSES = 'STORE_COURSES'
export const STORE_COURSE_DETAILS = 'STORE_COURSE_DETAILS'

export const ADD_COURSE = 'ADD_COURSE'

export const REMOVE_COURSE_DETAILS = 'REMOVE_COURSE_DETAILS'

export const getCourses = token => dispatch => {
  if (token) {
    const query = `query{
        myCourses {
            name,
            schedule {
                day,
                start,
                end,
            },
            semester,
            grade
        }
    }`
    const options = createHeaders(token)
    return api.post('', { query }, options).then(res => {
      if (!res.data.errors) {
        const courses = res.data.data.myCourses

        dispatch({
          type: STORE_COURSES,
          courses,
        })
      }
    })
  }
  redirectToLogin()
}

export const getCourseByName = (token, name) => dispatch => {
  if (token) {
    if (name) {
      const query = `query{
        course(name: "${name}"){
            name,
            schedule{
                day,
                start,
                end
            },
            semester,
            grade,
            professor
        }
    }`

      const options = createHeaders(token)
      return api.post('', { query }, options).then(res => {
        if (!res.data.errors) {
          const course = res.data.data.course

          dispatch({
            type: STORE_COURSE_DETAILS,
            course,
          })
        }
      })
    }
    throw new Error('No name provided')
  }
  redirectToLogin()
}

export const addCourse = (token, courseName) => dispatch => {
  if (token) {
    if (courseName) {
      const query = `mutationn{
        addCourse(name: "${courseName}"){
          name
        }
      }`
      const options = createHeaders(token)
      return api.post('', { query }, options).then(res => {
        if (!res.data.errors) {
          const course = res.data.data.addCourse

          dispatch({
            type: ADD_COURSE,
            course,
          })
        }
      })
    }
    throw new Error('No course name provided')
  }
  throw new Error('No token provided')
}

export const deleteDetailedCourse = course => {
  if (course) {
    return {
      type: REMOVE_COURSE_DETAILS,
      course,
    }
  }
  throw new Error('No course provided')
}

const createHeaders = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const redirectToLogin = () => {
  Router.replace('/login')
}
