const report = (state = {cols: null, rows: null}, action) => {
  switch (action.type) {
    case 'SET_REPORT':
      return {...action.report};
    default:
      return state;
  }
}

export default report;