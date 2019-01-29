export const COMPLETE_TASK = 'COMPLETE_TASK'
export const RECEIVE_LOGS = 'RECEIVE_LOGS'

export function completeTask ({ date, completed }) {
  return {
    type: COMPLETE_TASK,
    date,
    completed
  }
}

export function receiveLogs (logs) {
  return {
    type: RECEIVE_LOGS,
    logs
  }
}
