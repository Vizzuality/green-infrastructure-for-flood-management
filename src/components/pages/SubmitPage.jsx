import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import isUrl from 'validator/lib/isURL';

import { Row } from 'components/ui/Grid';
import { SvgIcon } from 'vizz-components';
import RadioGroup from 'components/ui/RadioGroup';
import InputMap from 'components/ui/InputMap';
import Info from 'components/ui/Info';
import CheckboxGroup from 'components/ui/CheckboxGroup';


const defaultValues = {
  name: '',
  locations: [],
  scale: '',
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

    this.inputs = {};

    // BINDINGS
    this.onAddLocation = this.onAddLocation.bind(this);
    this.onRemoveOption = this.onRemoveOption.bind(this);
    this.onBlurOther = this.onBlurOther.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.getFiltersOptions();
  }

  clear() {
    Object.values(this.inputs).forEach(inp => inp.value = '');
    this.setState({ fields: Object.assign({}, defaultValues) });
  }

  submit() {
    const { learn_more, references } = this.state.fields;
    const requiredOn = [];
    const learnValid = learn_more !== '' ? isUrl(learn_more) : true;
    const referencesValid = references !== '' ? isUrl(references) : true;

    requiredFields.forEach((field) => {
      this.state.fields[field].length === 0 && requiredOn.push(field);
    });

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

  controlOtherValue(key, obj) {
    const newState = Object.assign({}, this.state);
    const value = obj.map(it => it.value);
    const otherNew = obj.find(o => o.label === 'other');
    const newOtherInput = this.inputs[`new_${key}`];

    // Remove other option
    if (this.state[`new_${key}`] && !otherNew) {
      const newFields = Object.assign({}, this.state.fields);
      newFields[`new_${key}`] = [];
      newState.fields = newFields;
      newState[`new_${key}`] = false;

      this.setState(newState, () => { this.setFieldValue(key, value); });
      newOtherInput.value = '';

    // Add other option
    } else if (!this.state[`new_${key}`] && otherNew) {
      newState[`new_${key}`] = true;
      this.setState(newState, () => {
        this.setFieldValue(key, value);
        newOtherInput.focus();
      });
    } else {
      this.setFieldValue(key, value);
    }
  }

  setOtherValue(key, value) {
    this.setFieldValue(`new_${key}`, value);
  }

  onBlurOther(e) {
    const key = e.currentTarget.name;
    const currentInput = this.inputs[key];

    if (!currentInput.classList.contains('-active')) {
      currentInput.value = '';
      this.setFieldValue(key, '');
      return;
    }

    if (!this.state.fields[key].length) {
      currentInput.focus();
      currentInput.classList.add('-required');
    } else {
      currentInput.classList.remove('-required');
    }
  }

  onAddOther(key) {
    const input = this.inputs[key];
    const value = input.value.trim();
    const newValue = this.state.fields[key] || [];

    newValue.push({ idProv: Math.random(), value });
    this.setFieldValue(key, newValue);
    input.value = '';
  }

  onRemoveOption(key, value) {
    const values = this.state.fields[key];
    const newValues = values.filter(v => v.idProv !== value.idProv);
    this.setFieldValue(key, newValues);
  }

  renderOtherValues(key) {
    const others = this.state.fields[key];

    return (
      <ul className="others-list">
        {others.length > 0 && <li className="list-title">Others: </li>}
        {others.map((other, i) => (
          <li key={i} className="other">
            {other.value}
            <button className="" onClick={() => this.onRemoveOption(key, other)}>
              <SvgIcon name="icon-cross" className="-smaller" />
            </button>
          </li>
        ))}
      </ul>
    );
  }

  renderLocations() {
    const locations = this.state.fields.locations;
    return (
      <ul className="location-list">
        {locations.map((loc, i) => (
          <li key={i} className="location">
            {`${loc.lat}, ${loc.lng}`}
            <button className="" onClick={() => this.onRemoveOption('locations', loc)}>
              <SvgIcon name="icon-cross" className="-smaller" />
            </button>
          </li>
        ))}
      </ul>
    );
  }

  getCustomSelect(key, filtersKey, required, values, title, hasInfo) {
    const { filtersOptions } = this.props;

    return (
      <div className={`form-field ${required && this.isRequiredOn(key)}`}>
        <Select
          name={key}
          multi
          options={filtersOptions[filtersKey]}
          value={filtersOptions[filtersKey] ? filtersOptions[filtersKey].filter(opt => values.includes(opt.value)) : []}
          onChange={opts => this.controlOtherValue(key, opts)}
        />
        <h2 className="label">{title} {hasInfo && <Info text={infoTexts[key]} />}</h2>

        {/* Additional input to add new value */}
        <div className={`new-value ${this.state[`new_${key}`] ? '-active' : ''}`}>
          {this.renderOtherValues(`new_${key}`)}
          <input
            ref={n => this.inputs[`new_${key}`] = n}
            name={`new_${key}`}
            className={`field-other -additional ${this.state[`new_${key}`] ? '-active' : ''}`}
            placeholder="Type other name"
            type="text"
            // onChange={e => this.setOtherValue('nature_based_solutions', e.currentTarget.value)}
            onBlur={this.state[`new_${key}`] && this.onBlurOther}
          />
          <button className="c-btn -transparent -primary add-value" onClick={() => this.onAddOther(`new_${key}`)}>Add</button>
        </div>
      </div>
    );
  }

  render() {
    const { filtersOptions } = this.props;
    const { scale, organizations, primary_benefits_of_interventions,
      co_benefits_of_interventions, donors, nature_based_solutions,
      hazard_types, intervention_type, currency_monetary_benefits,
      currency_estimated_cost, implementation_status, permission
    } = this.state.fields;

    return (
      <div className="c-submit">
        <section className="submit-section">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12 medium-8 medium-offset-2">
                <h1 className="h1 -line">Sumbit your project</h1>
                <p className="text">Contribute your nature-based project and experiences to The Nature of Risk Reduction database, and join a growing community of practitioners, scientists and donors using nature-based approaches to reduce disaster risk.</p>
              </div>
            </Row>

            <Row>
              <div className="c-form column small-12 medium-8 medium-offset-2">
                <div className="form">

                  {/* Project Name */}
                  <div className={`form-field ${this.isRequiredOn('name')}`}>
                    <input
                      ref={n => this.inputs.name = n}
                      name="name"
                      type="text"
                      onBlur={e => this.setFieldValue('name', e.currentTarget.value)}
                    />
                    <h2 className="label">Project Name*</h2>
                  </div>

                  {/* Organizations */}
                  <div className={`form-field ${this.isRequiredOn('organizations')}`}>
                    <Select
                      name="organizations"
                      multi
                      options={filtersOptions.organizations}
                      value={filtersOptions.organizations ? filtersOptions.organizations.filter(opt => organizations.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('organizations', opts.map(o => o.value))}
                    />
                    <h2 className="label">Organizations*<Info text={infoTexts.organizations} /></h2>
                  </div>

                  {/* Donors */}
                  <div className="form-field">
                    <Select
                      name="donors"
                      multi
                      options={filtersOptions.donors}
                      value={filtersOptions.donors ? filtersOptions.donors.filter(opt => donors.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('donors', opts.map(o => o.value))}
                    />
                    <h2 className="label">Donors <Info text={infoTexts.donors} /></h2>
                  </div>

                  {/* Locations */}
                  <div className={`form-field ${this.isRequiredOn('locations')}`}>
                    {this.renderLocations()}
                    <InputMap
                      inputProps={{ name: 'locations' }}
                      onAddLocation={this.onAddLocation}
                    />
                    <h2 className="label">Locations*</h2>
                  </div>

                  {/* Scale */}
                  <div className={`form-field ${this.isRequiredOn('scale')}`}>
                    <h2 className="label">Scale*</h2>
                    <RadioGroup
                      name="scale"
                      options={filtersOptions.scales || []}
                      selected={filtersOptions.scales && filtersOptions.scales.find(imp => imp.value === scale)}
                      onChange={value => this.setFieldValue('scale', value)}
                    />
                  </div>

                  {/* Implementation status */}
                  <div className={`form-field ${this.isRequiredOn('implementation_status')}`}>
                    <h2 className="label">Implementation status*</h2>
                    <RadioGroup
                      name="implementation_status"
                      options={filtersOptions.implementation_statuses || []}
                      selected={filtersOptions.implementation_statuses && filtersOptions.implementation_statuses.find(imp => imp.value === implementation_status)}
                      onChange={value => this.setFieldValue('implementation_status', value)}
                    />
                  </div>

                  {/* Hazard types */}
                  <div className={`form-field ${this.isRequiredOn('hazard_types')}`}>
                    <h2 className="label">Hazard types*</h2>
                    <CheckboxGroup
                      options={filtersOptions.hazard_types ? filtersOptions.hazard_types : []}
                      selected={filtersOptions.hazard_types ? filtersOptions.hazard_types.filter(opt => hazard_types.includes(opt.value)) : []}
                      onChange={opts => this.setFieldValue('hazard_types', opts.map(o => o))}
                    />
                  </div>

                  {/* Intervention type */}
                  <div className={`form-field ${this.isRequiredOn('intervention_type')}`}>
                    <h2 className="label">Intervention type* <Info text={infoTexts.intervention_type} /></h2>
                    <RadioGroup
                      name="intervention_type"
                      options={filtersOptions.intervention_types || []}
                      selected={filtersOptions.intervention_types && filtersOptions.intervention_types.find(imp => imp.value === intervention_type)}
                      onChange={value => this.setFieldValue('intervention_type', value)}
                    />
                  </div>

                  {/* Nature-based solutions */}
                  {this.getCustomSelect('nature_based_solutions', 'nature_based_solutions', true, nature_based_solutions, 'Nature-based solutions*', true)}

                  {/* Primary benefits */}
                  {this.getCustomSelect('primary_benefits_of_interventions', 'primary_benefits', true, primary_benefits_of_interventions, 'Risk reduction benefits*', true)}

                  {/* Co benefits of interventions */}
                  {this.getCustomSelect('co_benefits_of_interventions', 'co_benefits', false, co_benefits_of_interventions, 'Full range of benefits of intervention', false)}

                  {/* Costs */}
                  <div className="form-field costs">
                    <div className="cost-field">
                      <input
                        ref={n => this.inputs.estimated_cost = n}
                        name="estimated_cost"
                        type="number"
                        min="0"
                        onBlur={e => this.setFieldValue('estimated_cost', e.currentTarget.value)}
                      />
                      <h2 className="label">Estimated Cost</h2>
                    </div>

                    <div className="cost-field -currency">
                      <Select
                        name="currency_estimated_cost"
                        multi={false}
                        options={currencyOptions}
                        value={currency_estimated_cost || ''}
                        onChange={opt => this.setFieldValue('currency_estimated_cost', opt ? opt.value : '')}
                      />
                      <h2 className="label">Currency of estimated cost</h2>
                    </div>

                    <div className="cost-field">
                      <input
                        ref={n => this.inputs.estimated_monetary_benefits = n}
                        name="estimated_monetary_benefits"
                        type="number"
                        min="0"
                        onBlur={e => this.setFieldValue('estimated_monetary_benefits', e.currentTarget.value)}
                      />
                      <h2 className="label">Estimated monetary benefits</h2>
                    </div>

                    <div className="cost-field -currency">
                      <Select
                        name="currency_monetary_benefits"
                        multi={false}
                        options={currencyOptions}
                        value={currency_monetary_benefits || ''}
                        onChange={opt => this.setFieldValue('currency_monetary_benefits', opt ? opt.value : '')}
                      />
                      <h2 className="label">Currency of estimated monetary benefits</h2>
                    </div>
                  </div>

                  {/* Benefit details */}
                  <div className="form-field">
                    <input
                      ref={n => this.inputs.benefit_details = n}
                      name="benefit_details"
                      type="text"
                      onBlur={e => this.setFieldValue('benefit_details', e.currentTarget.value)}
                    />
                    <h2 className="label">Benefit details <Info text={infoTexts.benefit_details} /></h2>
                  </div>

                  {/* Summary */}
                  <div className={`form-field ${this.isRequiredOn('summary')}`}>
                    <input
                      ref={n => this.inputs.summary = n}
                      name="summary"
                      type="text"
                      onBlur={e => this.setFieldValue('summary', e.currentTarget.value)}
                    />
                    <h2 className="label">Project Summary*</h2>
                  </div>

                  {/* Learn more */}
                  <div className={`form-field ${this.state.learnNotValid ? '-url-not-valid' : ''} ${this.isRequiredOn('learn_more')}`}>
                    <input
                      ref={n => this.inputs.learn_more = n}
                      name="learn_more"
                      type="text"
                      onBlur={e => this.setFieldValue('learn_more', e.currentTarget.value)}
                    />
                    <h2 className="label">Project website*</h2>
                  </div>

                  {/* Refetences-typo */}
                  <div className={`form-field ${this.state.referencesNotValid ? '-url-not-valid' : ''}`}>
                    <input
                      ref={n => this.inputs.references_typo = n}
                      name="references"
                      type="text"
                      onBlur={e => this.setFieldValue('references', e.currentTarget.value)}
                    />
                    <h2 className="label">Aditional references <Info text={infoTexts.references} /></h2>
                  </div>

                  {/* Contributor name */}
                  <div className={`form-field ${this.isRequiredOn('contributor_name')}`}>
                    <input
                      ref={n => this.inputs.contributor_name = n}
                      name="contributor_name"
                      type="text"
                      onBlur={e => this.setFieldValue('contributor_name', e.currentTarget.value)}
                    />
                    <h2 className="label">Contributor name*</h2>
                  </div>

                  <div className={`form-field ${this.isRequiredOn('contributor_organization')}`}>
                    <input
                      ref={n => this.inputs.contributor_organization = n}
                      name="contributor_organization"
                      type="text"
                      onBlur={e => this.setFieldValue('contributor_organization', e.currentTarget.value)}
                    />
                    <h2 className="label">Contributor organization*</h2>
                  </div>

                  {/* Permission */}
                  <div className={`form-field ${this.isRequiredOn('permission')}`}>
                    <h2 className="label">Would you like your name and/or organization to appear on the project page as the contributor of the project?*</h2>
                    <RadioGroup
                      name="permission"
                      options={permissionOptions || []}
                      selected={permissionOptions && permissionOptions.find(imp => imp.value === permission)}
                      onChange={value => this.setFieldValue('permission', value)}
                    />
                  </div>

                  <div className={`form-field ${this.isRequiredOn('contact_info')}`}>
                    <input
                      ref={n => this.inputs.contact_info = n}
                      name="contact_info"
                      type="text"
                      onBlur={e => this.setFieldValue('contact_info', e.currentTarget.value)}
                    />
                    <h2 className="label">Contact information*</h2>
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
