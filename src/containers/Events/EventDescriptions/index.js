import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonBase from '@material-ui/core/ButtonBase';
// import { Modifier, convertToRaw, EditorState, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import CKEditor from 'react-ckeditor-component';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SelectMediaDrawer from 'components/Events/EventDescriptions/SelectMediaDrawer';
import { selectedEventFunc } from 'containers/Events/EventsDashboard/actions';
import { getEventById } from 'containers/Events/CreateAnEvent/actions';
import { getSelectedMediaClear, getEventDescription, patchEventDescription, postEventDescription } from './actions';
import Immutable from 'immutable';
import diff from 'immutablediff';
import ContainerHeaderUpdated from 'components/ContainerHeaderUpdated';

// class CustomImage extends React.Component {
//   render() {
//     const { hiddenForm } = this.props;
//     return (
//       <div title="Custom Image" className="ml-1 mb-1">
//         <ButtonBase className="px-1 py-1" focusRipple onClick={hiddenForm}>
//           <i className="zmdi zmdi-image-alt zmdi-hc-lg" />
//         </ButtonBase>
//       </div>
//     );
//   }
// }

export class EventDescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      listDescription: '',
      //  editorState: EditorState.createEmpty(),
      showForm: false,
      flag: false,
      detailedDescription: '',
      editFlag: false,
      optionsRedirect: null,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.mediaData) {
  //     let height = '';
  //     let width = '';
  //     if (nextProps.mediaData.imgHeight === 'auto') {
  //       height = nextProps.mediaData.imgHeight;
  //     } else {
  //       height = nextProps.mediaData.imgHeight + 'px';
  //     }
  //     if (nextProps.mediaData.imgWidth === 'auto') {
  //       width = nextProps.mediaData.imgWidth;
  //     } else {
  //       width = nextProps.mediaData.imgWidth + 'px';
  //     }
  //     const html =
  //       this.state.detailedDescription +
  //       '<img src="' +
  //       nextProps.mediaData.selectedImage.mediaUrl +
  //       '" alt="media" style="float:none;height: ' +
  //       height +
  //       ';width: ' +
  //       width +
  //       '"/>';
  //     const contentBlock = htmlToDraft(html);
  //     if (contentBlock) {
  //       const { editorState } = this.state;
  //       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //       this.onEditorStateChange(EditorState.createWithContent(contentState));
  //     }
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postedDesc !== undefined) {
      this.setState({ optionsRedirect: '/app/events/options' });
    }
    if (nextProps.eventDescription && !nextProps.eventDescription.message) {
      this.ckeditor.editorInstance && this.ckeditor.editorInstance.setData(nextProps.eventDescription.fullDescription);
      this.setState({ detailedDescription: nextProps.eventDescription.fullDescription, editFlag: false });
    }
  }

  componentDidMount() {
    const { match, getEventDescription, selectedEventFunc, eventDescription, getSelectedMediaClear, getEventById, tenantsByDomain } = this.props;
    getEventDescription({ selectedEventId: match.params.id });
    selectedEventFunc(match.params.id);
    getSelectedMediaClear();
    const tenantId = tenantsByDomain.id
    const { id } = match.params;
    getEventById({ tenantId, selectedEventId: id });
    if (eventDescription && !eventDescription.message) {
      this.setState({
        editFlag: false,
        listDescription: eventDescription.listDescription,
        detailedDescription: eventDescription.fullDescription,
      });
    } else {
      this.setState({ editFlag: true });
    }
  }

  updateContent(newContent) {
    this.setState({
      detailedDescription: newContent,
    });
  }

  onChange(evt) {
    const newContent = evt.editor.getData();
    this.setState({
      detailedDescription: newContent,
    });
  }

  // onEditorStateChange = editorState => {
  //   this.setState({
  //     editorState,
  //     detailedDescription: draftToHtml(convertToRaw(editorState.getCurrentContent())),
  //   });
  // };

  hiddenForm = status => {
    this.setState({ showForm: status });
    if (!status) {
      this.props.getSelectedMediaClear();
    }
  };

  handleChange = event => {
    var listDescription = event.target.value;
    if (listDescription.length > 300) {
      this.setState({ flag: true });
    } else {
      this.setState({ flag: false, listDescription });
    }
  };

  saveDescription = e => {
    e.preventDefault();
    const { editFlag, listDescription, detailedDescription } = this.state;
    const { eventDescription, match, patchEventDescription, postEventDescription } = this.props;
    this.ckeditor.editorInstance.setData(detailedDescription);

    if (editFlag) {
      let data = {
        listDescription: listDescription,
        fullDescription: detailedDescription,
      };
      postEventDescription({ selectedEventId: match.params.id, data });
    } else {
      let descriptionData = {
        listDescription: eventDescription.listDescription,
        fullDescription: eventDescription.fullDescription,
      };
      var list = Immutable.Map(descriptionData);
      let patchData = {
        listDescription: listDescription,
        fullDescription: detailedDescription,
      };
      var ops = Immutable.Map(patchData);
      var data = diff(list, ops);
      patchEventDescription({ selectedEventId: match.params.id, data });
    }
  };

  render() {
    const { listDescription, editorState, detailedDescription, showForm, flag, optionsRedirect } = this.state;
    const { selectedEventId, eventDescription, descLoader, currEvent } = this.props;
    if (optionsRedirect) return <Redirect to={optionsRedirect} />;
    const { id } = this.props.match.params;

    let eventName = '';
    if (currEvent !== undefined) {
      if (currEvent.title !== undefined) {
        eventName = currEvent.title.length > 25 ? currEvent.title.substr(0, 24).concat('...') : currEvent.title;
      }
    }

    const Breadcrumb = [
      { name: 'App', url: '/' },
      { name: 'Events', url: '#/app/events' },
      { name: eventName, url: `#/app/events/${id}/options` },
      { name: 'Description', url: `#/app/events/${id}/description` },
    ];

    return (
      <div className="app-wrapper animated slideInUpTiny animation-duration-3">
        <Helmet>
          <title>Event Descriptions</title>
          <meta name="description" content="Description of Event Descriptions page" />
        </Helmet>
        {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="containers.Events.EventDescriptions.eventDescriptions" />} replacePath={':id'} replaceText={'options'} /> */}
        <ContainerHeaderUpdated
          match={this.props.match}
          data={Breadcrumb}
          title={<IntlMessages id="containers.Events.EventDescriptions.eventDescriptions" />}
        />
        {/*<h4>
          <IntlMessages id="containers.Events.EventDescriptions.enterDescriptions" />
        </h4>
        <div className="my-3">
          <span>
            <IntlMessages id="containers.Events.EventDescriptions.remember" />
          </span>
          <ul>
            <li>
              <IntlMessages id="containers.Events.EventDescriptions.onEventCards" />
            </li>
            <li>
              <IntlMessages id="containers.Events.EventDescriptions.onEventPages" />
            </li>
          </ul>
        </div>
        <form noValidate className="my-5" autoComplete="off">
          <h1 className="mb-0">
            <IntlMessages id="containers.Events.EventDescriptions.listDescription" />
          </h1>
          <TextField id="list-description" multiline error={flag ? true : false} rowsMax="5" margin="normal" fullWidth value={listDescription} onChange={this.handleChange} />
          {!flag ? (
            <span>
              <IntlMessages id="containers.Events.EventDescriptions.upTo" />{' '}
              <span className="font-weight-semibold">
                <IntlMessages id="containers.Events.EventDescriptions.300Characters" />
              </span>{' '}
              <IntlMessages id="containers.Events.EventDescriptions.onlyRefrain" />
            </span>
          ) : (
            <span className="text-red">
              <IntlMessages id="containers.Events.EventDescriptions.lengthCannot" />{' '}
              <span className="font-weight-semibold">
                <IntlMessages id="containers.Events.EventDescriptions.300Characters" />
              </span>.
            </span>
          )}
        </form>*/}
        <div className="my-5">
          <div className="d-flex flex-row align-items-center justify-content-between mb-2">
            <h1>
              <IntlMessages id="containers.Events.EventDescriptions.detailedDescriptions" />
            </h1>
            <Button variant="raised" className="jr-btn bg-teal text-white ml-4" onClick={() => this.hiddenForm(true)}>
              <i className="zmdi zmdi-image-alt zmdi-hc-fw" />
              <span>Media Gallery</span>
            </Button>
          </div>
          {/*--<Editor
            editorStyle={{
              width: '100%',
              minHeight: 300,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'lightgray',
            }}
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            onEditorStateChange={this.onEditorStateChange}
            toolbarCustomButtons={[<CustomImage hiddenForm={this.hiddenForm(true)} />]}
          />--*/}
          <CKEditor
            activeClass="p10"
            content={detailedDescription}
            events={{
              change: this.onChange.bind(this),
            }}
            ref={instance => {
              this.ckeditor = instance;
            }}
          />
          <span>
            <IntlMessages id="containers.Events.EventDescriptions.youCanUseHTML" />
          </span>
        </div>
        <div className="d-flex my-3 flex-row">
          <Button type="submit" className="mr-2" variant="raised" color="primary" onClick={this.saveDescription}>
            {descLoader ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="containers.Events.EventDescriptions.saveGoBack" />}
          </Button>
          <Button color="secondary" onClick={() => this.setState({ optionsRedirect: '/app/events/options' })}>
            <IntlMessages id="components.Venues.VenuesDrawer.cancel" />
          </Button>
        </div>
        <SelectMediaDrawer showForm={showForm} hiddenForm={() => this.hiddenForm(false)} buttonDisable={true} />
      </div>
    );
  }
}

const mapStateToProps = ({ eventdescriptions, eventsdashboard, tenants, createanevent }) => {
  const { mediaData, eventDescription, postedDesc, descLoader } = eventdescriptions;
  const { selectedEventId } = eventsdashboard;
  const { tenantsByDomain } = tenants;
  const currEvent = createanevent.eventById;
  return { mediaData, selectedEventId, eventDescription, postedDesc, descLoader, tenantsByDomain, currEvent };
};

export default connect(
  mapStateToProps,
  { getSelectedMediaClear, getEventDescription, patchEventDescription, postEventDescription, selectedEventFunc, getEventById },
)(EventDescriptions);
