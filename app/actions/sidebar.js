import {
  SET_SIDEBAR_CONTENT
} from '../constants/ActionTypes';

export function setActiveSidebarContent(active) {
  return {
    type: SET_SIDEBAR_CONTENT,
    active
  }
}
