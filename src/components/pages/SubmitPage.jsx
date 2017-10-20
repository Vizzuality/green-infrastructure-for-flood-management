import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import isUrl from 'validator/lib/isURL';
import { defaultValues, requiredFields, infoTexts, currencyOptions,
  permissionOptions, yearsOptions } from 'constants/submit';
import { toBase64 } from 'utils/general';

import { Row } from 'components/ui/Grid';
import { SvgIcon } from 'vizz-components';
import RadioGroup from 'components/ui/RadioGroup';
import InputMap from 'components/ui/InputMap';
import Info from 'components/ui/Info';
import CheckboxGroup from 'components/ui/CheckboxGroup';
import ImageUpload from 'components/ui/ImageUpload';
import Spinner from 'components/ui/Spinner';
import Message from 'components/ui/Message';


export default class SubmitPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: Object.assign({}, defaultValues),
      requiredOn: [],
      mapSearch: '',
      learnNotValid: false,
      referencesNotValid: false,
      endDateNotValid: false,
      imageOptions: {
        accepted: null,
        rejected: null
      }
    };

    this.inputs = {};

    // BINDINGS
    this.onAddLocation = this.onAddLocation.bind(this);
    this.onRemoveOption = this.onRemoveOption.bind(this);
    this.onBlurOther = this.onBlurOther.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
    this.clear = this.clear.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.getFiltersOptions();
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

  setOtherValue(key, value) {
    this.setFieldValue(`new_${key}`, value);
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

  setFieldValue(key, value) {
    const newFields = Object.assign({}, this.state.fields);
    newFields[key] = value;
    this.setState({ fields: newFields });
  }

  clear() {
    Object.values(this.inputs).forEach(inp => inp.value = '');
    this.setState({ fields: Object.assign({}, defaultValues) });
    // TODO: scroll top
  }

  removeIdProvFromNewOptions() {
    const { new_nature_based_solutions, new_co_benefits_of_interventions,
      new_primary_benefits_of_interventions } = this.state.fields;
    const newOptions = {
      new_nature_based_solutions,
      new_primary_benefits_of_interventions,
      new_co_benefits_of_interventions };

    return Object.keys(newOptions).map(key => (
      {
        key,
        value: newOptions[key].map(v => v.value)
      }
    ));
  }

  removeIdProvFromLocations() {
    const { locations } = this.state.fields;

    return locations.map(l => ({ lat: l.lat, lng: l.lng }));
  }

  parsedFieldsToSend() {
    const allFields = Object.assign({}, this.state.fields);
    const filteredFields = {};

    // Remove those idProv (Provisional ids) from values
    this.removeIdProvFromNewOptions().forEach(f => allFields[f.key] = f.value);
    allFields.locations = this.removeIdProvFromLocations();


    Object.keys(allFields).forEach((key) => {
      if (allFields[key].length || (typeof allFields[key] === 'number' && `${allFields[key]}`.length)) {
        filteredFields[key] = allFields[key];
      }
    });

    if (filteredFields.image_base !== '' && !!this.state.imageOptions.accepted) {
      filteredFields.picture_name = this.state.imageOptions.accepted.name;
    }

    return filteredFields;
  }

  submit() {
    const { learn_more, references, start_year, completion_year } = this.state.fields;
    const requiredOn = [];
    const learnValid = learn_more !== '' ? isUrl(learn_more) : true;
    const referencesValid = references !== '' ? isUrl(references) : true;
    const endDateValid = completion_year === '' ||
      (start_year !== '' && completion_year !== '' && completion_year >= start_year);

    requiredFields.forEach((field) => {
      this.state.fields[field].length === 0 && requiredOn.push(field);
    });

    this.setState({ requiredOn,
      learnNotValid: !learnValid,
      referencesNotValid: !referencesValid,
      endDateNotValid: !endDateValid
    });

    if (!requiredOn.length && learnValid && referencesValid && endDateValid) {
      const projectData = this.parsedFieldsToSend();

      // Send fields
      this.props.submit(projectData);
      this.clear();
    }

    // Scroll top
    const formElement = document.getElementsByClassName('c-submit');
    if (formElement.length) formElement[0].scrollIntoView();
  }

  isRequiredOn(name) {
    return this.state.requiredOn.includes(name) ? 'required-error' : '';
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

  /* Upload image methods */
  onDrop(acc, rej) {
    acc.length ?
      toBase64(acc[0], (parsedFile) => {
        const parsedPhoto = {
          name: acc[0].name,
          size: acc[0].size,
          attachment: parsedFile
        };

        this.setState({
          imageOptions: { accepted: parsedPhoto, rejected: null }
        }, () => this.setFieldValue('image_base', parsedPhoto.attachment));
      }) :
      this.setState({
        imageOptions: { accepted: null, rejected: rej.length ? rej[0] : null }
      });
  }

  onRemoveFile() {
    this.setState({ imageOptions: { accepted: null, rejected: null } });
  }

  getSubmitMessage() {
    const { success, error } = this.props;
    let message = '';

    if (success) {
      message = `The project ${success.name} has been correctly submitted`;
    } else if (error) {
      message = 'An error ocurred';
    }
    return message;
  }

  setMessageOptions() {
    const { success, error } = this.props;
    const { requiredOn, learnNotValid, referencesNotValid, endDateNotValid } = this.state;
    const filledFormMessage = 'Some required fields are not filled or are incorrect';

    let message = '';
    let type = 'info';

    if (requiredOn.length > 0 || learnNotValid || referencesNotValid || endDateNotValid) {
      message = filledFormMessage;
      type = 'error';
    } else if (success || error) {
      message = this.getSubmitMessage();
      type = success ? 'success' : 'error';
    }

    return { message, type };
  }

  render() {
    const { filtersOptions, success, error } = this.props;
    const { requiredOn, learnNotValid, referencesNotValid, endDateNotValid } = this.state;
    const { scale, organizations, primary_benefits_of_interventions,
      co_benefits_of_interventions, donors, nature_based_solutions,
      hazard_types, intervention_type, currency_monetary_benefits,
      currency_estimated_cost, implementation_status, permission, start_year,
      completion_year
    } = this.state.fields;

    const messageCondition = ((requiredOn.length > 0 || learnNotValid || referencesNotValid || endDateNotValid) ||
      (success || error));

    const message = this.setMessageOptions();

    return (
      <div className="c-submit">
        <Spinner isLoading={this.props.loadingFilters} />
        <section className="submit-section">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12 medium-8 medium-offset-2">
                <h1 className="h1 -line">Submit your project</h1>
                <p className="text">Contribute your nature-based project and experiences to Natural Hazards – Nature-based Solutions database, and join a growing community of practitioners, scientists and donors using nature-based approaches to reduce disaster risk.</p>
              </div>
            </Row>

            {messageCondition &&
              <Row>
                <div className="column small-12 medium-8 medium-offset-2">
                  <Message message={message.message} type={message.type} />
                </div>
              </Row>
            }

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

                  <div className="form-field -in-row">
                    <div className={`row-field ${this.isRequiredOn('start_year')} -mono`}>
                      <Select
                        name="start_year"
                        multi={false}
                        options={yearsOptions()}
                        value={start_year || ''}
                        onChange={opt => this.setFieldValue('start_year', opt ? opt.value : '')}
                      />
                      <h2 className="label">Start year*</h2>
                    </div>

                    <div className={`row-field -mono ${endDateNotValid ? '-end-date-not-valid' : ''}`}>
                      <Select
                        name="completion_year"
                        multi={false}
                        options={yearsOptions()}
                        value={completion_year || ''}
                        onChange={opt => this.setFieldValue('completion_year', opt ? opt.value : '')}
                      />
                      <h2 className="label">Completion year, if applicable</h2>
                    </div>
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
                  <div className="form-field -in-row">
                    <div className="row-field">
                      <input
                        ref={n => this.inputs.estimated_cost = n}
                        name="estimated_cost"
                        type="number"
                        min="0"
                        onBlur={e => this.setFieldValue('estimated_cost', e.currentTarget.value)}
                      />
                      <h2 className="label">Estimated Cost</h2>
                    </div>

                    <div className="row-field -mono">
                      <Select
                        name="currency_estimated_cost"
                        multi={false}
                        options={filtersOptions.currencies}
                        value={currency_estimated_cost || ''}
                        onChange={opt => this.setFieldValue('currency_estimated_cost', opt ? opt.value : '')}
                      />
                      <h2 className="label">Currency of estimated cost</h2>
                    </div>

                    <div className="row-field">
                      <input
                        ref={n => this.inputs.estimated_monetary_benefits = n}
                        name="estimated_monetary_benefits"
                        type="number"
                        min="0"
                        onBlur={e => this.setFieldValue('estimated_monetary_benefits', e.currentTarget.value)}
                      />
                      <h2 className="label">Estimated monetary benefits</h2>
                    </div>

                    <div className="row-field -mono">
                      <Select
                        name="currency_monetary_benefits"
                        multi={false}
                        options={filtersOptions.currencies}
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
                    <h2 className="label">Project page*</h2>
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
                    <span className="subtitle">Your contact information will not be published</span>
                  </div>

                  <div className="form-field">
                    <h2 className="label">Upload photo <Info text={infoTexts.image} /></h2>
                    <p className="subtitle">Only *.jpeg and *.png images will be accepted</p>
                    <ImageUpload
                      accept="image/jpeg, image/png"
                      accepted={this.state.imageOptions.accepted}
                      rejected={this.state.imageOptions.rejected}
                      onDrop={this.onDrop}
                      onRemoveFile={this.onRemoveFile}
                    />
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
  loadingFilters: React.PropTypes.bool,
  success: React.PropTypes.object,
  error: React.PropTypes.any,
  // Actions
  getFiltersOptions: React.PropTypes.func,
  submit: React.PropTypes.func
};
SubmitPage.defaultProps = {};
