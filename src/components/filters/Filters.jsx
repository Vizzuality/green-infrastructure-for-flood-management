import React from 'react';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import { typeOptions, interventionOptions, hazardOptions, organizationsOptions, scalesOptions, solutionOptions, regionsOptions } from 'constants/filters';
import { countriesOptions } from 'constants/countries';

export default class Filters extends React.Component {
  render() {
    return (
      <div className="c-filters">
        {/* Regions */}
        {/*<div className="c-select">
          <span className="select-label">Locations</span>
          <SimpleSelect
            hideResetButton
            value={regionsOptions.find(opt => opt.value === this.props.filters.regions)}
            onValueChange={opt => this.props.setProjectsFilters({ regions: opt.value })}
          >
            {regionsOptions.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
          </SimpleSelect>
        </div>*/}
      {/* Organizations */}
        <div className="c-select">
          <span className="select-label">Organizations</span>
          <MultiSelect
            options={organizationsOptions}
            values={organizationsOptions.filter(opt => this.props.filters.organizations.includes(opt.value))}
            onValuesChange={opts => this.props.setProjectsFilters({ organizations: opts.map(opt => opt.value) })}
          />
        </div>
        {/* Scales */}
        <div className="c-select">
          <span className="select-label">Scales</span>
          <MultiSelect
            options={scalesOptions}
            values={scalesOptions.filter(opt => this.props.filters.scales.includes(opt.value))}
            onValuesChange={opts => this.props.setProjectsFilters({ scales: opts.map(opt => opt.value) })}
          />
        </div>
      {/* Countries */}
        <div className="c-select">
          <span className="select-label">Countries</span>
          <MultiSelect
            options={countriesOptions}
            values={countriesOptions.filter(opt => this.props.filters.countries.includes(opt.value))}
            onValuesChange={opts => this.props.setProjectsFilters({ countries: opts.map(opt => opt.value) })}
          />
        </div>
        {/* Regions */}
        <div className="c-select">
          <span className="select-label">Regions</span>
          <MultiSelect
            options={regionsOptions}
            values={regionsOptions.filter(opt => this.props.filters.regions.includes(opt.value))}
            onValuesChange={opts => this.props.setProjectsFilters({ regions: opts.map(opt => opt.value) })}
          />
        </div>
        {/* Intervention */}
        <div className="c-select">
          <span className="select-label">Intervention</span>
          <MultiSelect
            options={interventionOptions}
            values={interventionOptions.filter(opt => this.props.filters.intervention_types.includes(opt.value))}
            onValuesChange={opts => this.props.setProjectsFilters({ intervention_types: opts.map(opt => opt.value) })}
          />
        </div>
        {/* Hazard */}
        <div className="c-select">
          <span className="select-label">Hazard</span>
          <MultiSelect
            options={hazardOptions}
            values={hazardOptions.filter(opt => this.props.filters.hazard_types.includes(opt.value))}
            onValuesChange={opts => this.props.setProjectsFilters({ hazard_types: opts.map(opt => opt.value) })}
          />
        </div>
        {/* Nature-based solutions */}
        <div className="c-select">
          <span className="select-label">Nature-based solutions</span>
          <MultiSelect
            options={solutionOptions}
            values={solutionOptions.filter(opt => this.props.filters.nature_based_solutions.includes(opt.value))}
            onValuesChange={opts => this.props.setProjectsFilters({ nature_based_solutions: opts.map(opt => opt.value) })}
          />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  // Actions
  setProjectsFilters: React.PropTypes.func,
  filters: React.PropTypes.object
};
Filters.defaultProps = {};
