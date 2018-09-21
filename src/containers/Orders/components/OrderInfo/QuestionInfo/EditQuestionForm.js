import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
// import { addFees, patchCode, postCode } from '../actions';
import IntlMessages from 'util/IntlMessages';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select'
import Dropdown from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class EditQuestionForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      const initialState = {
        questions: [
          {
            question:"What do you want to food?",
            answer: "Sandwices",
            type: "text",
          },
          {
            question:"Select your favorite sports?",
            answer: "cricket,football",
            type: "multi-choice",
          },
          {
            question:"What Drink Would You Like?",
            answer: "tea",
            type: "single-choice",
          }
        ],
      };
      return initialState;
    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    handleChange = (index) => event => {
      const value = event.target ? event.target.value : event;
      const { questions } = this.state;
      questions[index].answer = value;
      this.setState({questions})
    }

    render() {
      const { questions } = this.state;
      return (
        <FormDrawer open={this.props.showForm}>

          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
              <IntlMessages id="containers.orders.orderInfo.edit_buyer_questions" />
          </FormDrawerHeader>

          <FormDrawerContent>
            {questions.map((q, index)=>{
              return  <div className="my-4">
              <Typography variant="subheading" className="mb-2">
                {q.question}
              </Typography>
              {q.type === 'text' ? <FormControl className="w-100 mb-2 mx-2">
                <TextField
                  id="fieldName"
                  // label="Answer"
                  multiline
                  rowsMax="4"
                  value={q.answer}
                  // onChange={this.handleChange('fieldName')}
                  margin="normal"
                  className="m-0"
                  fullWidth
                />
              </FormControl> :''}
              {q.type === 'multi-choice' ?
                <FormControl className="w-100 ml-2 mb-2">
                  <Select
                    placeholder={<IntlMessages id="component.geography.stateSelect.placeHolder" />}
                    value={q.answer}
                    multi={true}
                    onChange={this.handleChange(index)}
                    options={[{label:'cricket', value:'cricket'}, {label:'football', value:'football'}]}
                    joinValues={true}
                    simpleValue={true}
                  />
              </FormControl>: ''}
              {q.type === 'single-choice' ?
                <Dropdown
                  value={q.answer}
                  onChange={this.handleChange(index)}
                  input={<Input id="questionType"/>}
                  className="w-25 ml-2 "
                  >
                  <MenuItem value="">
                      <em><IntlMessages id="pages.questionPage.menu_item.none"/></em>
                  </MenuItem>
                  <MenuItem value="tea">Tea</MenuItem>
                  <MenuItem value="coffee">Coffee</MenuItem>
                  <MenuItem value="juice">Juice</MenuItem>

              </Dropdown>: ''}

        </div>
            })}

          </FormDrawerContent>

          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleCloseDrawer}
              className="mr-2"
              variant="raised"
              color="primary">
              {this.props.actionLoader ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="button.save_btn" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>

        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ taxes, tenants, discountCodes }) => {
  return {
    actionLoader: discountCodes.get('actionLoader'),
    tenantsByDomain: tenants.tenantsByDomain,
    newCode: discountCodes.get('newCode').toJS(),
  };
};
export default connect(
  mapStateToProps,
)(EditQuestionForm);

