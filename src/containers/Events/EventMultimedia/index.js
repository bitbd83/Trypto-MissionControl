import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectMediaDrawer from 'components/Events/EventDescriptions/SelectMediaDrawer';
import { getSelectedMediaClear } from 'containers/Events/EventDescriptions/actions';
import { selectedEventFunc } from 'containers/Events/EventsDashboard/actions';
import { postEventPhoto, postEventPhotoClear, listEventPhotos, deleteEventPhoto } from './actions';
import {  getEventById } from 'containers/Events/CreateAnEvent/actions';
import ContainerHeaderUpdated from 'components/ContainerHeaderUpdated';

export class EventMultimedia extends React.Component {
  constructor() {
    super();
    this.state = {
      skip: 0,
      take: 100,
      showForm: false,
      photoFlag: '',
      optionsRedirect: null,
      deleteFlag: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { mediaData, match, postedPhoto } = nextProps;
    const { photoFlag, deleteFlag, skip, take } = this.state;
    if (mediaData) {
      switch (photoFlag) {
        case 'hero':
          let heroImage = {
            mediaId: mediaData.selectedImage.id,
            caption: 'Hero Image',
            altText: 'Hero Image',
            dimension: {
              height: mediaData.imgHeight,
              width: mediaData.imgWidth,
            },
            primary: true,
          };
          nextProps.postEventPhoto({ selectedEventId: match.params.id, data: heroImage });
          this.setState({ photoFlag: '' });
          break;

        case 'eventBackground':
          let eventBackgroundImage = {
            mediaId: mediaData.selectedImage.id,
            caption: 'Event Background Image',
            altText: 'Event Background Image',
            dimension: {
              height: mediaData.imgHeight,
              width: mediaData.imgWidth,
            },
            primary: false,
          };
          nextProps.postEventPhoto({ selectedEventId: match.params.id, data: eventBackgroundImage });
          this.setState({ photoFlag: '' });
          break;

        case 'additional':
          let additionalImages = {
            mediaId: mediaData.selectedImage.id,
            caption: 'Additional Images',
            altText: 'Additional Images',
            dimension: {
              height: mediaData.imgHeight,
              width: mediaData.imgWidth,
            },
            primary: false,
          };
          nextProps.postEventPhoto({ selectedEventId: match.params.id, data: additionalImages });
          this.setState({ photoFlag: '' });
          break;

        default:
          break;
      }
    }
    if (postedPhoto) {
      nextProps.listEventPhotos({ selectedEventId: match.params.id, skip, take });
      nextProps.postEventPhotoClear();
    }
    if (deleteFlag) {
      nextProps.listEventPhotos({ selectedEventId: match.params.id, skip, take });
      this.setState({ deleteFlag: '' });
    }
  }

  componentDidMount() {
    const { skip, take } = this.state;
    const { match } = this.props;
    const tenantId = this.props.tenantsByDomain.id;
    const { id } = this.props.match.params;
    this.props.listEventPhotos({ selectedEventId: match.params.id, skip, take });
    this.props.selectedEventFunc(match.params.id);
    this.props.getSelectedMediaClear();
    this.props.getEventById({ tenantId, selectedEventId: id });
  }

  hiddenForm = status => {
    this.setState({ showForm: status });
  };

  handleChange = name => {
    this.setState({ showForm: true, photoFlag: name });
    this.props.getSelectedMediaClear();
    this.props.postEventPhotoClear();
  };

  photoRemove = mediaId => {
    const { match, deleteEventPhoto } = this.props;
    deleteEventPhoto({ selectedEventId: match.params.id, photoId: mediaId });
    this.setState({ deleteFlag: mediaId });
  };

  oneNoPhoto = name => {
    /*    if (name === 'additional') {
      return (
        <div className="card shadow mb-1">
          <div className="col-12 row">
            <div
              className="col-sm-6 my-4 pointer"
              onClick={() => {
                this.handleChange(name);
              }}>
              <div className="d-flex flex-row align-items-center justify-content-center">
                <i className="zmdi zmdi-upload zmdi-hc-2x" />
              </div>
              <h4 className="text-center">
                <IntlMessages id="containers.Events.EventMultimedia.uploadMorePictures" />
              </h4>
            </div>
            <div className="col-sm-6 my-4 pointer">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <i className="zmdi zmdi-videocam zmdi-hc-2x" />
              </div>
              <h4 className="text-center">
                <IntlMessages id="containers.Events.EventMultimedia.addVideoEmbedCodes" />
              </h4>
            </div>
          </div>
        </div>
      );
    } else { */
    return (
      <div
        className="align-items-center justify-content-center card shadow pointer mb-1"
        onClick={() => {
          this.handleChange(name);
        }}>
        <i className="zmdi zmdi-upload zmdi-hc-2x mt-4" />
        <h4 className="mb-4">
          {name === 'additional' ? <IntlMessages id="containers.Events.EventMultimedia.uploadMorePictures" /> : <IntlMessages id="containers.Events.EventMultimedia.uploadAPicture" />}
        </h4>
      </div>
    );
    //  }
  };

  onePhoto = item => {
    return (
      <div className="align-items-center justify-content-center card shadow mb-1">
        <div className="img-thumbnail thumbnail-width my-4 ml-4">
          <div className="d-flex align-items-center justify-content-center">
            <img src={item.imageUrl} className="mw-100 mh-100" height={100} width={132} />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button color="secondary" className="mt-1" onClick={() => this.photoRemove(item.mediaId)}>
              {this.props.deletePhoto && this.state.deleteFlag === item.mediaId ? <CircularProgress size={20} color="secondary" /> : <IntlMessages id="containers.Events.EventMultimedia.remove" />}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  additionalPhotos = items => {
    return (
      <div className="d-flex flex-row card shadow horizontal-scroll mb-1">
        {items.map((item, index) => (
          <div key={index} className="img-thumbnail thumbnail-width my-4 ml-4">
            <div className="d-flex align-items-center justify-content-center">
              <img src={item.imageUrl} className="mw-100 mh-100" height={100} width={132} />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Button color="secondary" className="mt-1" onClick={() => this.photoRemove(item.mediaId)}>
                {this.props.deletePhoto && this.state.deleteFlag === item.mediaId ? <CircularProgress size={20} color="secondary" /> : <IntlMessages id="containers.Events.EventMultimedia.remove" />}
              </Button>
            </div>
          </div>
        ))}
        <div>
          <div
            className="align-items-center justify-content-center card shadow pointer thumbnail-width my-4 mx-4"
            onClick={() => {
              this.handleChange('additional');
            }}>
            <i className="zmdi zmdi-upload zmdi-hc-2x my-4" />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { showForm, optionsRedirect } = this.state;
    const { match, photoLoader, listPhotos, postedPhoto, currEvent } = this.props;
    if (optionsRedirect) return <Redirect to={optionsRedirect} />;
    let heroImage = this.oneNoPhoto('hero');
    let eventBackgroundImage = this.oneNoPhoto('eventBackground');
    let additionalImages = this.oneNoPhoto('additional');

    let additionalImagesItems = [];

    if (listPhotos && listPhotos.items) {
      listPhotos.items.map((item, index) => {
        if (item.primary) {
          heroImage = this.onePhoto(item);
        }
        if (item.caption === 'Event Background Image') {
          eventBackgroundImage = this.onePhoto(item);
        }
        if (item.caption === 'Additional Images') {
          additionalImagesItems.push(item);
        }
      });
    }

    if (additionalImagesItems.length > 0) {
      additionalImages = this.additionalPhotos(additionalImagesItems);
    }

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
      { name: 'Media', url: `#/app/events/${id}/media` },
    ];

    return (
      <div className="app-wrapper animated slideInUpTiny animation-duration-3">
        <Helmet>
          <title>Event Multimedia</title>
          <meta name="description" content="Description of Event Multimedia page" />
        </Helmet>
        {/* <ContainerHeader match={match} title={<IntlMessages id="containers.Events.EventMultimedia.eventMultimedia" />} replacePath={':id'} replaceText={'options'} /> */}
        <ContainerHeaderUpdated
          match={this.props.match}
          data={Breadcrumb}
          title={<IntlMessages id="containers.Events.EventMultimedia.eventMultimedia" />}
        />
        <h4>
          <IntlMessages id="containers.Events.EventMultimedia.enterPhotos" />
        </h4>

        <div className="my-5">
          <h1>
            <IntlMessages id="containers.Events.EventMultimedia.heroImage" />
          </h1>
          {heroImage}
          <span>
            <IntlMessages id="containers.Events.EventMultimedia.thisEventCards" />
          </span>
        </div>

        <div className="my-5">
          <h1>
            <IntlMessages id="containers.Events.EventMultimedia.eventBackgroundImage" />
          </h1>
          {eventBackgroundImage}
          <span>
            <IntlMessages id="containers.Events.EventMultimedia.wantYourEventPage" />
          </span>
        </div>

        <div className="my-5">
          <h1>
            <IntlMessages id="containers.Events.EventMultimedia.additionalImages" />
          </h1>
          {additionalImages}
          <span>
            <IntlMessages id="containers.Events.EventMultimedia.anyMultiMediaHere" />
          </span>
        </div>
        <div className="d-flex my-3 flex-row">
          <Button type="submit" className="mr-2" variant="raised" color="primary" onClick={() => this.setState({ optionsRedirect: '/app/events/options' })}>
            <IntlMessages id="containers.Events.EventMultimedia.goBack" />
          </Button>
        </div>
        <SelectMediaDrawer showForm={showForm} hiddenForm={() => this.hiddenForm(false)} postedPhoto={postedPhoto} />
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ eventdescriptions, eventsdashboard, eventmultimedia, createanevent, tenants }) => {
  const { mediaData } = eventdescriptions;
  const { selectedEventId } = eventsdashboard;
  const { tenantsByDomain } = tenants;
  const currEvent = createanevent.eventById;
  const { photoLoader, postedPhoto, listPhotos, deletePhoto } = eventmultimedia;
  return { mediaData, selectedEventId, photoLoader, postedPhoto, listPhotos, deletePhoto, tenantsByDomain, currEvent };
};

export default connect(
  mapStateToProps,
  {
    getSelectedMediaClear,
    postEventPhoto,
    postEventPhotoClear,
    listEventPhotos,
    deleteEventPhoto,
    selectedEventFunc,
    getEventById,
  },
)(EventMultimedia);
