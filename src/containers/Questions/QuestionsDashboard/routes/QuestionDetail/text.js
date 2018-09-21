import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import { addNewQuestion, patchQuestion } from '../../actions'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';


class TextQuestion extends React.Component {
  constructor(props){
    super();
    this.state = {...props.questionData, patchQuestions: {}}
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.refetchList){
      this.props.closeForm();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const patchData = [];
    const tenantId = this.props.tenantsByDomain.id;
    const { fieldName, fieldTitle, patchQuestions, allowMultiLineAnswer, maxLength } = this.state;
    let data = { fieldName, fieldTitle, description:fieldName, fieldType:'Text', allowMultiLineAnswer, maxLength }
    if(!allowMultiLineAnswer){
      delete data.maxLength;
    }
    if(this.props.edit){
      Object.keys(patchQuestions).map((key, index) => {
        patchData.push(patchQuestions[key])
      })
      const questionId = this.state.id;
      this.props.patchQuestion({questionId, data: patchData, tenantId});
    }else{
      this.props.addNewQuestion({data, tenantId})
    }
    this.setState({submitting:true})
  }

  handleChange = name => event => {
    const { patchQuestions } = this.state;
    let value = name === 'allowMultiLineAnswer' ? event.target.checked : event.target.value ;
    if(this.props.edit){
      const opType = (this.props.questionData[name] !== undefined) ? (!event.target.value.length ? 'remove' : 'replace') : 'add';
      patchQuestions[name] = {
        value: value,
        op: opType,
        path: '/'+[name]
      }
      if(opType === 'remove'){
        delete patchQuestions[name].value;
      }
    }

    this.setState({
      [name]: value, patchQuestions
    });
  }

  render() {
    const { maxLength } = this.state;
    return (
      <div>
        <FormControl className="w-100 mb-2">
          <TextField
            id="fieldName"
            label={<IntlMessages id="pages.questionPage.label.question_type_text.name_label"/>}
            multiline
            rowsMax="4"
            value={this.state.fieldName}
            onChange={this.handleChange('fieldName')}
            margin="normal"
            fullWidth
          />
          <FormHelperText className="mb-2 mt-0"><IntlMessages id="pages.questionPage.label.question_type_text.name_description"/></FormHelperText>
        </FormControl>

        <FormControl className="w-100 mb-3">
          <TextField
            id="fieldTitle"
            label={<IntlMessages id="pages.questionPage.label.question_type_text.title_label"/>}
            multiline
            rowsMax="4"
            value={this.state.fieldTitle}
            onChange={this.handleChange('fieldTitle')}
            margin="normal"
            fullWidth
          />
          <FormHelperText className="mb-2 mt-0"><IntlMessages id="pages.questionPage.label.question_type_text.title_description"/></FormHelperText>
        </FormControl>

        <FormControl component="fieldset" className="w-100 mb-3">
          <FormControlLabel
              label={<IntlMessages id="pages.questionPage.label.question_type_text.multi_answer_label"/>}
            control={
              <Switch
                checked={this.state.allowMultiLineAnswer}
                onChange={this.handleChange('allowMultiLineAnswer')}
                value="allowMultiLineAnswer"
                classes={{
                  checked: 'text-success',
                  bar: 'bg-success',
                }}
              />
            }
          />
          <FormHelperText className="mb-1 mt-0"><IntlMessages id="pages.questionPage.label.question_type_text.multi_answer_description"/></FormHelperText>
        </FormControl>

        <FormControl className="col-6 ml-2">
          <InputLabel htmlFor="maxLength"><IntlMessages id="pages.questionPage.label.question_type_text.max_ans_length_label"/></InputLabel>
          <Input
            type="number"
            id="maxLength"
            value={maxLength !== undefined ? maxLength : ''}
            onChange={this.handleChange('maxLength')}
          />
          <FormHelperText className="mb-3"><IntlMessages id="pages.questionPage.label.question_type_text.max_ans_length_description"/></FormHelperText>
        </FormControl>
        <div className="fixed-bottom border-top d-flex px-4 py-3 flex-row align-items-center d-block bg-white">
        {/* <FormDrawerFooter> */}
          <Button
            type="button"
            onClick={this.handleSubmit}
            className="mr-2 mt-1"
            variant="raised"
            color="primary"
          >
          {this.props.actionLoader ? <CircularProgress size={20} style={{ color: "white" }}/> : <IntlMessages id="pages.questionPage.btn.question_type_save"/>}
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

const mapStateToProps = ({ questions, tenants }) => {
  return {
      actionLoader: questions.get('actionLoader'),
      tenantsByDomain: tenants.tenantsByDomain,
      refetchList: questions.get('refetchList') };
};

export default
  connect(
    mapStateToProps,
    { addNewQuestion, patchQuestion },
  )(TextQuestion);

