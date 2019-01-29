import { COMPLETE_TASK, RECEIVE_LOGS } from '../actions/dailyTask'

function dailyTask (state = {}, action) {
  switch (action.type) {
    case RECEIVE_LOGS:
      return {
        ...state,
        ...action.logs
      }
    case COMPLETE_TASK:
      return {
        ...state,
        [action.date]: action.completed
      }
    default:
      return state
  }
}

export default dailyTask
