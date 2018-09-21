import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import { addTransactionFee } from '../actions';
import { fetchAllFees } from '../../../Fees/actions';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class TransactionForm extends React.Component {
  constructor(props){
    super();
    this.state = {
      selectFee: '',
      selectedFees: [],
    };
  }

  componentWillMount(){
    this.setState({
      selectedFees: this.props.selectedFees
    })
  }

  handleSubmit = () => {
    const { selectedFees } = this.state;
    const { currFees } = this.props;
    const currFeesIds = currFees.items ? currFees.items.map(fee => fee.id) : [];
    const feesIds = [];
    const data = {};

    selectedFees.map(fee => {
      let isAlready = false;
      isAlready = currFeesIds.indexOf(fee.id) !== -1 ? true : false;
      if (!isAlready) {
        feesIds.push(fee.id);
      }
    });
      data.ids = feesIds;
    if(feesIds.length){
      this.props.addTransactionFee({ data });
      this.setState({submit: true})
    }else{
      this.props.closeForm();
    }
  };

  componentWillReceiveProps(nextProps) {
    if(!nextProps.actionLoader && this.state.submit){
      this.setState({selectedFees:[], selectFee:'', submit: false})
      this.props.closeForm();
    }
  }

  componentWillMount() {
    this.props.fetchAllFees({ skip: 0, take: 100 });
  }

  handleChange = name => event => {
    this.setState({
      selectFee: event.target.value,
    });
  };

  onAddFees = () => {
    const { selectFee } = this.state;
    const { fees } = this.props;
    const selectedFees = this.state.selectedFees;
    let isAlready = false;
    selectedFees.map(select => {
      if (select.id === selectFee) {
        isAlready = true;
      }
    });

    if (!isAlready) {
      fees.items.map(fee => {
        if (selectFee === fee.id) {
          selectedFees.push({ name: fee.name, id: fee.id, feeCriteria: fee.feeCriteria });
        }
      });
    }
    this.setState({ selectedFees });
  };

  onDelete = id => {
    const selectedFees = this.state.selectedFees;
    selectedFees.map((fee, index) => {
      if (fee.id === id) {
        selectedFees.splice(index, 1);
      }
    });
    this.setState({ selectedFees });
  };

  onClose = () => {
    this.setState({selectedFees: [], selectFee: ''})
    this.props.closeForm();
  }

  render() {
    const { fees, currFees } = this.props;
    const { selectedFees } = this.state;
    const currFeesIds = currFees.items ? currFees.items.map(fee => fee.id) : [];
    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.onClose}>
          {!this.props.edit ? <IntlMessages id="pages.ticketTypesPage.CreateFee.label.add_title" /> : <IntlMessages id="pages.ticketTypesPage.CreateFee.label.edit_title" />}
        </FormDrawerHeader>
        <FormDrawerContent>
          <div className="mb-5 d-flex align-items-center">
            <FormControl className="mt-3 mb-3 w-50 mr-2">
              <InputLabel htmlFor="displayOption">
                <IntlMessages id="pages.ticketTypesPage.CreateFee.label.select_fee" />
              </InputLabel>
              <Select
                value={this.state.selectFee}
                onChange={this.handleChange('selectFee')}
                input={<Input id="displayOption" />}>
                <MenuItem value="">
                  <em>
                    <IntlMessages id="pages.questionPage.menu_item.none" />
                  </em>
                </MenuItem>
                {fees &&
                  fees.items.map((fee, index) => {
                    return (
                      currFeesIds.indexOf(fee.id) === -1 ?
                      <MenuItem key={fee.id} value={fee.id}>
                        {fee.name}
                      </MenuItem> : null
                    );
                  })}
              </Select>
            </FormControl>
            <div className="mr-4">{this.props.isFetching && <CircularProgress size={24} color="secondary" />}</div>
            <div>
              <Button onClick={this.onAddFees} className="mr-2" variant="raised" color="primary">
                <IntlMessages id="pages.ticketTypesPage.CreateFee.label.add_fee" />
              </Button>
            </div>
          </div>
          <div>
           {selectedFees.length ? <Typography className="my-3" variant="headline" color="textSecondary">
              <IntlMessages id="pages.ticketTypesPage.CreateFee.label.added_fees" />
            </Typography> : ''}

            {selectedFees &&
              selectedFees.map(fee => {
                return (
                  <Card key={fee.id} className="d-flex justify-content-between mb-3">
                    <CardContent className="d-flex  flex-column">
                      <Typography className="" variant="headline" color="textSecondary">
                        {fee.name}
                      </Typography>
                      <Typography className="" variant="subheading" color="textSecondary">
                        {fee.feeCriteria.strategy.factor === 'Percentage'
                          ? fee.feeCriteria.strategy.amount + '% with' + ' $' + fee.feeCriteria.minAmount + ' min ' + '$' + fee.feeCriteria.maxAmount + ' max'
                          : '$' + fee.feeCriteria.strategy.amount + ' Flat Rate'}
                      </Typography>
                    </CardContent>
                    <CardContent className="d-flex  flex-column">
                      <IconButton onClick={() => this.onDelete(fee.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </FormDrawerContent>
        <FormDrawerFooter>
        <Button onClick={this.handleSubmit}  variant="raised" color="primary" className="mt-1">
            {this.props.actionLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="pages.ticketTypesPage.addFees.btn.save" />}
          </Button>
          <Button onClick={this.onClose} color="secondary" className="mt-1">
            <IntlMessages id="pages.ticketTypesPage.addFees.btn.cancel" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ settings, tenants, transactionfee, fees }) => {
  return {
    width: settings.width,
    actionLoader: transactionfee.get('actionLoader'),
    fees: fees.get('fees').toJS(),
    isFetching: fees.get('isFetching'),
    tenantsByDomain: tenants.tenantsByDomain,
    currFees: transactionfee.get('transactionFee').toJS(),
  };
};

export default connect(
  mapStateToProps,
  { fetchAllFees, addTransactionFee },
)(TransactionForm);
