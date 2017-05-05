import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import isUrl from 'validator/lib/isURL';

import { Row } from 'components/ui/Grid';
import { SvgIcon } from 'vizz-components';
import BtnGroup from 'components/ui/BtnGroup';
import RadioGroup from 'components/ui/RadioGroup';
import InputMap from 'components/ui/InputMap';


const defaultValues = {
  name: '',
  locations: [],
  scale: '',
  organizations: [],
  primary_benefits_of_interventions: [],
  co_benefits_of_interventions: [],
  nature_based_solutions: [],
  hazard_types: [],
  estimated_cost: '',
  estimated_monetary_benefits: '',
  intervention_type: '',
  implementation_status: '',
  original_currency: '',
  benefit_details: '',
  summary: '',
  learn_more: '',
  references: ''
};

export default class SubmitPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: Object.assign({}, defaultValues),
      requiredOn: [],
      mapSearch: '',
      learnNotValid: false,
      referencesNotValid: false
    };

    // BINDINGS
    this.onAddLocation = this.onAddLocation.bind(this);
    this.onRemoveLocation = this.onRemoveLocation.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.getFiltersOptions();
  }

  clear() {
    const inputs = [this.name, this.estimated_cost, this.estimated_monetary_benefits,
      this.benefit_details, this.summary, this.references_typo, this.learn_more];
    inputs.forEach(inp => inp.value = '');

    this.setState({ fields: Object.assign({}, defaultValues) });
  }

  submit() {
    const { name, intervention_type, implementation_status, learn_more, references } = this.state.fields;
    const requiredOn = [];
    const learnValid = learn_more !== '' ? isUrl(learn_more) : true;
    const referencesValid = references !== '' ? isUrl(references) : true;

    name === '' && requiredOn.push('name');
    intervention_type === '' && requiredOn.push('intervention_type');
    implementation_status === '' && requiredOn.push('implementation_status');

    this.setState({ requiredOn,
      learnNotValid: !learnValid,
      referencesNotValid: !referencesValid
    });

    if (!requiredOn.length && learnValid && referencesValid) {
      // Send
    }
  }

  isRequiredOn(name) {
    return this.state.requiredOn.includes(name) ? 'required-error' : '';
  }

  onAddLocation(latLng) {
    const locations = this.state.fields.locations;

    if (latLng) {
      const newLocations = locations.slice();
      newLocations.push({
        idProv: Math.random(),
        lat: latLng.lat(),
        lng: latLng.lng()
      });

      this.setFieldValue('locations', newLocations);
    }
  }

  setFieldValue(key, value) {
    const newFields = Object.assign({}, this.state.fields);
    newFields[key] = value;
    this.setState({ fields: newFields });
  }

  onRemoveLocation(location) {
    const locations = this.state.fields.locations;
    const newLocations = locations.filter(l => l.idProv !== location.idProv);
    this.setFieldValue('locations', newLocations);
  }

  renderLocations() {
    const locations = this.state.fields.locations;
    return (
      <ul className="location-list">
        {locations.map((loc, i) => (
          <li key={i} className="location">
            {`${loc.lat}, ${loc.lng}`}
            <button className="" onClick={() => this.onRemoveLocation(loc)}>
              <SvgIcon name="icon-cross" className="-smaller" />
            </button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const currencyOptions = [{ label: 'EUR', value: 'eur' }, { label: 'USD', value: 'usd' }];
    const { filtersOptions } = this.props;
    const { scale, organizations, primary_benefits_of_interventions,
      co_benefits_of_interventions, nature_based_solutions,
      hazard_types, intervention_type, original_currency, implementation_status } = this.state.fields;

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
                <div className="form">
                  {/* Name */}
                  <div className={`form-field ${this.isRequiredOn('name')}`}>
                    <input
                      ref={n => this.name = n}
                      name="name"
                      type="text"
                      onBlur={e => this.setFieldValue('name', e.currentTarget.value)}
                    />
                    <h2 className="label">Name*</h2>
                  </div>

                  <div className="form-field">
                    {this.renderLocations()}
                    <InputMap
                      inputProps={{ name: 'locations' }}
                      onAddLocation={this.onAddLocation}
                    />
                    <h2 className="label">Location</h2>
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
                    <Select
                      name="field"
                      multi
                      options={filtersOptions.organizations}
                      value={filtersOptions.organizations ? filtersOptions.organizations.filter(opt => organizations.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('organizations', opts.map(o => o.value))}
                    />
                    <h2 className="label">Organizations</h2>
                  </div>

                  {/* Primary benefits */}
                  <div className="form-field">
                    <Select
                      name="primary_benefits"
                      multi
                      options={filtersOptions.primary_benefits}
                      value={filtersOptions.primary_benefits ? filtersOptions.primary_benefits.filter(opt => primary_benefits_of_interventions.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('primary_benefits_of_interventions', opts.map(o => o.value))}
                    />
                    <h2 className="label">Risk reduction benefits</h2>
                  </div>

                  {/* Co benefits of interventions */}
                  <div className="form-field">
                    <Select
                      name="field"
                      multi
                      options={filtersOptions.co_benefits}
                      value={filtersOptions.co_benefits ? filtersOptions.co_benefits.filter(opt => co_benefits_of_interventions.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('co_benefits_of_interventions', opts.map(o => o.value))}
                    />
                    <h2 className="label">Co benefits of interventions</h2>
                  </div>

                  {/* Nature-based solutions */}
                  <div className="form-field">
                    <Select
                      name="field"
                      multi
                      options={filtersOptions.nature_based_solutions}
                      value={filtersOptions.nature_based_solutions ? filtersOptions.nature_based_solutions.filter(opt => nature_based_solutions.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('nature_based_solutions', opts.map(o => o.value))}
                    />
                    <h2 className="label">Nature-based solutions</h2>
                  </div>

                  {/* Hazard */}
                  <div className="form-field">
                    <Select
                      name="hazard_types"
                      multi
                      options={filtersOptions.hazard_types}
                      value={filtersOptions.hazard_types ? filtersOptions.hazard_types.filter(opt => hazard_types.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('hazard_types', opts.map(o => o.value))}
                    />
                    <h2 className="label">Hazard</h2>
                  </div>

                  {/* Donors */}
                  {/* <div className="form-field">
                    <Select
                      name="donors"
                      multi
                      options={filtersOptions.donors}
                      value={filtersOptions.donors ? filtersOptions.donors.filter(opt => donors.includes(opt.value)) : []}
                      onChange={opts => this.setState({ donors: opts.map(o => o.value) })}
                    />
                    <h2 className="label">Donors</h2>
                  </div> */}

                  {/* Costs */}
                  <div className="form-field costs">
                    <div className="cost-field">
                      <input
                        ref={n => this.estimated_cost = n}
                        name="estimated_cost"
                        type="number"
                        min="0"
                        onBlur={e => this.setFieldValue('estimated_cost', e.currentTarget.value)}
                      />
                      <h2 className="label">Estimated Cost</h2>
                    </div>

                    <div className="cost-field">
                      <input
                        ref={n => this.estimated_monetary_benefits = n}
                        name="estimated_monetary_benefits"
                        type="number"
                        min="0"
                        onBlur={e => this.setFieldValue('estimated_monetary_benefits', e.currentTarget.value)}
                      />
                      <h2 className="label">Estimated monetary benefits</h2>
                    </div>

                    <div className="cost-field -currency">
                      <Select
                        name="original_currency"
                        multi={false}
                        options={currencyOptions}
                        value={original_currency || ''}
                        onChange={opt => this.setFieldValue('original_currency', opt ? opt.value : '')}
                      />
                      <h2 className="label">Original currency</h2>
                    </div>
                  </div>


                  {/* Intervention type* */}
                  <div className="form-field">
                    <h2 className="label">Intervention type*</h2>
                    <RadioGroup
                      name="intervention_type"
                      options={filtersOptions.intervention_types || []}
                      selected={filtersOptions.intervention_types && filtersOptions.intervention_types.find(imp => imp.value === intervention_type)}
                      onChange={value => this.setFieldValue('intervention_type', value)}
                    />
                  </div>

                  <div className={`form-field ${this.isRequiredOn('implementation_status')}`}>
                    <h2 className="label">Implementation status*</h2>
                    <RadioGroup
                      name="implementation_status"
                      options={filtersOptions.implementation_statuses || []}
                      selected={filtersOptions.implementation_statuses && filtersOptions.implementation_statuses.find(imp => imp.value === implementation_status)}
                      onChange={value => this.setFieldValue('implementation_status', value)}
                    />
                  </div>

                  {/* Benefit details */}
                  <div className="form-field">
                    <input
                      ref={n => this.benefit_details = n}
                      name="benefit_details"
                      type="text"
                      onBlur={e => this.setFieldValue('benefit_details', e.currentTarget.value)}
                    />
                    <h2 className="label">Benefit details</h2>
                  </div>

                  {/* Summary */}
                  <div className="form-field">
                    <input
                      ref={n => this.summary = n}
                      name="summary"
                      type="text"
                      onBlur={e => this.setFieldValue('summary', e.currentTarget.value)}
                    />
                    <h2 className="label">Summary</h2>
                  </div>

                  {/* Learn more */}
                  <div className={`form-field ${this.state.learnNotValid ? '-url-not-valid' : ''}`}>
                    <input
                      ref={n => this.learn_more = n}
                      name="learn_more"
                      type="text"
                      onBlur={e => this.setFieldValue('learn_more', e.currentTarget.value)}
                    />
                    <h2 className="label">Learn more</h2>
                  </div>

                  {/* Refetences-typo */}
                  <div className={`form-field ${this.state.referencesNotValid ? '-url-not-valid' : ''}`}>
                    <input
                      ref={n => this.references_typo = n}
                      name="references"
                      type="text"
                      onBlur={e => this.setFieldValue('references', e.currentTarget.value)}
                    />
                    <h2 className="label">References-typo</h2>
                  </div>
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
