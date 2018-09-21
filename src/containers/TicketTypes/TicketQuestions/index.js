import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import AppModuleHeader from 'components/AppModuleHeader/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InnerSidebar from '../../InnerSidebar'
import QuestionCell from './QuestionCell'
import QuestionForm from './components/QuestionForm'
import QuestionGroupForm from '../../Questions/QuestionsDashboard/routes/QuestionsGroup'
import { getTicketQuestions, postTicketQuestion, putTicketQuestion, reorderTicketQuestion, deleteTicketQuestion, patchQuestionMandatory } from './actions'
import { resetNewQuestion } from '../../Questions/QuestionsDashboard/actions'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Loader from '../../../components/Loader';
import {arrayMove, SortableContainer} from 'react-sortable-hoc';
import { fetchTicketType } from '../actions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const QuestionsList = SortableContainer(({items, tenantsByDomain, searchText, enableReorder, handleChange, changeMandatory}) => {
  return (
    <Grid container direction={'column'}   className={"bg-light"}>
      {items.filter(item => item.field.fieldName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1).map((item, index) => {
        return (
          <QuestionCell
            item={item}
            itemIndex={index}
            index={index}
            key={index}
            tenantsByDomain={tenantsByDomain}
            enableReorder={enableReorder}
            changeStatus={handleChange}
            changeMandatory = {changeMandatory}
          />
        )
      })}
    </Grid>
  )
});


class TicketQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      drawerState: false,
      archived: false,
      inactive: false,
      formAddExisting: false,
      formAddNew: false,
      selectedMenu: '',
      reorder: false,
      questionItems: props.questions.items,
      mandatory: false,
    }
  }

  toggleAddExisting = (status) => event =>
    this.setState({formAddExisting: status})

  toggleAddNew = (status) => event =>
    this.setState({formAddNew: status})

  onSortEnd = ({oldIndex, newIndex}) => {
    const {questionItems} = this.state;
    this.setState({
      questionItems: arrayMove(questionItems, oldIndex, newIndex),
    });
  };

  reorderToggle = (status) => event => {
    const { reorder } = this.state;
    const tenantId  = this.props.tenantsByDomain.id
    if(reorder !== status){
      this.setState({reorder: status},() => {
        if(!status){
          let data ={
            ids: this.state.questionItems.map(i => i.id)
          }
          const {eventId, ticketTypeId} = this.props.match.params;
          this.props.reorderTicketQuestion({tenantId, eventId, ticketTypeId, data});
        }
      });
    }
  }

  handleChange = name => event =>
    this.setState({[name]: event.target.value});

  manageQuestion = (questionId, action) => {
    const {eventId, ticketTypeId} = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    if(action === 'delete'){
      this.props.deleteTicketQuestion({tenantId, eventId, ticketTypeId, questionId})
    } else {
      this.props.putTicketQuestion({tenantId, eventId, ticketTypeId, questionId, action})
    }
  }

  changeMandatory = (questionId, mandatory) => {
    const {eventId, ticketTypeId} = this.props.match.params;
    const tenantId = this.props.tenantsByDomain.id;
    const data = { value : mandatory,
                    op : 'replace',
                    path: '/mandatory' }
    this.props.patchQuestionMandatory({tenantId, eventId, questionId, ticketTypeId, data})
  }

  componentWillMount = () => {
    this.getAllTicketQuestions();
    const { eventId, ticketTypeId } = this.props.match.params
    const tenantId = this.props.tenantsByDomain.id;
    this.props.fetchTicketType({ tenantId, eventId, ticketTypeId });
  };

  componentWillReceiveProps(nextProps){
    const tenantId  = this.props.tenantsByDomain.id
    if(nextProps.refetchList){
      this.getAllTicketQuestions();
    } else {
      if(this.state.questionItems.length !== nextProps.questions.items.length) {
        let questionItems = nextProps.questions.items;
        this.setState({questionItems});
      }
    }

    if(nextProps.newTicketQuestionId){
      this.setState({formAddNew: false})
    }

    if(nextProps.newQuestionId){
      this.props.resetNewQuestion();
      let data = {
        assignmentId: nextProps.newQuestionId,
        mandatory: this.state.mandatory,
        assignmentType: "Field"
      };
      const {eventId, ticketTypeId} = this.props.match.params;
      this.props.postTicketQuestion({ tenantId, eventId, ticketTypeId, data});
    }
  }

  handleMenu = (selectedMenu) => event => {
    let filterOptions  = {
      archived: false,
      inactive: false,
    }
    this.setState({...filterOptions, [selectedMenu]: true, selectedMenu}, () => this.getAllTicketQuestions());
  }

  getAllTicketQuestions = () => {
    const { inactive } = this.state;
    const {eventId, ticketTypeId} = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.getTicketQuestions({ tenantId, eventId, ticketTypeId, inactive});
  };

  noQuestions = () => {
    return (
      <div className="app-wrapper">
        <div className="col-12 px-0">
          <Card className="m-0">
            <CardContent className="d-flex flex-column align-items-center">
              <Typography variant="title" gutterBottom><IntlMessages id="containers.TicketTypes.TicketQuestions.NoQuestion.title" /></Typography>
              <div className="d-flex flex-column align-items-center">
                <Typography>
                  <IntlMessages id="containers.TicketTypes.TicketQuestions.NoQuestion.description" />
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  handleSwitchChange = (name) => event => {
    this.setState({[name]: event.target.checked})
  }

  render() {
    const {searchText, selectedMenu, questionItems, reorder, formAddExisting, formAddNew} = this.state;
    const {isFetching, tenantsByDomain, ticketTypeId, currTicketType} = this.props;
    let content = <Loader />;

    if (!isFetching && questionItems) {
      if (questionItems.length) {
        content = (
          <QuestionsList
            tenantsByDomain={tenantsByDomain}
            searchText={searchText}
            items={questionItems}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
            hideSortableGhost={false}
            enableReorder={reorder}
            handleChange={this.manageQuestion}
            changeMandatory = {this.changeMandatory}
          />
        );
      } else {
        content = this.noQuestions();
      }
    }

    let ticketTypeName = ''
    if (currTicketType !== undefined) {
        ticketTypeName = currTicketType.name;
    }

    const MandatoryInput =  <FormControlLabel
                              control={
                                <Checkbox checked={this.state.mandatory} onChange={this.handleSwitchChange('mandatory')}
                                  color="primary"
                                />
                              }
                              label={<IntlMessages id="containers.Events.EventQuestions.Form.mandatory.label" />}
                            />

    return (
      <div className="">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <InnerSidebar
              width={this.props.width}
              heading = {<IntlMessages id="containers.TicketTypes.TicketQuestions.title" />}
              addButtonTxt = {<IntlMessages id="containers.TicketTypes.TicketQuestions.btn.addExistQues" />}
              addBtnClick = {this.toggleAddExisting(true)}
              addButtons={[
                {onClick: this.toggleAddExisting(true), label: <IntlMessages id="containers.TicketTypes.TicketQuestions.btn.addExistQues" />},
                {onClick: this.toggleAddNew(true), label: <IntlMessages id="containers.TicketTypes.TicketQuestions.btn.addNewQues" />}
              ]}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              allTxt = {<IntlMessages id="containers.TicketTypes.TicketQuestions.Sidebar.Menu.allText"/>}
              backLink={{url: 'options', label: <IntlMessages id="containers.TicketTypes.TicketQuestions.Sidebar.btn.backTitle" />}}
            />
          </div>

          <div className="module-box">
            <div className="d-flex justify-content-between">
              <div className="module-box-header w-100 d-flex justify-content-between flex-row">
                <div className="d-flex align-items-center">
                  <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                    <i className="zmdi zmdi-menu"/>
                  </IconButton>
                    <h2 className="mb-1 mt-1">
                      <IntlMessages id="containers.TicketTypes.TicketQuestions.header" /> - {ticketTypeName}
                    </h2>
                  {/* <AppModuleHeader
                    placeholder="Search Hotels"
                    onChange={this.handleChange('searchText')}
                    value={searchText}
                  /> */}
              </div>
              <div className="align-self-center mr-3">
                {questionItems.length > 1 && ((reorder || this.props.actionLoader) ? (
                  <Button onClick={this.reorderToggle(false)} className="btn-block mb-2" variant="raised" aria-label="add new" color="primary">
                    {this.props.actionLoader ? (
                      <CircularProgress size={20} style={{ color: 'white' }} />
                    ) : (
                      <IntlMessages id="button.save_btn" />
                    )}
                  </Button>
                ) : (
                  <Button onClick={this.reorderToggle(true)} className="btn-block mb-2" variant="raised" aria-label="reorder" color="primary">
                    <IntlMessages id="containers.TicketTypes.TicketQuestions.Sidebar.btn.reorder" />
                  </Button>
                ))}
              </div>
              </div>
            </div>
            <div className="module-box-content">
              <div
                className="mb-1 position-relative"
                style={{
                  height: this.props.width >= 1200
                    ? 'calc(100vh - 155px)'
                    : 'calc(100vh - 135px)'
                }}
              >
                <CustomScrollbars className="module-list-scroll scrollbar">
                  {content}
                </CustomScrollbars>
              </div>
            </div>
          </div>
        </div>

        <QuestionForm
          tenantsByDomain={tenantsByDomain}
          closeForm={this.toggleAddExisting(false)}
          showForm={formAddExisting}
          eventId={this.props.match.params.eventId}
          ticketTypeId={this.props.match.params.ticketTypeId}
          defaultValue={this.props.newQuestionId}
        />

        <QuestionGroupForm
          showForm={formAddNew}
          closeForm={this.toggleAddNew(false)}
          edit={false}
          data={{}}
          MandatoryInput = {MandatoryInput}
        />
      </div>
    )
  }
}
const mapStateToProps = ({settings, tenants, ticketQuestions, questions, ticketTypes }) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    isFetching: ticketQuestions.get('isFetching'),
    refetchList: ticketQuestions.get('refetchList'),
    questions: ticketQuestions.get('questions').toJS(),
    actionLoader: ticketQuestions.get('actionLoader'),
    questionAdded: questions.get('refetchList'),
    newQuestionId: questions.get('newQuestion'),
    newTicketQuestionId: ticketQuestions.get('newQuestion'),
    currTicketType: ticketTypes.get('ticketType').toJS(),
  };
}

export default connect(mapStateToProps,{
  getTicketQuestions,
  putTicketQuestion,
  reorderTicketQuestion,
  deleteTicketQuestion,
  resetNewQuestion,
  postTicketQuestion,
  fetchTicketType,
  patchQuestionMandatory,
})(TicketQuestions);
