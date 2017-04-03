import React from 'react';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CheckboxGroup from 'components/ui/CheckboxGroup';

import { typeOptions, interventionOptions, hazardOptions, organizationsOptions, scalesOptions, solutionOptions, regionsOptions } from 'constants/filters';
import { countriesOptions } from 'constants/countries';

export default class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      cost: {
        from: props.filters.from_cost, 
        to: props.filters.to_cost
      }
    };

    // Bindings
    this.resetFilters = this.resetFilters.bind(this);
  }

  static contextTypes = {
    toggleFilters: React.PropTypes.func
  };

  setArrayProjectsFilter(opts, key) {
    const filter = {};
    filter[key] = opts.map(opt => opt.value || opt);
    this.props.setProjectsFilters(filter);
  }

  setProjectsRangeFilter(opts) {
    this.props.setProjectsFilters({ 'from_cost': opts.min, 'to_cost': opts.max });
  }

  resetCost(){
    this.setState({ cost: { from: 0, to: 10000 }}, () => {
      this.props.setProjectsFilters({ 'from_cost': 0, 'to_cost': 10000 });
    });
  }

  resetFilters() {
    Object.keys(this.props.filters).forEach(key => {
      if (key === 'from_cost') {
        this.resetCost();
      } else if (key !== 'to_cost'){
        this.setArrayProjectsFilter([], key);
      }
    });
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
            onChange={opts => this.setArrayProjectsFilter(opts, 'organizations')}
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
            onChange={opts => this.setArrayProjectsFilter(opts, 'scales')}
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
            onChange={opts => this.setArrayProjectsFilter(opts, 'countries')}
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
            onChange={opts => this.setArrayProjectsFilter(opts, 'regions')}
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
            onChange={opts => this.setArrayProjectsFilter(opts, 'intervention_types')}
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
            onChange={opts => this.setArrayProjectsFilter(opts, 'nature_based_solutions')}
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
            onChange={opts => this.setArrayProjectsFilter(opts, 'hazard_types')}
          />
        </div>

        {/* Costs */}
        <div className="filter-field">
          <label className="title">Cost range</label>
          <InputRange
            maxValue={10000}
            minValue={0}
            value={{ min: this.state.cost.from, max: this.state.cost.to }}
            onChange={opts => this.setState({ cost: { from: opts.min, to: opts.max }})} 
            onChangeComplete={opts => this.setProjectsRangeFilter(opts)} 
          />
        </div>

        <div className="actions">
          <button className="c-btn" onClick={this.resetFilters}>Reset FILTERS</button>
          <button className="c-btn -filled" onClick={() => this.context.toggleFilters()}>APPLY FILTERS</button>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  // Actions
  setArrayProjectsFilters: React.PropTypes.func,
  filters: React.PropTypes.object
};
Filters.defaultProps = {};
