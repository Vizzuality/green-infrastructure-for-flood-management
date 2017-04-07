function setNameOption(arr) {
  return arr.map(c => {return { value: c, label: c };});
}

function setIdOption(arr) {
  return arr.map(c => {
    return {
      label: c[Object.keys(c)[0]].name || c[Object.keys(c)[0]].adm0_name,
      value: `${c[Object.keys(c)[0]].id}`
    };
  });
}

function setFiltersOptions(options) {
  const arrayItems = ['co_benefits', 'hazard_types', 'nature_based_solutions', 'primary_benefits', 'organizations', 'countries'];
  const keys = Object.keys(options);
  let result = {};

  for (let i = 0; i < keys.length; i++) {
    const item = options[keys[i]];

    if (item instanceof Array) {
      if (arrayItems.indexOf(keys[i]) === -1) {
        result[keys[i]] = setNameOption(item);
      } else {
        result[keys[i]] = setIdOption(item);
      }
    }
  }

  const parsedOptions = Object.assign({}, result, {
    cost_max: options.cost_max,
    cost_min: options.cost_min
  });

  return parsedOptions;
}

export { setNameOption, setIdOption, setFiltersOptions };