import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import { fetchStatesByCountry, resetStatesOnCountryNull } from '../../actions/Geography';
import IntlMessages from 'util/IntlMessages';

class StateSelect extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.countryCode
      && nextProps.countryCode !== this.props.countryCode
      && (nextProps.countryCode !== this.props.loadedCountryState
      || this.props.states.length == 0)) {
      this.props.fetchStatesByCountry(nextProps.countryCode);
    }

    if(nextProps.countryCode === null) {
      this.props.resetStatesOnCountryNull()
    }
  }

  componentWillMount = () => {
    if(this.props.countryCode){
      this.props.fetchStatesByCountry(this.props.countryCode);
    }
  }

  handleChange = states => {
    this.props.onChange(states)
  }

  render() {
    let {multiple = true, label=(<IntlMessages id="component.geography.stateSelect.placeHolder" />)} = this.props;
    let options = this.props.states || []
    return (
      <FormControl className="w-100 mb-2">
        {label && (
          <FormLabel className={'shrink'}>
            {label}
          </FormLabel>
        )}
        <FormGroup>
        <Select
          placeholder={<IntlMessages id="component.geography.stateSelect.placeHolder" />}
          isLoading={this.props.loader}
          value={this.props.value}
          multi={multiple}
          onChange={this.handleChange}
          options={options}
          joinValues={true}
          simpleValue={true}
        />
        </FormGroup>
      </FormControl>
    );
  }
}
const mapStateToProps = ({ geography }) => {
  return {
    loader: geography.get('loadState'),
    loadedCountryState: geography.get('countryCode'),
    states: geography.get('states').toJS(),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchStatesByCountry,
    resetStatesOnCountryNull
  },
)(StateSelect);

