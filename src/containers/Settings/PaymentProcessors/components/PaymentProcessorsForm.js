import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { postStripeProcessor, patchStripeProcessor } from '../actions';
import Immutable from 'immutable';
import diff from 'immutablediff';

class PaymentProcessorsForm extends React.Component {
  constructor(props) {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      loading: false,
      selectedPayment: 'Stripe',
      stripeBody: {
        name: '',
        useSandbox: true,
        allowPartialRefunds: true,
        allowFullRefunds: true,
        allowVoidingOfTransactions: true,
        liveApiKey: '',
        testApiKey: '',
        testPublishableKey: '',
        livePublishableKey: '',
      },
    };
    return initialState;
  };

  componentWillReceiveProps = nextProps => {
    let states = {};

    if (!nextProps.postLoader && this.state.loading) {
      this.setState(
        {
          loading: false,
        },
        this.props.closeForm(),
      );
    }

    if (!this.state.loading && !nextProps.postLoader) {
      if (nextProps.edit) {
        states['stripeBody'] = this.pickRequired(nextProps.data);
        states['stripeBody']['liveApiKey'] = nextProps.data.stripeSettings.liveApiKey;
        states['stripeBody']['testApiKey'] = nextProps.data.stripeSettings.testApiKey;
        states['stripeBody']['testPublishableKey'] = nextProps.data.stripeSettings.testPublishableKey;
        states['stripeBody']['livePublishableKey'] = nextProps.data.stripeSettings.livePublishableKey;
        states['selectedPayment'] = nextProps.data.paymentGatewayType;
      } else {
        this.setState(this.getInitialState());
      }
      this.setState(states);
    }
  };

  pickRequired = obj => {
    let keys = ['name', 'useSandbox', 'allowPartialRefunds', 'allowFullRefunds', 'allowVoidingOfTransactions'];
    return Object.assign({}, ...keys.map(k => (k in obj ? { [k]: obj[k] } : {})));
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });

    if (this.state.selectedPayment === 'Stripe') {
      if (this.props.edit) {
        let { data } = this.props;
        let stripeData = {
          name: data.name,
          useSandbox: data.useSandbox,
          allowPartialRefunds: data.allowPartialRefunds,
          allowFullRefunds: data.allowFullRefunds,
          allowVoidingOfTransactions: data.allowVoidingOfTransactions,
          liveApiKey: data.stripeSettings.liveApiKey,
          testApiKey: data.stripeSettings.testApiKey,
          testPublishableKey: data.stripeSettings.testPublishableKey,
          livePublishableKey: data.stripeSettings.livePublishableKey,
        };

        var list = Immutable.Map(stripeData);
        let patchData = this.state.stripeBody;
        var ops = Immutable.Map(patchData);
        var patchedData = diff(list, ops);
        this.props.patchStripeProcessor({ processorId: data.id, data: patchedData });
      } else {
        this.props.postStripeProcessor({ data: this.state.stripeBody });
      }
    }
  };

  handleChange = name => event => {
    let data = {};
    if (name === 'selectedPayment') {
      this.setState({ selectedPayment: event.target.value });
    } else {
      data[name] = event.target.value;
      this.setState({
        stripeBody: {
          ...this.state.stripeBody,
          ...data,
        },
      });
    }
  };

  handleSwitchChange = name => (event, checked) => {
    this.setState({
      stripeBody: {
        ...this.state.stripeBody,
        [name]: checked,
      },
    });
  };

  handleCloseDrawer = () => {
    let states = this.getInitialState();
    this.setState(states);
    this.props.closeForm();
  };

  stripeView() {
    const { stripeBody } = this.state;
    return (
      <FormControl className="w-100">
        <div className="w-100 my-3">
          <TextField
            id="name"
            label={<IntlMessages id="containers.Settings.PaymentProcessors.processorName" />}
            type="text"
            required
            value={stripeBody.name}
            onChange={this.handleChange('name')}
            fullWidth
          />
        </div>
        <div className="w-100 my-3">
          <TextField
            id="liveApiKey"
            label={<IntlMessages id="containers.Settings.PaymentProcessors.liveApiKey" />}
            type="text"
            required
            value={stripeBody.liveApiKey}
            onChange={this.handleChange('liveApiKey')}
            fullWidth
          />
        </div>
        <div className="w-100 my-3">
          <TextField
            id="testApiKey"
            label={<IntlMessages id="containers.Settings.PaymentProcessors.testApiKey" />}
            type="text"
            required
            value={stripeBody.testApiKey}
            onChange={this.handleChange('testApiKey')}
            fullWidth
          />
        </div>
        <div className="w-100 my-3">
          <TextField
            id="livePublishableKey"
            label={<IntlMessages id="containers.Settings.PaymentProcessors.livePublishableKey" />}
            type="text"
            required
            value={stripeBody.livePublishableKey}
            onChange={this.handleChange('livePublishableKey')}
            fullWidth
          />
        </div>
        <div className="w-100 my-3">
          <TextField
            id="testPublishableKey"
            label={<IntlMessages id="containers.Settings.PaymentProcessors.testPublishableKey" />}
            type="text"
            required
            value={stripeBody.testPublishableKey}
            onChange={this.handleChange('testPublishableKey')}
            fullWidth
          />
        </div>
        <FormControl component="fieldset" className="w-100 my-3">
          <FormControlLabel
            control={
              <Switch
                checked={stripeBody.useSandbox}
                onChange={this.handleSwitchChange('useSandbox')}
                classes={{
                  checked: 'text-success',
                  bar: 'bg-success',
                }}
              />
            }
            label={<IntlMessages id="containers.Settings.PaymentProcessors.sandboxMode" />}
          />
        </FormControl>
      </FormControl>
    );
  }

  render() {
    const { loading, selectedPayment } = this.state;

    const paymentGetways = ['Stripe', 'Authorize .NET', 'Square'];

    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.handleCloseDrawer}>
          {this.props.edit ? <IntlMessages id="containers.Settings.PaymentProcessors.editPayment" /> : <IntlMessages id="containers.Settings.PaymentProcessors.addPayment" />}
        </FormDrawerHeader>
        <FormDrawerContent styleName="mb-5">
          <FormControl className="w-100 my-3">
            <InputLabel htmlFor="processor-type">
              <IntlMessages id="containers.Settings.PaymentProcessors.processorType" />
            </InputLabel>
            <Select value={selectedPayment} onChange={this.handleChange('selectedPayment')} input={<Input id="processor-type" />}>
              {paymentGetways.map((getway, index) => (
                <MenuItem key={index} value={getway}>
                  {getway}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedPayment === 'Stripe' && this.stripeView()}
        </FormDrawerContent>
        <FormDrawerFooter>
          <Button type="submit" onClick={this.handleSubmit} className="mr-2" variant="raised" color="primary">
            {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="pages.taxeRatePage.TaxRateForm.btn.save_add_close" />}
          </Button>
          <Button onClick={this.handleCloseDrawer} color="secondary">
            <IntlMessages id="button.cancel_btn" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ paymentprocessors }) => {
  return {
    postLoader: paymentprocessors.get('postLoader'),
    newProcessors: paymentprocessors.get('newProcessors').toJS(),
  };
};

export default connect(
  mapStateToProps,
  { postStripeProcessor, patchStripeProcessor },
)(PaymentProcessorsForm);
