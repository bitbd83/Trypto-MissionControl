import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { addTaxGroup, patchTaxGroup } from '../actions';
import IntlMessages from 'util/IntlMessages';

class TaxGroupForm extends React.Component {
    state = {
      loading: false,
      groupData: {
        name: ''
      }
    };

    componentWillReceiveProps = (nextProps) => {
      let states = {};

      if(!nextProps.actionLoader && this.state.loading){
        this.setState({
          loading: false
        });
        if(nextProps.actionSuccess){
          this.props.closeForm()
        }
      }

      if(!this.state.loading && !nextProps.actionLoader){
        if(nextProps.edit)
          states['groupData'] = nextProps.data;
        else
          states['groupData'] = {
            name: ''
          };

        this.setState(states);
      }
    }

    handleChange = event => this.setState({
      groupData: {
        ...this.state.groupData,
        name: event.target.value,
      }
    });

    handleSubmit = event => {
      event.preventDefault();

      this.setState({loading: true})

      let data = {
        name: this.state.groupData.name
      };
      if(this.props.edit){
        this.props.patchTaxGroup({taxGroupId:this.state.groupData.id, data});
      } else {
        this.props.addTaxGroup({data});
      }
    }

    render() {
      const { loading, groupData } = this.state;
      return (
          <FormDrawer open={this.props.showForm} >
            <FormDrawerHeader
              closeClick={this.props.closeForm}
              >
              {this.props.edit ? (
                <IntlMessages id="pages.taxesPage.taxGroupForm.label.edit_tax" />
              ) : (
                <IntlMessages id="pages.taxesPage.taxGroupForm.label.add_tax" />
              )}
            </FormDrawerHeader>

            <FormDrawerContent>
              <p><IntlMessages id="pages.taxesPage.taxGroupForm.label.description" /></p>

              <div className="mb-2">
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label = {<IntlMessages id="pages.taxesPage.taxGroupForm.label.taxGroupName" />}
                  type="text"
                  required
                  disabled={loading}
                  value={groupData.name}
                  onChange={this.handleChange}
                  fullWidth
                />
              </div>
            </FormDrawerContent>

            <FormDrawerFooter closeClick={this.props.closeForm} >
              <Button
                type="submit"
                onClick={this.handleSubmit}
                className="mr-2"
                variant="raised"
                color="primary">
                {loading ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_btn" />}
              </Button>

              <Button onClick={this.props.closeForm} color="secondary">
                <IntlMessages id="button.cancel_btn" />
              </Button>
            </FormDrawerFooter>
          </FormDrawer>
      );
    }
}

const mapStateToProps = ({ taxes }) => {
  return {
    actionLoader: taxes.get('actionLoader'),
    refetchList: taxes.get('refetchList'),
    actionSuccess: taxes.get('actionSuccess'),
  };
};
export default connect(
  mapStateToProps,
  {
    addTaxGroup,
    patchTaxGroup,
  },
)(TaxGroupForm);

