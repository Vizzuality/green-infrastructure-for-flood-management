import React from 'react';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CheckboxGroup from 'components/ui/CheckboxGroup';

import { typeOptions, interventionOptions, hazardOptions, organizationsOptions, scalesOptions, solutionOptions, regionsOptions } from 'constants/filters';
import { countriesOptions } from 'constants/countries';

export default class Filters extends React.Component {

  setProjectsFilter(opts, key) {
    const filter = {};
    filter[key] = opts.map(opt => opt.value || opt);
    this.props.setProjectsFilters(filter);
  }

  render() {
    return (
      <div className="c-filters">
        {/* Organizations */}
        <div className="filter-field">
          <label className="title">Organizations</label>
          <Select
            name="field"
            multi={true}
            options={organizationsOptions}
            value={organizationsOptions.filter(opt => this.props.filters.organizations.includes(opt.value))}
            onChange={opts => this.setProjectsFilter(opts, 'organizations')}
          />
        </div>

        {/* Scales */}
        <div className="filter-field">
          <label className="title">Scales</label>
          <Select
            name="field"
            multi={true}
            options={scalesOptions}
            value={scalesOptions.filter(opt => this.props.filters.scales.includes(opt.value))}
            onChange={opts => this.setProjectsFilter(opts, 'scales')}
          />
        </div>

        {/* Countries */}
        <div className="filter-field">
          <label className="title">Countries</label>
          <Select
            name="field"
            multi={true}
            options={countriesOptions}
            value={countriesOptions.filter(opt => this.props.filters.countries.includes(opt.value))}
            onChange={opts => this.setProjectsFilter(opts, 'countries')}
          />
        </div>
  
        {/* Regions */}
        <div className="filter-field">
          <label className="title">Regions</label>
          <Select
            name="field"
            multi={true}
            options={regionsOptions}
            value={regionsOptions.filter(opt => this.props.filters.regions.includes(opt.value))}
            onChange={opts => this.setProjectsFilter(opts, 'regions')}
          />
        </div>
       
        {/* Intervention */}
        <div className="filter-field">
          <label className="title">Intervention</label>
          <Select
            name="field"
            multi={true}
            options={interventionOptions}
            value={interventionOptions.filter(opt => this.props.filters.intervention_types.includes(opt.value))}
            onChange={opts => this.setProjectsFilter(opts, 'intervention_types')}
          />
        </div>

        {/* Nature-based solutions */}
        <div className="filter-field">
          <label className="title">Nature-based solutions</label>
          <Select
            name="field"
            multi={true}
            options={solutionOptions}
            value={solutionOptions.filter(opt => this.props.filters.nature_based_solutions.includes(opt.value))}
            onChange={opts => this.setProjectsFilter(opts, 'nature_based_solutions')}
          />
        </div>

        {/* Hazard */}
        <div className="filter-field">
          <label className="title">Hazard</label>
          <CheckboxGroup 
            name="asdf"
            options={hazardOptions}
            selected={hazardOptions.filter(opt => this.props.filters.hazard_types.includes(opt.value))}
            className=""
            onChange={opts => this.setProjectsFilter(opts, 'hazard_types')}
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
