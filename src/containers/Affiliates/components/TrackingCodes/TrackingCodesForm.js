import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as Immutable from 'immutable';
import { addTrackingCodes } from '../../actions';
import { createObject } from 'util/helpers';
import IntlMessages from 'util/IntlMessages';
import { Typography } from '../../../../../node_modules/@material-ui/core';
import { getRandomCode } from '../../../../util/helpers'
import FormHelperText from '@material-ui/core/FormHelperText';


class TrackingCodesForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState(props);
    }

    getInitialState = (props) => {
      const editCode = props.edit ? props.data ? props.data.code : '' : '';
      const initialState = {
        loading: false,
        edit: false,
        code: editCode,
        submitBtn: '',
        error: false,
      };
      return initialState;
    }

    componentWillReceiveProps = (nextProps) => {
      const codeAlready = nextProps.newTrackingCode !== undefined ? nextProps.newTrackingCode.codeAlready : {} ;
        if(codeAlready && codeAlready.status === 500){
          this.setState({error:true})
        }
        if(!nextProps.actionLoader && this.state.submit && codeAlready.status !== 500){
          this.setState({submit: false})
          if(this.state.submitBtn === 'close' && nextProps.refetchTrackingCode){
            this.setState({code: ''})
            this.handleCloseDrawer();
          }
        }

        if(nextProps.showForm !== this.props.showForm && !nextProps.edit){
          this.setState({code: getRandomCode(6), error: false})
        }
      }

    handleChange = (key) => event => {
      this.setState({[key]: event.target.value, error: false})
    }

    handleSubmit = btnType => {
      this.setState({submitBtn: btnType, submit: true})
      const tenantId = this.props.tenantsByDomain.id;
      const code = this.state.code;
      const { affiliateId } = this.props.match.params;
      this.props.addTrackingCodes({data: {code}, affiliateId, tenantId})
    }

    handleCloseDrawer = () => {
      this.setState({code: '', error: false});
      this.props.closeForm();
    }

    render() {

      const { loading, code } = this.state;
      const { data } = this.props;
      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
            {this.props.edit ? (
              <span><IntlMessages id="pages.AffiliatesPage.trackingCode.label.edit_title" />: {data ? data.code : ''}</span>
            ) : (
              <IntlMessages id="pages.AffiliatesPage.trackingCodes.btn.add_tracking_codes" />
            )}
          </FormDrawerHeader>

          <FormDrawerContent>
            <div className="mb-3">
              <FormControl className="w-100">
                <TextField
                  autoFocus
                  id="code"
                  label={<IntlMessages id="pages.AffiliatesPage.btn.tracking_code" />}
                  value={code}
                  onChange={this.handleChange('code')}
                  margin="normal"
                  required
                />
                <FormHelperText className="mt-0"><IntlMessages id="pages.AffiliatesPage.btn.tracking_code_description"/></FormHelperText>
              </FormControl>
            </div>
            <div>
              {this.state.error ? <Typography className="text-danger"><IntlMessages id="pages.AffiliatesPage.trackingCode.label.error_msg" /></Typography> : ''}
            </div>
          </FormDrawerContent>

          <FormDrawerFooter>
            {!this.props.edit ? <Button
              type="submit"
              onClick={() => this.handleSubmit('addMore')}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader && this.state.submitBtn === 'addMore' ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_and_another" />}
            </Button> :''}
            <Button
              type="submit"
              onClick={() => this.handleSubmit('close')}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader && this.state.submitBtn === 'close' ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_and_close_btn" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>

        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ taxes, tenants, affiliates }) => {
  return {
    actionLoader: affiliates.get('actionLoader'),
    newTrackingCode: affiliates.get('newTrackingCode').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
    refetchTrackingCode: affiliates.get('refetchTrackingCode'),
  };
};
export default connect(
  mapStateToProps,
  {
    addTrackingCodes
  }

)(TrackingCodesForm);

