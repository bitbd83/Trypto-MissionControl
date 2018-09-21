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
import { addAffiliates, patchAffiliate } from '../actions';
import IntlMessages from 'util/IntlMessages';
import { getRandomCode } from '../../../util/helpers'
import FormHelperText from '@material-ui/core/FormHelperText';


class AffiliateForm extends React.Component {
    constructor (props) {
      super();
      this.state = this.getInitialState(props);
    }

    getInitialState = (props) => {
      const editForm = props.edit;
      const name = props.data ? props.data.name : '';
      const initialState = {
        loading: editForm,
        edit: false,
          name: name,
          code: '',
        submitBtn:'',
      };
      return initialState;
    }

    componentWillReceiveProps = (nextProps) => {
      if(nextProps.data){
        // this.setState({affiliateData: {...nextProps.data}})
      }
      if(!nextProps.actionLoader && this.state.submit){
        this.setState({name:'', code: '', submit: false})
        if(this.state.submitBtn === 'close'){
          this.handleCloseDrawer();
        }
      }

      if(!nextProps.edit && nextProps.showForm !== this.props.showForm){
        this.setState({code: getRandomCode(6), error: false})
      }
    }

    handleChange = (key) => event => {
      this.setState({[key] : event.target.value})
    }

    handleSubmit = btnType => {
      this.setState({submitBtn:btnType, submit: true})
      const tenantId = this.props.tenantsByDomain.id;
      const affiliateId = this.props.data.id;
      const { name, code } = this.state;
      if(this.props.edit){
        const data = [{
                        value: name,
                        op: 'replace',
                        path: '/name'
                      }]
        this.props.patchAffiliate({tenantId, affiliateId, data})
      }else{
        const data = {
          affiliate: { name },
          trackingCode: { code },
        }
        this.props.addAffiliates({tenantId, data})
      }
    }

    handleCloseDrawer = () => {
      // let states = this.getInitialState();
      // this.setState(states);
      this.props.closeForm();
    }

    render() {
      const { loading, code, name } = this.state;
      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
            {this.props.edit ? (
              <IntlMessages id="pages.AffiliatesPage.label.edit_title" />
            ) : (
              <IntlMessages id="pages.AffiliatesPage.btn.add_affiliates" />
            )}
          </FormDrawerHeader>

          <FormDrawerContent>
            <div className="mb-3">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={<IntlMessages id="pages.AffiliatesPage.btn.name_label" />}
                type="text"
                required
                value={name}
                onChange={this.handleChange('name')}
                fullWidth
              />

              {!this.props.edit ? <FormControl className="w-100">
                <TextField
                  id="code"
                  label={<IntlMessages id="pages.AffiliatesPage.btn.tracking_code" />}
                  value={code}
                  onChange={this.handleChange('code')}
                  margin="normal"
                required
                />
                <FormHelperText className="mt-0"><IntlMessages id="pages.AffiliatesPage.btn.tracking_code_description"/></FormHelperText>
              </FormControl> :''}
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
    tenantsByDomain: tenants.tenantsByDomain,
    newAffiliate: affiliates.get('newAffiliate').toJS(),
    refetchAffiliates: affiliates.get('refetchAffiliates'),
  };
};
export default connect(
  mapStateToProps,
  {
    addAffiliates,
    patchAffiliate
  },
)(AffiliateForm);

