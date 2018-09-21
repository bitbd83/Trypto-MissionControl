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
import { createInventory, patchInventory } from '../../actions';
import Typography from '@material-ui/core/Typography';
import * as Immutable from 'immutable';
import { createObject } from 'util/helpers';
import CircularProgress from '@material-ui/core/CircularProgress';

class CreateInventory extends React.Component {
  constructor(props) {
    super();
    const {data} = props;
    const inventoryData = props.data.optionType === 'Dedicated' && props.optionType === 'Dedicated' ? (data ? { ...data.inventory, stockSettings: {...data.stockSettings} } : {}) : {};
    const stockSettings = {
      lowStockText: 'Almost Sold Out',
      soldOutText: 'Sold Out',
      hideWhenOutOfStock: true,
      displayOption: 'AlwaysShow',
      lowStockThreshold: 1,
    };
    const inventoryName = !props.edit ? props.ticketTypeName+' Inventory' : '';
    this.state = {
      inventryData: {
        inventoryType: 'GaInventory',
        name: inventoryName,
        quota: 1,
        stockSettings: stockSettings,
        ...inventoryData,
      },
      patchData: {},
    };
  }

  onClose = () => {

  }


  handleChange = name => event => {
    let { inventryData, patchData } = this.state;
    let value = event.target ? event.target.value : event;

    if (this.props.edit) {
      const opType = this.props.data.inventory[name] !== undefined ? (!event.target.value.length ? 'remove' : 'replace') : 'add';
      patchData[name] = {
        value: value,
        op: opType,
        path: '/' + [name],
      };
      if (opType === 'remove') {
        delete patchData[name].value;
      }
    }

    (inventryData[name] = value),
      this.setState({
        inventryData,
        patchData,
      });
  };

  handleSwitchChange = name => (event, checked) => {
    let { inventryData, patchData } = this.state;

    if (this.props.edit) {
      const opType = this.props.data.stockSettings[name] !== undefined ? 'replace' : 'add';
      const checked = event.target.checked;
      patchData[name] = {
        value: checked,
        op: opType,
        path: '/stockSettings/' + [name],
      };
      if (opType === 'remove') {
        delete patchData[name].value;
      }
    }

    inventryData.stockSettings[name] = checked;

    this.setState({
      inventryData,
      patchData,
    });
  };

  handleChangeStock = name => event => {
    const { inventryData, patchData } = this.state;
    const value = event.target.value;

    if (this.props.edit) {
      const opType = this.props.data.stockSettings[name] !== undefined ? (!event.target.value.length ? 'remove' : 'replace') : 'add';
      patchData[name] = {
        value: value,
        op: opType,
        path: '/stockSettings/' + [name],
      };
      if (opType === 'remove') {
        delete patchData[name].value;
      }
    }

    inventryData.stockSettings[name] = value;
      this.setState({
        inventryData,
        patchData,
      });
    };

  handleSubmit = () => {
    const { inventryData, patchData } = this.state;
    const { optionType } = this.props;
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    if(this.props.edit){
      const data = [];
      data.push({value:this.props.data.inventory.id, op:'replace', path:'/inventoryId'})

     Object.keys(patchData).map(patch => data.push(patchData[patch]))
     if(Object.keys(data).length > 1){
        this.props.patchInventory({data, tenantId, eventId, ticketTypeId})
    }else{
      this.props.closeForm();
    }
    }else{
      inventryData.optionType = optionType;
      this.props.createInventory({ data: inventryData, tenantId, eventId, ticketTypeId });
    }
    this.setState({submit:true})
  };

  render() {
    const { inventryData } = this.state;
    return (
      <FormDrawer open={this.props.showForm}>
        <FormDrawerHeader closeClick={this.props.closeForm}>
          {!this.props.edit ? <IntlMessages id="pages.ticketTypesPage.Createinventory.label.add_title" /> : <IntlMessages id="pages.ticketTypesPage.Createinventory.label.edit_title" />}
        </FormDrawerHeader>
        <FormDrawerContent>
          <div className="mb-5">
            <FormControl className="w-100 mb-2">
              <TextField
                id="fieldName"
                label={<IntlMessages id="pages.ticketTypesPage.Createinventory.label.name" />}
                rowsMax="4"
                value={inventryData.name}
                onChange={this.handleChange('name')}
                margin="normal"
                fullWidth
              />
            </FormControl>

            <div className="w-25 mb-3">
              <FormControl className="w-100 my-3">
                <InputLabel htmlFor="quota">
                  <IntlMessages id="pages.ticketTypesPage.Createinventory.label.quota" />
                </InputLabel>
                <Input id="quota" value={inventryData.quota} onChange={this.handleChange('quota')} margin="none" inputProps={{ min: 0 }} type="number" />
              </FormControl>
            </div>
            <Typography variant={'subheading'} className={'form-drawer-section-header mb-3'} gutterBottom>
              <IntlMessages id="pages.ticketTypesPage.Createinventory.label.stock_settings" />
            </Typography>
            <div className="ml-4">
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

              <FormControl component="fieldset" className="w-100">
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
            {this.props.actionLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="button.save_and_close_btn" />}
          </Button>
          <Button onClick={this.props.closeForm} color="secondary" className="mt-1">
            <IntlMessages id="pages.questionPage.btn.question_type_cancel" />
          </Button>
        </FormDrawerFooter>
      </FormDrawer>
    );
  }
}

const mapStateToProps = ({ settings, ticketTypes, tenants }) => {
  return {
    width: settings.width,
    actionLoader: ticketTypes.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    newInventoryId: ticketTypes.get('newInventoryId'),
  };
};

export default connect(
  mapStateToProps,
  { createInventory, patchInventory },
)(CreateInventory);
