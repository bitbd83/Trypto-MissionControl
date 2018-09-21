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
import TextQuestion from '../QuestionDetail/text'
import ChoiceQuestion from '../QuestionDetail/choice'
import AddressQuestion from '../QuestionDetail/address'
import FormHelperText from '@material-ui/core/FormHelperText';
import { connect } from 'react-redux';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';


class QuestionGroupForm extends React.Component {
  state = {
    questionType:'',
    loading: false,
    questionData: {},
    // edit: true,
  };

  componentWillReceiveProps = (nextProps) => {
    let states = {};

    if(!nextProps.showForm){
      this.setState({questionType:'', questionData: {}})
    }

    if(!this.state.loading){
      if(nextProps.edit){
        states['questionData'] = nextProps.data;
        states['questionType'] = nextProps.data.fieldType;
      }
      else
        states['questionData'] = {};
      this.setState(states);
    }
  }

  onSaveQuestion = (value) => {
    this.setState({saveQuestion:true})
    e.preventDefault();
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({
      [name]: event.target.value
    });
  }



  render() {
    return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.props.closeForm}>
            {!this.props.edit ? (
              <IntlMessages id="pages.questionPage.btn.no_quetion_added" />
            ) : (
              <IntlMessages id="pages.questionPage.btn.edit_question" />
            )}
          </FormDrawerHeader>

          <FormDrawerContent>
            <form autoComplete="off" noValidate onSubmit={this.onSaveQuestion}>
              <div className="mb-2">
                <FormControl className="w-100 mb-2">
                  <InputLabel htmlFor="questionType"><IntlMessages id="pages.questionPage.label.select_question_type" /></InputLabel>
                      <Select
                        disabled={this.props.edit}
                        value={this.state.questionType}
                        onChange={this.handleChange('questionType')}
                        input={<Input id="questionType"/>}
                        >
                        <MenuItem value="">
                            <em><IntlMessages id="pages.questionPage.menu_item.none"/></em>
                        </MenuItem>
                        <MenuItem value="Select"><IntlMessages id="pages.questionPage.menu_item.choice_question"/></MenuItem>
                        <MenuItem value="Text"><IntlMessages id="pages.questionPage.menu_item.text_question"/></MenuItem>
                        {/* <MenuItem value="Address"><IntlMessages id="pages.questionPage.menu_item.address_question"/></MenuItem> */}
                      </Select>
                  </FormControl>
                  <FormHelperText><IntlMessages id="pages.questionPage.label.select_question_type_description" /></FormHelperText>
                </div>
                {this.state.questionType === 'Text' && <TextQuestion edit={this.props.edit} questionData={this.props.data} closeForm = {this.props.closeForm}/>}
                {this.state.questionType === 'Select' && <ChoiceQuestion edit={this.props.edit} questionData={this.props.data} closeForm = {this.props.closeForm}/>}
                {/* {this.state.questionType === 'Address' && <AddressQuestion edit={this.props.edit} questionData={this.props.data} closeForm = {this.props.closeForm}/>} */}
                {this.state.questionType ? this.props.MandatoryInput : ''}
                </form>
              </FormDrawerContent>
                  {!this.state.questionType && <FormDrawerFooter>
                    <Button onClick={this.props.closeForm} color="secondary" className="mt-1">
                    <IntlMessages id="pages.questionPage.btn.question_type_cancel"/>
                  </Button>
                  </FormDrawerFooter>}
        </FormDrawer>
    );
  }
}

export default QuestionGroupForm;

