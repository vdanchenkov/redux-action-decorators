export default (definition) => {
  if (definition === undefined) {
    return data => data;
  } else if (typeof definition === 'function') {
    return definition;
  } else {
    throw new Error('Unsupported payload creator definition');
  }
};