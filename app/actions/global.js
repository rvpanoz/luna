import {
  ADD_MESSAGE,
  CLEAR_MESSAGES
} from '../constants/ActionTypes';

export function addMessage(level, body) {
  return {
    type: ADD_MESSAGE,
    level,
    body
  }
}

export function clearMessages(messages) {
  return {
    type: CLEAR_MESSAGES,
    messages
  }
}
