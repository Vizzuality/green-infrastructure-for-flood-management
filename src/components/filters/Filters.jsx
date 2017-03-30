import React from 'react';
import { SimpleSelect, MultiSelect } from 'react-selectize';
import { typeOptions, statusOptions, interventionOptions, hazardOptions, solutionOptions } from 'constants/filters';

export default class Filters extends React.Component {
  render() {
    return (
      <div className="c-filters">
        {/* Type */}
        {/*<div className="c-select">
          <span className="select-label">Type</span>
          <SimpleSelect
            hideResetButton
            value={typeOptions.find(opt => opt.value === this.props.filters.type)}
            onValueChange={opt => this.props.setProjectsFilters({ type: opt.value })}
          >
            {typeOptions.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
          </SimpleSelect>
        </div>*/}
        {/* Status */}
        {/*<div className="c-select">
          <span className="select-label">Status</span>
          <SimpleSelect
            hideResetButton
            value={statusOptions.find(opt => opt.value === this.props.filters.status)}
            onValueChange={opt => this.props.setProjectsFilters({ status: opt.value })}
          >
            {statusOptions.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
          </SimpleSelect>
        </div>*/}
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
