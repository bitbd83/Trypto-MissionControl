import React from 'react';
import Button from '@material-ui/core/Button';
import FormDrawer from 'components/FormDrawer';
import FormDrawerHeader from 'components/FormDrawer/FormDrawerHeader';
import FormDrawerContent from 'components/FormDrawer/FormDrawerContent';
import FormDrawerFooter from 'components/FormDrawer/FormDrawerFooter';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { postTicketQuestion } from '../actions';
import { fetchQuestionsList } from '../../../Questions/QuestionsDashboard/actions';
import IntlMessages from 'util/IntlMessages';
import Select from 'react-select';


class QuestionForm extends React.Component {

    constructor (props) {
      super();
      this.state = this.getInitialState();
    }

    getInitialState = () => {
      const initialState = {
        loading: false,
        assignmentId: '',
        mandatory: false,
      };
      return initialState;
    }

    componentWillMount = () => {
      this.props.fetchQuestionsList({ skip: 0, take: 1000, archived: false});
    }

    componentWillReceiveProps = (nextProps) => {
      if(nextProps.refetchList && this.state.loading){
        this.handleCloseDrawer()
      }
      if(this.state.assignmentId ==='' && nextProps.defaultValue !== null){
        this.setState({assignmentId: nextProps.defaultValue})
      }
    }

    handleChange = (key) => event => {
      let value = (event && event.target) ? event.target.value :  event;
      this.setState({
        [key]: value
      });
    }

    handleSwitchChange = key => (event, checked) => {
      this.setState({
        [key]: checked
      });
    }

    handleSubmit = event => {
      event.preventDefault();
      let { assignmentId, mandatory } = this.state;
      const {eventId, ticketTypeId, tenantsByDomain} = this.props;
      const tenantId  = this.props.tenantsByDomain.id
      this.setState({loading: true})

      let data = {
        assignmentId,
        mandatory,
        assignmentType: "Field"
      };

      this.props.postTicketQuestion({ tenantId, eventId, ticketTypeId, data});
    }

    handleCloseDrawer = () => {
      let states = this.getInitialState();
      this.setState(states);
      this.props.closeForm();
    }

    getOptions = (questions, questionsList) => {
      let selectedQuestions = [];
      let options = [];
      questions.items.map(question => {
        selectedQuestions.push(question.assignment.assignmentId)
     })

     questionsList.items.map(q => {
       if(selectedQuestions.indexOf(q.id) === -1){
         options.push({label: q.fieldName, value: q.id})
       }
     })
     return options;
    }

    render() {
      const { mandatory, assignmentId } = this.state;
      const { actionLoader, questionsList, questions } = this.props;

      let options = questionsList.items.length ? this.getOptions(questions, questionsList) : [];

      return (
        <FormDrawer open={this.props.showForm}>
          <FormDrawerHeader
            closeClick={this.handleCloseDrawer}>
            <IntlMessages id="containers.TicketTypes.TicketQuestions.Form.heading" />
          </FormDrawerHeader>

          <FormDrawerContent>
            <FormControl className="w-100 mb-2">
              <FormLabel className={'shrink'}>
                <IntlMessages id="containers.TicketTypes.TicketQuestions.Form.selectQuestion.label" />
              </FormLabel>
              <FormGroup>
                <Select
                  isLoading={this.props.isFetching}
                  value={assignmentId}
                  onChange={this.handleChange('assignmentId')}
                  options={options}
                  simpleValue={true}
                />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className="w-100 my-3">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mandatory}
                    onChange={this.handleSwitchChange('mandatory')}
                    color="primary"
                  />
                }
                label={<IntlMessages id="containers.TicketTypes.TicketQuestions.Form.mandatory.label" />}
              />
            </FormControl>
          </FormDrawerContent>

          <FormDrawerFooter>
            <Button
              type="submit"
              onClick={this.handleSubmit}
              className="mr-2"
              variant="raised"
              color="primary">
              {actionLoader ? <CircularProgress size={24} color="secondary" /> : <IntlMessages id="containers.TicketTypes.TicketQuestions.Form.btn.addQuestion" />}
            </Button>
            <Button onClick={this.handleCloseDrawer} color="secondary">
              <IntlMessages id="button.cancel_btn" />
            </Button>
          </FormDrawerFooter>
        </FormDrawer>
      );
    }
}

const mapStateToProps = ({ ticketQuestions, tenants, questions }) => {
  return {
    actionLoader: ticketQuestions.get('actionLoader'),
    refetchList: ticketQuestions.get('refetchList'),
    isFetching: questions.get('isFetching'),
    questionsList: questions.get('questionsList').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
    questions: ticketQuestions.get('questions').toJS(),
  };
};
export default connect(
  mapStateToProps,
  {
    fetchQuestionsList,
    postTicketQuestion,
  },
)(QuestionForm);

