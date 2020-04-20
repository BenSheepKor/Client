import { STORE_COURSES } from '~/store/actions/coursesActions'
const initialState = []

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_COURSES: {
      const { courses } = action

      return courses
    }
    default:
      return state
  }
}