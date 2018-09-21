import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import CardBox from 'components/CardBox/index';
import QuestionSectionGroupForm from './QuestionsSectionGroup';
import { fetchQuestionSectionsList } from '../actions';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import QuestionsSectionList from './QuestionsSectionGroup/list'
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


class Index extends React.Component {
  constructor(){
    super();
    this.state = {
      showForm: false,
      editForm: false,
      skip: 0,
      take: 100,
      editData:{},
      editIndex:0,
      includeArchive: false,
      puActionId: null,
    }
  }
  componentDidMount(){
    this.props.fetchQuestionSectionsList();
  }

  componentWillReceiveProps(nextProps){
    if(this.props.refetchList){
      this.props.fetchQuestionsList();
    }
  }

  activePutId = (id) =>{
    this.setState({puActionId:id})
  }

  showLoader = () => (
    <div className="d-flex justify-content-center">
      <CircularProgress/>
    </div>
  )

  noQuestionsSection = () => (
    <div className="row">
      <CardBox styleName="col-12 text-center" heading={<IntlMessages id="pages.questionSectionPage.card.no_questions_section_created_head" />} childrenStyle="text-center">
        <div>
          <p><IntlMessages id="pages.questionSectionPage.card.no_questions_section_created_description" /></p>
          <Button
            variant="raised"
            className="jr-btn text-white bg-primary align-self-center"
            onClick={this.openQuestionForm(true)}>
            <span><IntlMessages id="pages.questionSectionPage.btn.no_quetion_section_added"/></span>
          </Button>
        </div>
      </CardBox>
    </div>
  );

  listQuestionsSection = (items) => {
    return items.map( (item, index) => {
      if(this.state.includeArchive){
        return <QuestionsSectionList 
          item={item} 
          index={index} 
          key={index} 
          editQuestion={this.openEditQuestionForm(item, index)}
          activePutId = {this.activePutId}
          puActionId = {this.state.puActionId}
        />
      }else{
        if(!item.isArchived){
          return <QuestionsSectionList 
            item={item} 
            index={index} 
            key={index} 
            editQuestion={this.openEditQuestionForm(item, index)}
            activePutId = {this.activePutId}
            puActionId = {this.state.puActionId}
          />
        }
      }
    })
  }

  openQuestionForm = (status) => event => {
    this.setState({showForm: status, editForm: false, editData: {}, editIndex: 0});
  }

  openEditQuestionForm = (data, index) => event => {
    this.setState({showForm: true, editForm: true, editData: data, editIndex: index});
  }

  handleChangeArchive = () => {
    this.setState({includeArchive: !this.state.includeArchive})
  }

  render() {
    const { isFetching, questionSectionsList } = this.props;
    let content = this.showLoader();
    if(!isFetching && questionSectionsList.items) {
      if(questionSectionsList.items.length){
        content = this.listQuestionsSection(questionSectionsList.items)
      } else {
        content = this.noQuestionsSection()
      }
    }

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.questionSectionPage.title" />} description={<IntlMessages id="pages.questionSectionPage.title_description"/> }/>
          <div className="d-flex justify-content-between mb-3">
          <FormControl component="fieldset">
            <div>Include Archived</div>
              <Switch
                checked={this.state.includeArchive}
                onChange={this.handleChangeArchive}
                color="primary"
              />
            </FormControl>
            <Button
              variant="raised"
              className="jr-btn text-white bg-primary align-self-center"
              onClick={this.openQuestionForm(true)}>
              <span><IntlMessages id="pages.questionSectionPage.btn.no_quetion_section_added"/></span>
            </Button>
          </div>
          {content}

            <QuestionSectionGroupForm
              showForm={this.state.showForm} 
              closeForm={this.openQuestionForm(false)}
              edit={this.state.editForm}
              data={this.state.editData}
            />
      </div>
    );
  }
}

const mapStateToProps = ({questionsSection}) => {
  return {
    isFetching: questionsSection.get('isFetching'),
    refetchList: questionsSection.get('refetchList'),
    questionSectionsList: questionsSection.get('questionSectionsList').toJS(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuestionSectionsList: () => {
      return dispatch(fetchQuestionSectionsList())
    }
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)