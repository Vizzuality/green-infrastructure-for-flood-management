import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Row } from 'components/ui/Grid';
import { SvgIcon } from 'vizz-components';
import BtnGroup from 'components/ui/BtnGroup';
import RadioGroup from 'components/ui/RadioGroup';
import InputMap from 'components/ui/InputMap';


const defaultValues = {
  name: '',
  location: '',
  scale: '',
  organizations: [],
  primary_benefits: [],
  co_benefits: [],
  nature_based_solutions: [],
  hazard_types: [],
  estimated_cost: '',
  monetary_benefits: '',
  intervention_types: [],
  implementation_statuses: '',
  currency: '',
  benefit_details: '',
  summary: '',
  references_typo: ''
};

export default class SubmitPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: Object.assign({}, defaultValues),
      requiredOn: [],
      mapSearch: '',
      locationLabel: false
    };

    // BINDINGS
    this.onAddLocation = this.onAddLocation.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.getFiltersOptions();
  }

  clear() {
    const inputs = [this.name, this.estimated_cost, this.monetary_benefits,
      this.benefit_details, this.summary, this.references_typo];
    inputs.forEach(inp => inp.value = '');

    this.setState({ fields: Object.assign({}, defaultValues) });
  }

  submit() {
    const { name, intervention_types, implementation_statuses } = this.state.fields;
    const requiredOn = [];

    name === '' && requiredOn.push('name');
    !intervention_types.length && requiredOn.push('intervention_types');
    !implementation_statuses.length && requiredOn.push('implementation_statuses');

    this.setState({ requiredOn });
  }

  isRequiredOn(name) {
    return this.state.requiredOn.includes(name) ? 'required-error' : '';
  }

  onAddLocation(latLng) {
    latLng && this.setFieldValue('location', [latLng.lat(), latLng.lng()])
  }

  setFieldValue(key, value) {
    const newFields = Object.assign({}, this.state.fields);
    newFields[key] = value;
    this.setState({ fields: newFields });
  }

  render() {
    const currencyOptions = [{ label: 'EUR', value: 'eur' }, { label: 'USD', value: 'usd' }];
    const { filtersOptions } = this.props;
    const { scale, organizations, primary_benefits, co_benefits, nature_based_solutions,
      hazard_types, intervention_types, currency, implementation_statuses, location } = this.state.fields;

    return (
      <div className="c-submit">
        <section className="submit-section">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12 medium-8 medium-offset-2">
                <h1 className="h1 -line">Sumbit your project</h1>
                <p className="text">Contribute your nature-based project and experiences to The Nature of Risk Reduction database, and join a growing community of practitioners, scientists and donors who are using nature-based approaches to reduce disaster risk.</p>
              </div>
            </Row>

            <Row>
              <div className="c-form column small-12 medium-8 medium-offset-2">

                {/* Name */}
                <div className={`form-field ${this.isRequiredOn('name')} -primary`}>
                  <h2 className="label">Name</h2>
                  <input
                    ref={n => this.name = n}
                    name="name"
                    type="text"
                    onBlur={e => this.setFieldValue('name', e.currentTarget.value)}
                  />
                </div>

                <div className="form-field">
                  <h2 className="label">Location</h2>
                  <span className={!this.state.locationLabel ? '-hidden' : ''}>{`${location[0]}, ${location[1]}`}</span>
                  <InputMap
                    inputProps={{ name: 'location' }}
                    onAddLocation={this.onAddLocation}
                  />
                </div>

                {/* Scale */}
                <div className="form-field">
                  <h2 className="label">Scale</h2>
                  <RadioGroup
                    name="scale"
                    options={filtersOptions.scales || []}
                    selected={filtersOptions.scales && filtersOptions.scales.find(imp => imp.value === scale)}
                    onChange={value => this.setFieldValue('scale', value)}
                  />
                </div>

                {/* Organizations */}
                <div className="form-field">
                  <h2 className="label">Organizations</h2>
                  <Select
                    name="field"
                    multi
                    options={filtersOptions.organizations}
                    value={filtersOptions.organizations ? filtersOptions.organizations.filter(opt => organizations.includes(opt.value)) : []}
                    onChange={opts => this.setFieldValue('organizations', opts.map(o => o.value))}
                  />
                </div>

                {/* Primary benefits */}
                <div className="form-field">
                  <h2 className="label">Risk reduction benefits</h2>
                  <Select
                    name="field"
                    multi
                    options={filtersOptions.primary_benefits}
                    value={filtersOptions.primary_benefits ? filtersOptions.primary_benefits.filter(opt => primary_benefits.includes(opt.value)) : []}
                    onChange={opts => this.setFieldValue('primary_benefits', opts.map(o => o.value))}
                  />
                </div>

                {/* Co benefits of interventions */}
                <div className="form-field">
                  <h2 className="label">Co benefits of interventions</h2>
                  <Select
                    name="field"
                    multi
                    options={filtersOptions.co_benefits}
                    value={filtersOptions.co_benefits ? filtersOptions.co_benefits.filter(opt => co_benefits.includes(opt.value)) : []}
                    onChange={opts => this.setFieldValue('co_benefits', opts.map(o => o.value))}
                  />
                </div>

                {/* Nature-based solutions */}
                <div className="form-field">
                  <h2 className="label">Nature-based solutions</h2>
                  <Select
                    name="field"
                    multi
                    options={filtersOptions.nature_based_solutions}
                    value={filtersOptions.nature_based_solutions ? filtersOptions.nature_based_solutions.filter(opt => nature_based_solutions.includes(opt.value)) : []}
                    onChange={opts => this.setFieldValue('nature_based_solutions', opts.map(o => o.value))}
                  />
                </div>

                {/* Hazard */}
                <div className="form-field">
                  <h2 className="label">Hazard</h2>
                  <Select
                    name="field"
                    multi
                    options={filtersOptions.hazard_types}
                    value={filtersOptions.hazard_types ? filtersOptions.hazard_types.filter(opt => hazard_types.includes(opt.value)) : []}
                    onChange={opts => this.setFieldValue('hazard_types', opts.map(o => o.value))}
                  />
                </div>

                {/* Donors */}
                {/* <div className="form-field">
                  <h2 className="label">Donors</h2>
                  <Select
                    name="field"
                    multi
                    options={filtersOptions.hazard_types}
                    value={filtersOptions.hazard_types ? filtersOptions.hazard_types.filter(opt => hazard_types.includes(opt.value)) : []}
                    onChange={opts => this.setState({ hazard_types: opts.map(o => o.value) })}
                  />
                </div> */}

                {/* Costs */}
                <div className="form-field costs">
                  <div className="cost-field">
                    <h2 className="label">Estimated Cost</h2>
                    <input
                      ref={n => this.estimated_cost = n}
                      name="estimated_cost"
                      type="number"
                      min="0"
                      onBlur={e => this.setFieldValue('estimated_cost', e.currentTarget.value)}
                    />
                  </div>

                  <div className="cost-field">
                    <h2 className="label">Estimated monetary benefits</h2>
                    <input
                      ref={n => this.monetary_benefits = n}
                      name="monetary_benefits"
                      type="number"
                      min="0"
                      onBlur={e => this.setFieldValue('monetary_benefits', e.currentTarget.value)}
                    />
                  </div>

                  <div className="cost-field -currency">
                    <h2 className="label">Original currency</h2>
                    <Select
                      name="field"
                      multi={false}
                      options={currencyOptions}
                      value={currency || ''}
                      onChange={opt => this.setFieldValue('currency', opt ? opt.value : '')}
                    />
                  </div>
                </div>

                {/* Intervention type* */}
                <div className={`form-field ${this.isRequiredOn('intervention_types')}`}>
                  <h2 className="label">Intervention type*</h2>
                  <Select
                    name="field"
                    multi
                    options={filtersOptions.intervention_types}
                    value={filtersOptions.intervention_types ? filtersOptions.intervention_types.filter(opt => intervention_types.includes(opt.value)) : []}
                    onChange={opts => this.setFieldValue('intervention_types', opts.map(o => o.value))}
                  />
                </div>

                <div className={`form-field ${this.isRequiredOn('implementation_statuses')}`}>
                  <h2 className="label">Implementation status*</h2>
                  <RadioGroup
                    name="implementation_statuses"
                    options={filtersOptions.implementation_statuses || []}
                    selected={filtersOptions.implementation_statuses && filtersOptions.implementation_statuses.find(imp => imp.value === implementation_statuses)}
                    onChange={value => this.setFieldValue('implementation_statuses', value)}
                  />
                </div>

                {/* Benefit details */}
                <div className="form-field">
                  <h2 className="label">Benefit details</h2>
                  <input
                    ref={n => this.benefit_details = n}
                    name="benefit_details"
                    type="text"
                    onBlur={e => this.setFieldValue('benefit_details', e.currentTarget.value)}
                  />
                </div>

                {/* Summary */}
                <div className="form-field">
                  <h2 className="label">Summary</h2>
                  <input
                    ref={n => this.summary = n}
                    name="summary"
                    type="text"
                    onBlur={e => this.setFieldValue('summary', e.currentTarget.value)}
                  />
                </div>

                {/* Refetences-typo */}
                <div className="form-field">
                  <h2 className="label">References-typo</h2>
                  <input
                    ref={n => this.references_typo = n}
                    name="references_typo"
                    type="text"
                    onBlur={e => this.setFieldValue('references_typo', e.currentTarget.value)}
                  />
                </div>

                <div className="actions">
                  <button
                    className="c-btn -transparent -primary action" to="/map"
                    onClick={this.clear}
                  >
                    Reset
                  </button>
                  <button
                    className="c-btn -filled -primary action"
                    onClick={this.submit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

SubmitPage.propTypes = {
  filtersOptions: React.PropTypes.object,
  // Actions
  getFiltersOptions: React.PropTypes.func
};
SubmitPage.defaultProps = {};
