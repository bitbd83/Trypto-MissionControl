import React from 'react';
import TicketSidebar from '../Sidebar';
import CustomScrollbars from 'util/CustomScrollbars';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IntlMessages from 'util/IntlMessages';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { addPaidTicketType, patchTicketType } from '../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

const SelectInterval = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class CreatePaidTicket extends React.Component {
  constructor(props) {
    super();
    const data = props.data;
    this.state = {
      ticketData: {
        name: '',
        subTitle: '',
        description: '',
        price: '',
        parentTicketType: '',
        limitsPerOrder: {
          from: 1,
          to: 20,
        },
        selectionInterval: 1,
        ...data,
      },
      patchTicket: {},
      submitBtn: '',
      mounted: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { submitBtn } = this.state;
    const { data } = this.props;
    const newTicketId = nextProps.newTicketId;
    if (newTicketId) {
      if (submitBtn === 'continue') {
        debugger
        this.props.history.push(`/app/events/${this.props.match.params.eventId}/ticket-types/${newTicketId}/options`);
      }
      if (submitBtn === 'back') {
        this.setState({
          ticketData: {
            name: '',
            subTitle: '',
            description: '',
            price: '',
            parentTicketType: '',
            limitsPerOrder: {from: '', to: ''},
            selectionInterval: 1,
          },
          patchTicket: {},
          submitBtn: '',
        });
      }
    }
  }

  handleChange = name => event => {
    const { ticketData, patchTicket } = this.state;
    const { ticketTypeId } = this.props.match.params;
    let value = event.target.value;
    ticketData[name] = value;

    if (ticketTypeId) {
      const opType = this.props.data[name] !== undefined ? (!event.target.value.toString().length ? 'remove' : 'replace') : 'add';
      patchTicket[name] = {
        value: value,
        op: opType,
        path: '/' + [name],
      };
      if (opType === 'remove') {
        delete patchTicket[name].value;
      }
    }

    this.setState({
      ticketData,
      patchTicket,
    });
  };

  handleRange = name => event => {
    const { ticketData, patchTicket } = this.state;
    const { ticketTypeId } = this.props.match.params;
    let value = event.target.value;

    if (ticketTypeId) {
      const opType = this.props.data.limitsPerOrder[name] !== undefined ? (!event.target.value.toString().length ? 'remove' : 'replace') : 'add';
      patchTicket[name] = {
        value: value,
        op: opType,
        path: '/limitsPerOrder/' + [name],
      };
      if (opType === 'remove') {
        delete patchTicket[name].value;
      }
    }

    ticketData.limitsPerOrder[name] = value;

    this.setState({
      ticketData,
      patchTicket,
    });
  };

  handleSubmit = btnType => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.setState({ submitBtn: btnType });
    const { name, subTitle, description, price, limitsPerOrder, selectionInterval } = this.state.ticketData;
    const { patchTicket } = this.state;
    const patchData = [];
    const data = {
      name,
      subTitle,
      description,
      price,
      style: 'Paid',
      limitsPerOrder,
      selectionInterval,
    };

    if (ticketTypeId) {
      Object.keys(patchTicket).map(key => {
        patchData.push(patchTicket[key]);
      });
      this.props.patchTicketType({ data: patchData, tenantId, eventId, ticketTypeId });
    } else {
      this.props.addPaidTicketType({ tenantId, data, eventId });
    }
  };

  onCancel = () => {
    this.props.history.goBack()
  };

  render() {
    const { ticketData } = this.state;
    const { data } = this.props;
    const { eventId, ticketTypeId } = this.props.match.params;
    return (
      <div className="app-module animated slideInUpTiny animation-duration-3">
        <div className="app-module-sidenav d-none d-xl-flex">
          <TicketSidebar
            eventId={eventId}
            currType="Manage Basics"
            ticketTypeId={ticketTypeId}
            width={this.props.width}
            heading={<IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.sidebar_heading" />}
            history={this.props.history}
            optionType="event"
            backLink={{url: `/app/events/${eventId}/ticket-types${ticketTypeId ? '/'+ticketTypeId +'/options' : ''}/options`, label: ticketTypeId ? <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.backTicketOptions" /> : <IntlMessages id="appModule.back" />}}
          />
        </div>

        <div className="module-box">
          <div className="module-box-header">
            <h2 className="mb-1 mt-1">
              {data ? data.name :
              <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.title" />}
            </h2>
            <p className="m-0">
              <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.description" />
            </p>
          </div>
          <div className="module-box-content">
            <CustomScrollbars className="module-list-scroll scrollbar" style={{ height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 130px)' }}>
              <div className="mb-2 p-4">
                <FormControl className="w-100 mb-2">
                  <TextField
                    id="name"
                    label={<IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.name" />}
                    rowsMax="4"
                    value={ticketData.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    fullWidth
                  />
                </FormControl>

                <FormControl className="w-100 mb-2">
                  <TextField
                    id="subTitle"
                    label={<IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.sub_title" />}
                    multiline
                    rowsMax="4"
                    value={ticketData.subTitle}
                    onChange={this.handleChange('subTitle')}
                    margin="normal"
                    fullWidth
                  />
                </FormControl>
                <FormControl className="w-100 mb-2">
                  <TextField
                    id="description"
                    label={<IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.description" />}
                    multiline
                    rowsMax="4"
                    value={ticketData.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    fullWidth
                  />
                </FormControl>
                <div className="w-25">
                  <FormControl className="w-100 my-3">
                    <InputLabel htmlFor="price">
                      <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.price" />
                    </InputLabel>
                    <Input
                      id="price"
                      value={ticketData.price}
                      onChange={this.handleChange('price')}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      margin="none"
                      inputProps={{ min: 0 }}
                      type="number"
                    />
                  </FormControl>
                </div>
                {/* <FormControl className="w-25 mt-3 mb-1">
                  <InputLabel htmlFor="parentTicketType">
                    <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.parentTicketType" />
                  </InputLabel>
                  <Select disabled value={ticketData.parentTicketType} onChange={this.handleChange('parentTicketType')} input={<Input id="parentTicketType" />}>
                    <MenuItem value="">
                      <em>
                        <IntlMessages id="pages.questionPage.menu_item.none" />
                      </em>
                    </MenuItem>
                    <MenuItem value="" />
                    <MenuItem value="" />
                  </Select>
                </FormControl> */}
                <FormHelperText className="mt-1 mb-3">
                  <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.parentTicketType_description" />
                </FormHelperText>

                <div className="d-flex flex-row mb-2 w-50">
                  <FormControl className="col-6 mr-2">
                    <InputLabel htmlFor="limitsPerOrderFromRange">
                      <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.minPerOrder" />
                    </InputLabel>
                    <Input inputProps={{ min: 0 }}  type="number" id="limitsPerOrderFromRange" value={ticketData.limitsPerOrder.from} onChange={this.handleRange('from')} />
                  </FormControl>

                  <FormControl className="col-6 ml-2">
                    <InputLabel htmlFor="limitsPerOrderToRange">
                      <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.maxPerOrder" />
                    </InputLabel>
                    <Input inputProps={{ min: 0 }} type="number" id="limitsPerOrderToRange" value={ticketData.limitsPerOrder.to} onChange={this.handleRange('to')} />
                  </FormControl>
                </div>
                <FormHelperText className="mb-1">
                  <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.min_max_order_description" />
                </FormHelperText>

                <FormControl className="w-25 mt-3 mb-1">
                  <InputLabel htmlFor="selectionInterval">
                    <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.selectionOffset" />
                  </InputLabel>
                  <Select value={ticketData.selectionInterval} onChange={this.handleChange('selectionInterval')} input={<Input id="selectionInterval" />}>
                    {SelectInterval.map(inter => {
                      return (
                        <MenuItem key={inter} value={inter}>
                          {inter}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormHelperText className="mt-1 mb-3">
                  <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.label.selectionOffset_description" />
                </FormHelperText>

                <div className="mt-4">
                  <Button type="submit" onClick={() => this.handleSubmit('continue')} className="mr-2" variant="raised" color="primary">
                    {this.props.actionLoader && this.state.submitBtn === 'continue' ? (
                      <CircularProgress size={20} style={{ color: 'white' }} />
                    ) : (
                     <IntlMessages id="pages.ticketTypesPage.cretePaidTicket.btn.save" />
                    )}
                  </Button>
                  <Button onClick={this.onCancel} color="secondary">
                    <IntlMessages id="button.cancel_btn" />
                  </Button>
                </div>
              </div>
            </CustomScrollbars>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, ticketTypes, tenants }) => {
  return {
    width: settings.width,
    actionLoader: ticketTypes.get('actionLoader'),
    submitStatus: ticketTypes.get('submitStatus'),
    newTicketId: ticketTypes.get('newTicketId'),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};

export default connect(
  mapStateToProps,
  { addPaidTicketType, patchTicketType },
)(CreatePaidTicket);
