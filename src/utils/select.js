function setNameOption(arr) {
  return arr.map(c => ({ value: c, label: c }));
}

function setIdOption(arr) {
  return arr.map(c => (
    {
      label: c[Object.keys(c)[0]].name || c[Object.keys(c)[0]].adm0_name,
      value: c[Object.keys(c)[0]].iso || `${c[Object.keys(c)[0]].id}`
    }
  ));
}

function setFiltersOptions(options) {
  const arrayItems = ['currencies', 'co_benefits', 'hazard_types', 'nature_based_solutions',
    'primary_benefits', 'organizations', 'countries', 'donors'];
  const keys = Object.keys(options);
  const result = {};

  for (let i = 0; i < keys.length; i++) {
    const item = options[keys[i]];

    if (item instanceof Array) {
      if (arrayItems.indexOf(keys[i]) === -1) {
        result[keys[i]] = setNameOption(item);
      } else if (keys[i] === 'currencies') {
        result[keys[i]] = setIdOption(item.map(c => (
          { currency: { ...c.currency, name: `${c.currency.name} (${c.currency.iso})` } }
        )));
      } else {
        result[keys[i]] = setIdOption(item);
      }

      // Moving other to the first option
      const itemsResult = result[keys[i]]
        .sort((x, y) => x.label === 'other' ? -1 : y.label === 'other' ? 1 : 0)
        .map((t) => t.label === 'other' ? { ...t, alias: `Add a new ${keys[i].slice(0, -1)} if you didn't find it in the selector` } : t);
      result[keys[i]] = itemsResult;
    }
  }

  const parsedOptions = Object.assign({}, result, {
    cost_max: options.cost_max,
    cost_min: options.cost_min
  });

  return parsedOptions;
}

export { setNameOption, setIdOption, setFiltersOptions };
