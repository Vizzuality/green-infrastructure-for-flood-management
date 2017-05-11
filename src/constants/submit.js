const defaultValues = {
  name: '',
  locations: [],
  scale: '',
  start_year: '',
  completion_year: '',
  organizations: [],
  donors: [],
  primary_benefits_of_interventions: [],
  co_benefits_of_interventions: [],
  nature_based_solutions: [],
  hazard_types: [],
  estimated_cost: '',
  currency_estimated_cost: '',
  estimated_monetary_benefits: '',
  currency_monetary_benefits: '',
  intervention_type: '',
  implementation_status: '',
  benefit_details: '',
  summary: '',
  learn_more: '',
  references: '',
  contributor_name: '',
  contributor_organization: '',
  contact_info: '',
  permission: '',
  new_nature_based_solutions: [],
  new_primary_benefits_of_interventions: [],
  new_co_benefits_of_interventions: []
};

const requiredFields = [
  'name',
  'organizations',
  'locations',
  'scale',
  'start_year',
  'implementation_status',
  'hazard_types',
  'intervention_type',
  'nature_based_solutions',
  'primary_benefits_of_interventions',
  'summary',
  'learn_more',
  'contributor_name',
  'contributor_organization',
  'contact_info',
  'permission'
];

const infoTexts = {
  organizations: 'Provide the main organization(s) involved in the project, excluding donors.',
  donors: 'Provide the main donor organization(s).',
  intervention_type: 'Green: Measures that consist of ecosystems that are naturally present in the area or that can be restored or recreated if they are degraded or have disappeared. Hybrid: Measures that utilize a combination of both green measures and man-made infrastructure measures to simultaneously establish immediate risk reduction while maintaining the valuable role of the relevant ecosystem.',
  nature_based_solutions: 'Ecosystems are central to nature-based solutions. Indicate the ecosystem(s) your project conserved, restored or created.',
  primary_benefits_of_interventions: 'Indicate the primary hazard mitigation benefits of the intervention.',
  co_benefits_of_interventions: 'Indicate the social, environmental, and economic co-benefits.',
  benefit_details: 'If available, provide any additional information relevant to the project’s monetary benefits.',
  summary: 'Provide a short description of the project’s activities and results. Word limit: 125 words.',
  references: 'Provide additional sources and relevant URL links, if applicable.'
};

const currencyOptions = [{ label: 'EUR', value: 'eur' }, { label: 'USD', value: 'usd' }];
const permissionOptions = [{ label: 'Name', value: 'name' },
  { label: 'Organization', value: 'organization' },
  { label: 'Neither (no recognition on the project page)', value: 'none' }];

const yearsOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 50;
  const endYear = currentYear + 50;
  const years = [];

  for (let i = startYear; i <= endYear; i++) {
    years.push({
      label: i,
      value: i
    });
  }
  return years;
};

export { defaultValues, requiredFields, infoTexts, currencyOptions, permissionOptions, yearsOptions };
