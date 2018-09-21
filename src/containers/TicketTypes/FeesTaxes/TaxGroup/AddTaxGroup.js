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
import { fetchAllTaxGroup } from '../../../Taxes/TaxGroup/actions';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { addTaxGroup } from '../../actions';

class AddTaxGroup extends React.Component {
  state = {
    selectTaxGroup: '',
    selectedTaxGroup: {},
  };

  componentWillReceiveProps(nextProps) {
    if(!nextProps.actionLoader && this.state.submit){
      this.setState({selectedTaxGroup:[], selectTaxGroup:'', submit: false})
      this.props.closeForm();
    }
  }

  onCloseTaxGroupForm = () => {
    const { selectedTaxGroup } = this.state;
    if (selectedTaxGroup.name) {
      this.props.onCloseTaxGroupForm(this.state.selectedTaxGroup);
    }
    this.setState({ selectTaxGroup: '', selectedTaxGroup: {} });
    this.props.closeForm();
  };

  handleSubmit = () => {
    const { eventId, ticketTypeId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    const { selectedTaxGroup } = this.state;
    const { currTaxGroup } = this.props;
    const currTaxIds = currTaxGroup.items ? currTaxGroup.items.map(tax => tax.id) : [];
    const taxGroupId = selectedTaxGroup.id;

    if(currTaxIds.indexOf(taxGroupId) === -1){
      this.props.addTaxGroup({ taxGroupId, tenantId, eventId, ticketTypeId });
      this.setState({submit: true})
    }else{
      this.setState({selectTaxGroup: '', selectedTaxGroup: {}});
      this.props.closeForm();
    }
  };

  componentWillMount() {
    this.props.fetchAllTaxGroup({ skip: 0, take: 100 });
  }

  handleChange = name => event => {
    this.setState({
      selectTaxGroup: event.target.value,
    });
  };

  onAddTaxGroup = () => {
    const { selectTaxGroup } = this.state;
    const { taxGroups } = this.props;
    const selectedTaxGroup = this.state.selectedTaxGroup;

    taxGroups.items.map(tax => {
      if (selectTaxGroup === tax.id) {
        selectedTaxGroup.name = tax.name;
        selectedTaxGroup.id = tax.id;
      }
    });

    this.setState({ selectedTaxGroup });
  };

  onDeleteTaxGroup = () => {
    this.setState({ selectedTaxGroup: {} });
  };

  onClose = () => {
    this.setState({selectedFees: [], selectFee: ''})
    this.props.closeForm();
  }


  render() {
    const { taxGroups, currTaxGroup } = this.props;
    const { selectedTaxGroup } = this.state;
    const currTaxIds = currTaxGroup.items ? currTaxGroup.items.map(tax => tax.id) : [];
    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.onClose}>
          {!this.props.edit ? <IntlMessages id="pages.ticketTypesPage.CreateTaxGroup.label.add_title" /> : <IntlMessages id="pages.ticketTypesPage.CreateTaxGroup.label.edit_title" />}
        </FormDrawerHeader>
        <FormDrawerContent>
          <div className="mb-5 d-flex align-items-center">
            <FormControl className="mt-3 mb-3 w-50 mr-2">
              <InputLabel htmlFor="displayOption">
                <IntlMessages id="pages.ticketTypesPage.CreateTaxGroup.label.select_tax_group" />
              </InputLabel>
              <Select value={this.state.selectTaxGroup} onChange={this.handleChange('selectTaxGroup')} input={<Input id="displayOption" />}>
                <MenuItem value="">
                  <em>
                    <IntlMessages id="pages.questionPage.menu_item.none" />
                  </em>
                </MenuItem>
                {taxGroups &&
                  taxGroups.items.map((tax, index) => {
                    return (
                      currTaxIds.indexOf(tax.id) === -1 ?
                        <MenuItem key={tax.id} value={tax.id}>
                          {tax.name}
                        </MenuItem> : null
                    );
                  })}
              </Select>
            </FormControl>
            <div className="mr-4">{this.props.isFetching && <CircularProgress size={24} color="secondary" />}</div>
            <div>
              <Button onClick={this.onAddTaxGroup} className="mr-2" variant="raised" color="primary">
                <IntlMessages id="pages.ticketTypesPage.CreateTaxGroup.label.add" />
              </Button>
            </div>
          </div>
          <div>
            {selectedTaxGroup.name !== undefined ? <Typography className="my-3" variant="headline" color="textSecondary">
              <IntlMessages id="pages.ticketTypesPage.CreateFee.label.added_taxGroup" />
            </Typography> : ''}

            {selectedTaxGroup.name !== undefined && (
              <Card className="d-flex justify-content-between align-items-center mb-3">
                <CardContent className="d-flex  flex-column">
                  <Typography className="" variant="headline" color="textSecondary">
                    {selectedTaxGroup.name}
                  </Typography>
                </CardContent>
                <CardContent className="d-flex  flex-column">
                  <IconButton onClick={this.onDeleteTaxGroup}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            )}
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

const mapStateToProps = ({ settings, ticketTypes, taxes, tenants }) => {
  return {
    width: settings.width,
    actionLoader: ticketTypes.get('actionLoader'),
    isFetching: taxes.get('isFetching'),
    taxGroups: taxes.get('taxGroups').toJS(),
    currTaxGroup: ticketTypes.get('taxGroup').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
  };
};

export default connect(
  mapStateToProps,
  { fetchAllTaxGroup, addTaxGroup },
)(AddTaxGroup);
