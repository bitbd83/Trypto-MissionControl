import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ChipInput from 'material-ui-chip-input'
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const country = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

class AddressQuestion extends React.Component {
    state = {
      open: false,
      country: [],
      type:'',
    };

    handleSubmit = (e) => {
      e.preventDefault();
    }

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    }

    handleChangeCountry = event => {
      this.setState({ country: event.target.value });
    };

    render() {
      return (
        <div>
          <FormControl className="w-100 mb-2">
            <TextField
              id="name"
              label={<IntlMessages id="pages.questionPage.label.question_type_address.name_label"/>}
              multiline
              rowsMax="4"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
            />
          <FormHelperText className="mt-0"><IntlMessages id="pages.questionPage.label.question_type_address.name_description"/></FormHelperText>
          </FormControl>

          <FormControl className="w-100 mb-2">
            <TextField
              id="title"
              label={<IntlMessages id="pages.questionPage.label.question_type_address.question_title_label"/>}
              multiline
              rowsMax="4"
              value={this.state.title}
              onChange={this.handleChange('title')}
              margin="normal"
              fullWidth
            />
          <FormHelperText className="mb-1 mt-0"><IntlMessages id="pages.questionPage.label.question_type_address.name_description"/></FormHelperText>
          </FormControl>

          <FormControl component="fieldset" className="w-100 mb-3">
            <FormControlLabel
                label={<IntlMessages id="pages.questionPage.label.question_type_address.google_autocomplete_label"/>}
              control={
                <Switch
                  checked={this.state.google_address}
                  onChange={this.handleChange('google_address')}
                  value="google_address"
                  classes={{
                    checked: 'text-success',
                    bar: 'bg-success',
                  }}
                />
              }
            />
            <FormHelperText className="mb-1"><IntlMessages id="pages.questionPage.label.question_type_address.google_autocomplete_description"/></FormHelperText>
          </FormControl>

          <FormControl component="fieldset" className="w-100 mb-3">
            <FormControlLabel
                label= {<IntlMessages id="pages.questionPage.label.question_type_address.country_restriction_label"/>}
              control={
                <Switch
                  checked={this.state.country_restrictions}
                  onChange={this.handleChange('country_restrictions')}
                  value="country_restrictions"
                  classes={{
                    checked: 'text-success',
                    bar: 'bg-success',
                  }}
                />
              }
            />
            <FormHelperText className="mb-1"><IntlMessages id="pages.questionPage.label.question_type_address.country_restriction_description"/></FormHelperText>
          </FormControl>

            <div className="mb-4">
              <FormControl className="col-12">
                <InputLabel htmlFor="select-countries"><IntlMessages id="pages.questionPage.label.question_type_address.select_country_label"/></InputLabel>
                <Select
                  multiple
                  value={this.state.country}
                  onChange={this.handleChangeCountry}
                  input={<Input id="select-countries" />}
                  renderValue={selected => (
                    <div className="d-flex flex-wrap">
                      {selected.map(value => <Chip key={value} label={value} className="m-1" />)}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {country.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      <Checkbox checked={this.state.country.indexOf(name) > -1} />
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="fixed-bottom border-top d-flex px-4 py-3 flex-row align-items-center d-block bg-white">
            {/* <FormDrawerFooter> */}
              <Button
                type="button"
                // onClick={this.handleSubmit}
                className="mr-2 mt-1"
                variant="raised"
                color="primary"
              >
                <IntlMessages id="pages.questionPage.btn.question_type_save"/>
            </Button>
            <Button onClick={this.props.closeForm} color="secondary" className="mt-1">
              <IntlMessages id="pages.questionPage.btn.question_type_cancel"/>
            </Button>
            {/* </FormDrawerFooter> */}
            </div>
        </div>
      );
    }
}

export default AddressQuestion;
