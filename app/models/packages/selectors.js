import {
  addActionError,
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  setActive,
  setSortOptions
} from './actions';

const onClearSelected = dispatch => dispatch(clearSelected());
const onClearPackages = dispatch => dispatch(clearPackages());
const onStartPackages = dispatch => dispatch(setPackagesStart());

const onAddActionError = (dispatch, { error }) =>
  dispatch(addActionError(error));
const onAddSelected = (dispatch, { name }) => dispatch(addSelected({ name }));

const onSetPackagesSuccess = (
  dispatch,
  { projectName, projectVersion, dependencies, fromSearch, fromSort, outdated }
) =>
  dispatch(
    setPackagesSuccess({
      projectName,
      projectVersion,
      dependencies,
      fromSearch,
      fromSort,
      outdated
    })
  );

const onSetOutdatedSuccess = (dispatch, { dependencies }) =>
  dispatch(
    setPackagesOutdatedSuccess({
      dependencies
    })
  );

const onAddFilter = (dispatch, { filter }) => dispatch(addFilter({ filter }));
const onClearFilters = dispatch => dispatch(clearFilters());
const onSetActive = (dispatch, { active }) => dispatch(setActive({ active }));
const onSetSortOptions = (dispatch, { sortDir, sortBy }) =>
  dispatch(
    setSortOptions({
      sortBy,
      sortDir
    })
  );

export {
  onAddActionError,
  onAddSelected,
  onAddFilter,
  onClearFilters,
  onClearPackages,
  onClearSelected,
  onSetActive,
  onSetSortOptions,
  onStartPackages,
  onSetPackagesSuccess,
  onSetOutdatedSuccess
};
