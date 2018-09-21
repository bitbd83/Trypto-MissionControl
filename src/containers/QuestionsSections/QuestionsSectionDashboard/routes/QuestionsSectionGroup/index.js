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
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

class QuestionSectionGroupForm extends React.Component {
  state = {
    loading: false,
    questionData: {},
    // edit: true,
  };

  componentWillReceiveProps = (nextProps) => {
    let states = {};

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
        <FormDrawer
          open={this.props.showForm}
          header={<IntlMessages id="pages.questionPage.btn.no_quetion_added" />}
          closeClick={this.props.closeForm}
        >
          <div>
            <form autoComplete="off" noValidate>
              <FormControl className="w-100 mb-2">
                <TextField
                  id="name"
                  label={<IntlMessages id="pages.questionSectionPage.label.add_section.name_title" />}
                  multiline
                  rowsMax="4"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  fullWidth
                />
                <FormHelperText className="mb-2 mt-0"><IntlMessages id="pages.questionSectionPage.label.add_section.name_description" /></FormHelperText>
              </FormControl>
              <FormControl className="w-100 mb-2">
                <TextField
                  id="description"
                  label={<IntlMessages id="pages.questionSectionPage.label.add_section.description_title" />}
                  multiline
                  rowsMax="4"
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                  margin="normal"
                  fullWidth
                />
                <FormHelperText className="mb-2 mt-0"><IntlMessages id="pages.questionSectionPage.label.add_section.description_description" /></FormHelperText>
              </FormControl>

              <div className="d-flex">
                <div className="col-6 mr-4">
                    <FormControl className="w-100 mb-2">
                    <InputLabel htmlFor="type"><IntlMessages id="pages.questionSectionPage.label.add_section.select_question_title" /></InputLabel>
                      <Select
                        value={this.state.question}
                        onChange={this.handleChange('question')}
                        input={<Input id="question"/>}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="choise_question">Doctor's Address</MenuItem>
                        <MenuItem value="text_question">Text Question</MenuItem>
                        <MenuItem value="address_question">Address</MenuItem>
                      </Select>
                    </FormControl>
                </div>
                  <FormControlLabel
                      control={
                      <Checkbox
                          checked={this.state.gilad}
                          onChange={this.handleChange('mandatory_answer')}
                          value="mandatory_answer"
                      />
                      }
                      label="Require Mandatory Answer"
                  />
              </div>
                <Button variant="contained" color="primary" className="mt-2 mb-3">
                  <IntlMessages id="pages.questionSectionPage.btn.add_section.assign_question" />
                </Button>
                    
                <FormLabel component="legend"><IntlMessages id="pages.questionSectionPage.label.add_section.assign_qeustion" /></FormLabel>
                <Typography variant="caption">
                    <IntlMessages id="pages.questionSectionPage.label.add_section.favorite_cities" />
                    <IconButton>
                        <DeleteIcon style={{ fontSize: 18, width:'18px', height:'18px' }}/>
                    </IconButton>
                </Typography>
                <Typography variant="caption">
                    <IntlMessages id="pages.questionSectionPage.label.add_section.doctor_address" />
                    <IconButton>
                        <DeleteIcon style={{ fontSize: 18, width:'18px', height:'18px' }}/>
                    </IconButton>
                </Typography>
                <Button
                  type="submit"
                  onClick={this.onSaveQuestion}
                  className="mr-2"
                  variant="raised"
                  color="primary">
                      Save
                </Button>
              <Button onClick={this.props.closeForm} color="secondary">
                Cancel
            </Button>
            </form>
            </div>
        </FormDrawer>
    );
  }
}




export default QuestionSectionGroupForm;

