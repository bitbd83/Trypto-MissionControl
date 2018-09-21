import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { postEventPaymentProcessor } from '../actions';

class PaymentProcessorForm extends React.Component {
  constructor(props) {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initialState = {
      loading: false,
      paymentProcessorValue: '',
    };
    return initialState;
  };

  componentWillReceiveProps = nextProps => {
    const { paymentProcessor, paymentProcessors } = nextProps;
    if (!this.state.loading && !nextProps.paymentLoader) {
      if (paymentProcessor && paymentProcessor.paymentProcessor && paymentProcessor.paymentProcessor.id) {
        this.setState({ paymentProcessorValue: paymentProcessor.paymentProcessor.id });
      } else {
        this.setState({ paymentProcessorValue: '' });
      }
    }
    if (!nextProps.paymentLoader && this.state.loading) {
      this.setState({ loading: false }, this.props.closeForm());
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    let data = {
      processorId: this.state.paymentProcessorValue,
      percentageSplit: 0,
      splitStrategy: {
        amount: 0,
        factor: 'Percentage',
      },
    };
    this.props.postEventPaymentProcessor({ eventId: this.props.eventById.id, data });
  };

  handleChange = event => {
    this.setState({ paymentProcessorValue: event.target.value });
  };

  handleCloseDrawer = () => {
    let states = this.getInitialState();
    this.setState(states);
    this.props.closeForm();
  };

  render() {
    const { loading, paymentProcessorValue } = this.state;
    const { paymentProcessors, eventById } = this.props;

    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.handleCloseDrawer}>
          {eventById &&
            eventById.title && (
              <span>
                <IntlMessages id="containers.Events.EventOptions.PaymentProcessor.assignPaymentProcessor" /> {eventById.title}
              </span>
            )}
        </FormDrawerHeader>
        <FormDrawerContent styleName="mb-5">
          <FormControl className="col-lg-7 col-sm-9 col-12 my-3">
            <InputLabel htmlFor="processor-type">
              <IntlMessages id="containers.Events.EventOptions.PaymentProcessor.paymentProcessor" />
            </InputLabel>
            <Select value={paymentProcessorValue} onChange={this.handleChange.bind(this)} input={<Input id="processor-type" />}>
              {paymentProcessors &&
                paymentProcessors.items &&
                paymentProcessors.items.map((getway, index) => (
                  <MenuItem key={index} value={getway.id}>
                    {`${getway.name} - ${getway.paymentGatewayType}`}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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

const mapStateToProps = ({ createanevent, eventoptions, paymentprocessors }) => {
  const { paymentProcessor, paymentLoader } = eventoptions;
  const { eventById } = createanevent;
  return { paymentProcessor, eventById, paymentLoader, paymentProcessors: paymentprocessors.get('paymentProcessors').toJS() };
};

export default connect(
  mapStateToProps,
  { postEventPaymentProcessor },
)(PaymentProcessorForm);
