import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ChipInput from 'material-ui-chip-input'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IntlMessages from 'util/IntlMessages';
import Button from '@material-ui/core/Button';
import { addNewQuestion, patchQuestion } from '../../actions'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';


class ChoiceQuestion extends React.Component {
  constructor(props){
    super();

    this.state = {...props.questionData, patchQuestions: {}, initialAnsLen: props.edit ? props.questionData.selectField.answerOptions.length : null};
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.refetchList){
      this.props.closeForm();
    }
  }

  handleChange = name => event => {
    let value = null;
    const { selectField = {}, patchQuestions } = this.state;
    const { questionData } = this.props;
    if(['allowMultipleSelections', 'minSelections', 'maxSelections'].indexOf(name) !== -1){
      value = name === 'allowMultipleSelections' ? event.target.checked : event.target.value;
     if(this.props.edit){
       let opType = (this.props.questionData.selectField[name] !== undefined) ? (!value.length ? 'remove' : 'replace') : 'add';
       if(name === 'allowMultipleSelections') opType = 'replace'
        patchQuestions[name] = {
          value: value,
          op: opType,
          path: '/selectField/'+[name]
        }
        if(opType === 'remove'){
          delete patchQuestions[name].value;
        }}
        selectField[name] = value;
      this.setState({selectField, patchQuestions})
    }else{
      value = event.target.value
      if(this.props.edit){
        const opType = (this.props.questionData[name] !== undefined) ?(!event.target.value.length ? 'remove' : 'replace') : 'add';
      patchQuestions[name] = {
        value,
        op: opType,
        path: '/'+[name]
      }
      if(opType === 'remove'){
        delete patchQuestions[name].value;
      }}
      this.setState({
        [name]: event.target.value, patchQuestions
      });
    }
  }

  onChangeAnswer = (answers) => {
    const answerOptions = [];
    const { selectField = {}, patchQuestions, initialAnsLen } = this.state;
    const { questionData } = this.props;
    const answersPatch = [];
    const lengthDiff =  initialAnsLen - answers.length;

    if(lengthDiff > 0 && this.props.edit){
      let i = initialAnsLen
      for(i; i > initialAnsLen-lengthDiff; i--){
    answersPatch.push({
          op:'remove',
          path: '/selectField/answerOptions/'+(i-1)
        })
      }
    }
    answers.map((answer, index) => {
      answerOptions.push({answerText:answer, value:answer})
     if(this.props.edit){
        const opType = (questionData.selectField.answerOptions[index] !== undefined) ? 'replace' : 'add';
        answersPatch.push({
                  value: {answerText:answer, value:answer},
                  op: opType,
                  path: '/selectField/answerOptions/'+ index
                })
              }
    })

    patchQuestions.answerOptions = answersPatch;
    selectField.answerOptions = answerOptions;
    this.setState({selectField, patchQuestions })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fieldName, fieldTitle, selectField, patchQuestions } = this.state;
    const tenantId = this.props.tenantsByDomain.id;
      const patchData = [];
      if(this.props.edit){
        Object.keys(patchQuestions).map((key, index) => {
          if(key === 'answerOptions'){
            patchQuestions[key].map(ans => patchData.push(ans))
          }else{
            patchData.push(patchQuestions[key])
          }
        })
        const questionId = this.state.id;
        this.props.patchQuestion({questionId, data: patchData, tenantId});
      }else{
        if(selectField && !selectField.allowMultipleSelections){
          delete selectField['minSelections'];
          delete selectField['maxSelections'];
        }
        let data = { fieldName, fieldTitle, description:fieldName, fieldType:'Select', selectField }
        this.props.addNewQuestion({data, tenantId})
      }
    this.setState({submitting:true})
  }

    render() {
      const { selectField } = this.state;
      const answers = selectField && selectField.answerOptions ? selectField.answerOptions.map(answer => (answer.value)) : [];
      const disabledSelection = !(selectField && selectField.allowMultipleSelections);


      return (
        <div className="mb-2">

          <FormControl className="w-100 mb-2">
            <TextField
              id="fieldName"
              label={<IntlMessages id="pages.questionPage.label.question_type_choice.name_label"/>}
              multiline
              rowsMax="4"
              value={this.state.fieldName}
              onChange={this.handleChange('fieldName')}
              margin="normal"
              fullWidth
            />
            <FormHelperText className="mt-0"><IntlMessages id="pages.questionPage.label.question_type_choice.name_description"/></FormHelperText>
          </FormControl>

          <FormControl className="w-100 mb-2">
            <TextField
              id="fieldTitle"
              label={<IntlMessages id="pages.questionPage.label.question_type_choice.question_title_label"/>}
              multiline
              rowsMax="4"
              value={this.state.fieldTitle}
              onChange={this.handleChange('fieldTitle')}
              margin="normal"
              fullWidth
            />
            <FormHelperText className="mb-1 mt-0"><IntlMessages id="pages.questionPage.label.question_type_choice.question_title_description"/></FormHelperText>
          </FormControl>

          <div className="mb-3">
            <ChipInput
              fullWidth
              defaultValue={answers}
              label={<IntlMessages id="pages.questionPage.label.question_type_choice.ans_options_label"/>}
              onChange={this.onChangeAnswer}
            />
          </div>

          <FormControl component="fieldset" className="w-100 mb-3">
            <FormControlLabel
                label={<IntlMessages id="pages.questionPage.label.question_type_choice.allow_multiple_selction_label"/>}
              control={
                <Switch
                  checked={selectField ? !!selectField.allowMultipleSelections : false}
                  onChange={this.handleChange('allowMultipleSelections')}
                  classes={{
                    checked: 'text-success',
                    bar: 'bg-success',
                  }}
                />
              }
            />
            <FormHelperText><IntlMessages id="pages.questionPage.label.question_type_choice.allow_multiple_selction_description"/></FormHelperText>
          </FormControl>

          <div className="d-flex flex-row mb-2">
            <FormControl className="col-6 mr-2">
              <InputLabel htmlFor="minSelections"><IntlMessages id="pages.questionPage.label.question_type_choice.min_selections_label"/></InputLabel>
              <Input
                disabled = {disabledSelection}
                type="number"
                id="minSelections"
                value={selectField ? this.state.selectField.minSelections : ''}
                onChange={this.handleChange('minSelections')}
              />
              <FormHelperText className="mb-1"><IntlMessages id="pages.questionPage.label.question_type_choice.min_selections_description"/></FormHelperText>
            </FormControl>

            <FormControl className="col-6 ml-2">
              <InputLabel htmlFor="maxSelections"><IntlMessages id="pages.questionPage.label.question_type_choice.max_selections_label"/></InputLabel>
              <Input
                disabled = {disabledSelection}
                type="number"
                id="maxSelections"
                value={selectField ? this.state.selectField.maxSelections : ''}
                onChange={this.handleChange('maxSelections')}
              />
              <FormHelperText className="mb-1"><IntlMessages id="pages.questionPage.label.question_type_choice.max_selections_description"/></FormHelperText>
            </FormControl>
          </div>
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
  )(ChoiceQuestion);
