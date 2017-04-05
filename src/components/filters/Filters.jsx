import React from 'react';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CheckboxGroup from 'components/ui/CheckboxGroup';

import { typeOptions, interventionOptions, hazardOptions, organizationsOptions, scalesOptions, solutionOptions, regionsOptions, coBenefitsOptions, primaryBenefitsOptions, statusOptions } from 'constants/filters';
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

  componentWillMount() {
    this.props.getFiltersOptions();
  }

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
      } else if (key !== 'to_cost' && key !== 'order' && key !== 'direction'){
        this.setArrayProjectsFilter([], key);
      }
    });
  }

  render() {
    const { options } = this.props;

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
            options={options.scales}
            value={options.scales ? options.scales.filter(opt => this.props.filters.scales.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'scales')}
          />
        </div>

        {/* Regions */}
        <div className="filter-field">
          <label className="title">Regions</label>
          <Select
            name="field"
            multi={true}
            options={options.regions}
            value={options.regions ? options.regions.filter(opt => this.props.filters.regions.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'regions')}
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

        {/* Nature-based solutions */}
        <div className="filter-field">
          <label className="title">Nature-based solutions</label>
          <Select
            name="field"
            multi={true}
            options={options.nature_based_solutions}
            value={options.nature_based_solutions ? options.nature_based_solutions.filter(opt => this.props.filters.nature_based_solutions.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'nature_based_solutions')}
          />
        </div>

        {/* Intervention */}
        <div className="filter-field">
          <label className="title">Intervention</label>
          <Select
            name="field"
            multi={true}
            options={options.intervention_types}
            value={options.intervention_types ? options.intervention_types.filter(opt => this.props.filters.intervention_types.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'intervention_types')}
          />
        </div>

        {/* co benefits */}
        <div className="filter-field">
          <label className="title">Co benefits</label>
          <Select
            name="field"
            multi={true}
            options={options.co_benefits}
            value={options.co_benefits ? options.co_benefits.filter(opt => this.props.filters.co_benefits.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'co_benefits')}
          />
        </div>

        {/* Primary benefits */}
        <div className="filter-field">
          <label className="title">Primary benefits</label>
          <Select
            name="field"
            multi={true}
            options={options.primary_benefits}
            value={options.primary_benefits ? options.primary_benefits.filter(opt => this.props.filters.primary_benefits.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'primary_benefits')}
          />
        </div>

        {/* Hazard */}
        <div className="filter-field">
          <label className="title">Hazard</label>
          <Select
            name="field"
            multi={true}
            options={options.hazard_types}
            value={options.hazard_types ? options.hazard_types.filter(opt => this.props.filters.hazard_types.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'hazard_types')}
          />
        </div>

        {/* Status */}
        <div className="filter-field">
          <label className="title">Status</label>
          <CheckboxGroup
            options={options.implementation_statuses ? options.implementation_statuses : []}
            selected={options.implementation_statuses ? options.implementation_statuses.filter(opt => this.props.filters.status.includes(opt.value)) : []}
            onChange={opts => this.setArrayProjectsFilter(opts, 'status')}
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
          <button className="c-btn -filled" onClick={this.props.close}>APPLY FILTERS</button>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  // Actions
  options: React.PropTypes.object,
  close: React.PropTypes.func,
  setArrayProjectsFilters: React.PropTypes.func,
  filters: React.PropTypes.object
};
Filters.defaultProps = {};
