import React from 'react';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox/index';
import QuestionGroupForm from './QuestionsGroup';
import { fetchQuestionsList } from '../actions';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import QuestionsList from './QuestionsGroup/list'
import Button from '@material-ui/core/Button';
import Pagination from 'components/Pagination'
import { hideMessage } from 'containers/Events/CreateAnEvent/actions';
import InnerSidebar from '../../../InnerSidebar'
import CustomScrollbars from 'util/CustomScrollbars';
import { Helmet } from 'react-helmet';
import IconButton from '@material-ui/core/IconButton';
import AppModuleHeader from 'components/AppModuleHeader/index';
import { putQuestion } from '../actions'

class Index extends React.Component {
  constructor(){
    super();
    this.state = {
      showForm: false,
      editForm: false,
      editData:{},
      editIndex:0,
      archived: false,
      puActionId: null,
      rowsPerPage: 10,
      page: 0,
      selectedMenu: '',
      searchText: '',
    }
  }
  componentDidMount(){
    this.getQuestionsList();
  }

  getQuestionsList = () => {
    const { page, rowsPerPage, archived, searchText } = this.state;
    const skip = page * rowsPerPage;
    const take = rowsPerPage;
    const tenantId = this.props.tenantsByDomain.id;
    this.props.fetchQuestionsList({tenantId, skip, take, archived, searchText});
  }

  handleChangePage = (page) => {
    this.setState({ page: page ? page : 0 },
    () => this.getQuestionsList());
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 },
      () => this.getQuestionsList());
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.refetchList){
      this.getQuestionsList();
    }
  }

  handleChange = (name) => event => {
    this.setState({
      [name]: event.target.value
    }, () => this.getQuestionsList())
  }

  activePutId = (id) =>{
    this.setState({puActionId:id})
  }

  handleStatusChange = (action, questionId) => {
    this.props.putQuestion({action, questionId});
  }

  showLoader = () => (
    <div className="d-flex justify-content-center mt-3">
      <CircularProgress/>
    </div>
  )

  noQuestions = () => (
    <div className="row p-3">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="pages.questionPage.card.no_questions_created_head" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="pages.questionPage.card.no_questions_created_description" /></p>
          <Button
            variant="raised"
            className="jr-btn text-white bg-primary align-self-center"
            onClick={this.openQuestionForm(true)}>
            <span><IntlMessages id="pages.questionPage.btn.no_quetion_added"/></span>
          </Button>
        </div>
      </CardBox>
    </div>
  );

  listQuestions = (items) => {
    return items.map( (item, index) => {
        return <QuestionsList
                  item={item}
                  index={index}
                  key={index}
                  editQuestion={this.openEditQuestionForm(item, index)}
                  activePutId = {this.activePutId}
                  puActionId = {this.state.puActionId}
                  tenantsByDomain = {this.props.tenantsByDomain}
                  changeStatus={this.handleStatusChange}
                />
    })
  }

  handleMenu = (selectedMenu) => event => {
    if(selectedMenu === 'archived'){
      this.setState({archived: true, selectedMenu}, () => this.getQuestionsList());
    } else{
      this.setState({archived: false, selectedMenu}, () => this.getQuestionsList(true));
    }
  }

  openQuestionForm = (status) => event => {
    this.setState({showForm: status, editForm: false, editData: {}, editIndex: 0});
  }

  openEditQuestionForm = (data, index) => event => {
    this.setState({showForm: true, editForm: true, editData: data, editIndex: index});
  }

  render() {
    const { searchText } = this.state;
    const { isFetching, questionsList, rowsPerPage, page, selectedMenu } = this.props;
    let content = this.showLoader();
    if(!isFetching && questionsList.items) {
      if(questionsList.items.length){
        content = this.listQuestions(questionsList.items)
      } else {
        content = this.noQuestions()
      }
    }

    return (
      <div className="">
        <div className="app-module animated slideInUpTiny animation-duration-3">
          <div className="app-module-sidenav d-none d-xl-flex">
            <InnerSidebar
              width={this.props.width}
              heading = {<IntlMessages id="pages.questionPage.title" />}
              addButtonTxt = {<IntlMessages id="pages.questionPage.btn.no_quetion_added"/>}
              addBtnClick = {this.openQuestionForm(true)}
              onSelect={this.handleMenu}
              selected={selectedMenu}
              allTxt = "All Questions"
              icon = {<i className="zmdi zmdi-comment-alert mr-4"/>}
              useFilters = {['archived']}
            />
          </div>
          <div className="module-box">
            <div className="module-box-header">
              <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu">
                <i className="zmdi zmdi-menu"/>
              </IconButton>
              <AppModuleHeader
                placeholder="Search Questions"
                onChange={this.handleChange('searchText')}
                value={searchText}
              />
            </div>
            <div className="module-box-content">
              <div
                className="mb-1 position-relative"
                style={{
                  height: this.props.width >= 1200
                    ? 'calc(100vh - 210px)'
                    : 'calc(100vh - 190px)'
                }}
              >
              <CustomScrollbars className="module-list-scroll scrollbar">
                <Helmet>
                  <title>Questions</title>
                  <meta name="description" content="Questions Description" />
                </Helmet>
                  {content}
              </CustomScrollbars>
            </div>
            <Pagination
              colspan={3}
              totalPages = {questionsList.totalPages}
              count={questionsList.totalCount}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              name={<IntlMessages id="pages.questionPage"/>}
              styleName={"position-absolute fixed-bottom ml-0"}
            />
            </div>
          </div>
        </div>
        <QuestionGroupForm
          showForm={this.state.showForm}
          closeForm={this.openQuestionForm(false)}
          edit={this.state.editForm}
          data={this.state.editData}
        />
      </div>
    );
  }
}

const mapStateToProps = ({questions, tenants, createanevent, settings}) => {
  return {
    isFetching: questions.get('isFetching'),
    refetchList: questions.get('refetchList'),
    questionsList: questions.get('questionsList').toJS(),
    tenantsByDomain: tenants.tenantsByDomain,
    alertMessage: createanevent.createanevent,
    showMessage: createanevent.showMessage,
    width: settings.width
  };
};

export default connect(
  mapStateToProps,
  {
    putQuestion,
    fetchQuestionsList
  }
)(Index)
