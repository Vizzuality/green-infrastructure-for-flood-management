import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Switch from 'react-toggle-switch';
import 'react-toggle-switch/dist/css/switch.min.css';
import CheckboxGroup from 'components/ui/CheckboxGroup';
import { setNumberFormat } from 'utils/general';
import { resetProjectFilters } from 'modules/projects';
import { dispatch } from 'main';

const million = 1000000;

export default class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cost: {
        from: 0,
        to: null,
        disabled: true
      }
    };

    // Bindings
    this.resetFilters = this.resetFilters.bind(this);
    this.onChangeCostSwitch = this.onChangeCostSwitch.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.cost.to && newProps.options.cost_max) {
      this.setState({
        cost: {
          from: 0,
          to: newProps.options.cost_max * million,
          disabled: this.state.cost.disabled
        }
      });
    }
  }

  onChangeCostSwitch() {
    if (this.state.cost.disabled) {
      const newCost = Object.assign({}, this.state.cost, { disabled: !this.state.cost.disabled });
      this.setState({ cost: newCost }, () => {
        this.props.setProjectsFilters({ from_cost: this.state.cost.from / million || 0, to_cost: this.state.cost.to / million || 0 });
      });
    } else {
      this.resetCost();
    }
  }

  setArrayProjectsFilter(opts, key) {
    const filter = {};
    filter[key] = opts.map(opt => opt.value || opt);
    this.props.setProjectsFilters(filter);
  }

  setProjectsRangeFilter(opts) {
    this.props.setProjectsFilters({ from_cost: (opts.min / million), to_cost: (opts.max / million) });
  }

  resetCost() {
    this.setState({ cost: { from: 0, to: null, disabled: true } }, () => {
      this.props.setProjectsFilters({ from_cost: null, to_cost: null });
    });
  }

  resetFilters() {
    this.resetCost();
    dispatch(resetProjectFilters());
  }

  render() {
    const { options } = this.props;
    return (
      <div className="c-filters">
        <h3 className="text -panel-header is-desktop-hidden">Filters</h3>
        <div className="fields-wrapper">
          {/* Organizations */}
          <div className="filter-field">
            <label className="title">Organizations</label>
            <Select
              name="field"
              multi
              options={options.organizations}
              value={options.organizations ? options.organizations.filter(opt => this.props.filters.organizations.includes(opt.value)) : []}
              onChange={opts => this.setArrayProjectsFilter(opts, 'organizations')}
            />
          </div>

          {/* Scales */}
          <div className="filter-field">
            <label className="title">Scales</label>
            <Select
              name="field"
              multi
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
              multi
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
              multi
              options={options.countries}
              value={options.countries ? options.countries.filter(opt => this.props.filters.countries.includes(opt.value)) : []}
              onChange={opts => this.setArrayProjectsFilter(opts, 'countries')}
            />
          </div>

          {/* Nature-based solutions */}
          <div className="filter-field">
            <label className="title">Nature-based solutions</label>
            <Select
              name="field"
              multi
              options={options.nature_based_solutions}
              value={options.nature_based_solutions ? options.nature_based_solutions.filter(opt => this.props.filters.nature_based_solutions.includes(opt.value)) : []}
              onChange={opts => this.setArrayProjectsFilter(opts, 'nature_based_solutions')}
            />
          </div>

          {/* Intervention */}
          <div className="filter-field">
            <label className="title">Intervention type</label>
            <Select
              name="field"
              multi
              options={options.intervention_types}
              value={options.intervention_types ? options.intervention_types.filter(opt => this.props.filters.intervention_types.includes(opt.value)) : []}
              onChange={opts => this.setArrayProjectsFilter(opts, 'intervention_types')}
            />
          </div>

          {/* Primary benefits */}
          <div className="filter-field">
            <label className="title">Risk reduction benefits</label>
            <Select
              name="field"
              multi
              options={options.primary_benefits}
              value={options.primary_benefits ? options.primary_benefits.filter(opt => this.props.filters.primary_benefits.includes(opt.value)) : []}
              onChange={opts => this.setArrayProjectsFilter(opts, 'primary_benefits')}
            />
          </div>

          {/* co benefits */}
          <div className="filter-field">
            <label className="title">Additional benefits</label>
            <Select
              name="field"
              multi
              options={options.co_benefits}
              value={options.co_benefits ? options.co_benefits.filter(opt => this.props.filters.co_benefits.includes(opt.value)) : []}
              onChange={opts => this.setArrayProjectsFilter(opts, 'co_benefits')}
            />
          </div>

          {/* Hazard */}
          <div className="filter-field">
            <label className="title">Hazard</label>
            <Select
              name="field"
              multi
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
            <label className="title">
              <span>Cost range (US$)</span>
              <Switch
                onClick={this.onChangeCostSwitch}
                on={!this.state.cost.disabled}
                className="c-switch"
              />
            </label>
            <InputRange
              disabled={this.state.cost.disabled}
              maxValue={(options.cost_max * million) || (3 * million)}
              minValue={0}
              formatLabel={value => (value === 0 ? value : `$${setNumberFormat(value)}`)}
              value={{ min: this.state.cost.from, max: this.state.cost.to || 0 }}
              onChange={opts => this.setState({ cost: { from: opts.min, to: opts.max } })}
              onChangeComplete={opts => this.setProjectsRangeFilter(opts)}
              step={10000}
            />
          </div>
        </div>

        <ul className="actions">
          <li>
            <button className="c-btn -transparent" onClick={this.resetFilters}>Reset FILTERS</button>
          </li>
          <li>
            <button className="c-btn -filled" onClick={this.props.close}>Done</button>
          </li>
        </ul>
      </div>
    );
  }
}

Filters.propTypes = {
  // Actions
  options: React.PropTypes.object,
  filters: React.PropTypes.object,
  close: React.PropTypes.func,
  setProjectsFilters: React.PropTypes.func
};
Filters.defaultProps = {};
