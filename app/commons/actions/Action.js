/**
 *
 * @param {*} namespace
 */

const Action = namespace => actionType => {
  const type = `${namespace}/${actionType}`;
  const actionCreator = payload => ({
    type,
    payload
  });
  actionCreator.type = type;

  Object.freeze(actionCreator);

  return actionCreator;
};

export default Action;
