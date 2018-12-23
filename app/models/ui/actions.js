import { createActionCreator } from '../../commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/UI');

const setManager = ActionCreator('SET_MANAGER');
const setMode = ActionCreator('SET_MODE');
const setPage = ActionCreator('SET_PAGE');
const setPageRows = ActionCreator('SET_PAGE_ROWS');

export { setManager, setMode, setPage, setPageRows };
