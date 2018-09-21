import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import TextField from '@material-ui/core/TextField';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { fetchInventoryList } from '../../../Inventory/actions';
import { createInventory } from '../../actions';
import * as Immutable from 'immutable';
import { createObject } from 'util/helpers';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class SelectInventory extends React.Component {
  constructor(props) {
    super();
    this.state = {
      inventryData: {
        quota: '',
        name:'',
        InventoryId: '',
        inventoryType: 'GaInventory',
        optionType: 'Shared',
        stockSettings: {
          lowStockText: 'Almost Sold Out',
          soldOutText: 'Sold Out',
          hideWhenOutOfStock: true,
          displayOption: 'AlwaysShow',
          lowStockThreshold: 1,
        },
      },

    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.newInventoryId) {
      this.props.closeForm();
    }

    let tenantId = this.props.tenantsByDomain.id;

    if(nextProps.refetchInventory){
      this.props.fetchInventoryList({ tenantId, includeSharedOnly: true });
    }

    if (!this.props.inventory.items.length) {
      this.props.fetchInventoryList({ tenantId, includeSharedOnly: true });
    }
  }

  handleChange = name => event => {
    let { inventryData } = this.state;
    let value = event.target ? event.target.value : event;
    if(name === 'InventoryId'){
      this.props.inventory.items.map(inventory => {
        if(inventory.id === value){
          const quota = inventory.quota !== undefined ? inventory.quota : '';
          const Name = inventory.name !== undefined ? inventory.name : '';
          inventryData.quota = quota
          inventryData.name = Name
        }
      })
    }

    (inventryData[name] = value),
      this.setState({
        inventryData
      });
  };

  handleSwitchChange = name => (event, checked) => {
    let { inventryData } = this.state;
    inventryData.stockSettings[name] = checked;
    this.setState({
      inventryData,
    });
  };

  handleChangeStock = name => event => {
    const { inventryData } = this.state;
    const value = event.target.value;

    inventryData.stockSettings[name] = value;
    this.setState({
      inventryData,
    });
  };

  handleSubmit = () => {
    const { inventryData } = this.state;
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    let data = {};
    const { InventoryId, inventoryType, stockSettings, optionType } = inventryData;
    data = {InventoryId, inventoryType, stockSettings, optionType }

    this.props.createInventory({ data, tenantId, eventId, ticketTypeId });
    this.setState({submit: true})
  };

  render() {
    const { inventryData } = this.state;
    const { inventory } = this.props;
    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.props.closeForm}>
          {!this.props.edit ? <IntlMessages id="pages.ticketTypesPage.SelectIventory.label.select_inventory" /> : <IntlMessages id="pages.ticketTypesPage.SelectIventory.label.select_inventory" />}
        </FormDrawerHeader>
        <FormDrawerContent>
          <div className="mb-5">
            <FormControl className="my-3 w-50 mr-2">
              <InputLabel htmlFor="InventoryId">
                <IntlMessages id="pages.ticketTypesPage.SelectIventory.label.select_inventory" />
              </InputLabel>
              <Select value={this.state.inventryData.InventoryId} onChange={this.handleChange('InventoryId')} input={<Input id="InventoryId" />}>
                <MenuItem value="">
                  <em>
                    <IntlMessages id="pages.questionPage.menu_item.none" />
                  </em>
                </MenuItem>
                {inventory &&
                  inventory.items.map((invet, index) => {
                    return (
                      <MenuItem key={invet.id} value={invet.id}>
                        {invet.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

           {inventryData.InventoryId && inventryData.quota ? <div className="w-25">
              <FormControl className="w-100 my-3">
                <InputLabel htmlFor="quota">
                  <IntlMessages id="pages.ticketTypesPage.Createinventory.label.quota" />
                </InputLabel>
                <Input disabled id="quota" value={inventryData.quota} margin="none" inputProps={{ min: 0 }} type="number" />
              </FormControl>
            </div> : ''}

             <Typography variant={'subheading'} className={'form-drawer-section-header mt-4 mb-2'} gutterBottom>
              <IntlMessages id="pages.ticketTypesPage.Createinventory.label.stock_settings" />
            </Typography>
            <div className="ml-4">
              <div className="w-50">
                <FormControl className="w-100 my-3">
                  <InputLabel htmlFor="lowStockThreshold">
                    <IntlMessages id="pages.ticketTypesPage.Createinventory.label.lowStockThreshold" />
                  </InputLabel>
                  <Input
                    id="lowStockThreshold"
                    value={inventryData.stockSettings ? inventryData.stockSettings.lowStockThreshold : ''}
                    onChange={this.handleChangeStock('lowStockThreshold')}
                    margin="none"
                    inputProps={{ min: 0 }}
                    type="number"
                  />
                </FormControl>
              </div>
              <div className="w-50">
                <TextField
                  className="my-3"
                  label={<IntlMessages id="pages.ticketTypesPage.Createinventory.label.lowStockText" />}
                  value={inventryData.stockSettings ? inventryData.stockSettings.lowStockText : ''}
                  onChange={this.handleChangeStock('lowStockText')}
                  fullWidth
                />

                <TextField
                  className="my-3"
                  label={<IntlMessages id="pages.ticketTypesPage.Createinventory.label.soldOutText" />}
                  value={inventryData.stockSettings ? inventryData.stockSettings.soldOutText : ''}
                  onChange={this.handleChangeStock('soldOutText')}
                  fullWidth
                />
              </div>
              <FormControl component="fieldset" className="mt-2 w-100">
                <FormControlLabel
                  label={<IntlMessages id="pages.ticketTypesPage.Createinventory.label.hideWhenOutOfStock" />}
                  control={
                    <Switch
                      checked={inventryData.stockSettings ? inventryData.stockSettings.hideWhenOutOfStock : false}
                      onChange={this.handleSwitchChange('hideWhenOutOfStock')}
                      classes={{
                        checked: 'text-success',
                        bar: 'bg-success',
                      }}
                    />
                  }
                />
              </FormControl>
              <FormControl className="mt-3 mb-3 w-50">
                <InputLabel htmlFor="displayOption">
                  <IntlMessages id="pages.ticketTypesPage.Createinventory.label.inventoryDisplayOption" />
                </InputLabel>
                <Select value={inventryData.stockSettings ? inventryData.stockSettings.displayOption : ''} onChange={this.handleChangeStock('displayOption')} input={<Input id="displayOption" />}>
                  <MenuItem value="">
                    <em>
                      <IntlMessages id="pages.questionPage.menu_item.none" />
                    </em>
                  </MenuItem>
                  <MenuItem value="AlwaysShow">
                    <IntlMessages id="pages.ticketTypesPage.Createinventory.menuItem.alwaysShow" />
                  </MenuItem>
                  <MenuItem value="ShowWhenLow">
                    <IntlMessages id="pages.ticketTypesPage.Createinventory.menuItem.showWhenLow" />
                  </MenuItem>
                  <MenuItem value="NeverShow">
                    <IntlMessages id="pages.ticketTypesPage.Createinventory.menuItem.neverShow" />
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </FormDrawerContent>
        <FormDrawerFooter>
          <Button type="submit" onClick={this.handleSubmit} className="mr-2" variant="raised" color="primary">
            {this.props.actionLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="button.select_and_close_btn" />}
          </Button>
          <Button onClick={this.props.closeForm} color="secondary" className="mt-1">
            <IntlMessages id="pages.questionPage.btn.question_type_cancel" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ settings, inventory, tenants, ticketTypes }) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    inventory: inventory.get('inventoryList').toJS(),
    isFetching: inventory.get('isFetching'),
    actionLoader: ticketTypes.get('actionLoader'),
    newInventoryId: ticketTypes.get('newInventoryId'),
    refetchInventory: ticketTypes.get('refetchInventory'),
  };
};

export default connect(
  mapStateToProps,
  { fetchInventoryList, createInventory },
)(SelectInventory);
