import React from 'react';
import TicketSidebar from '../Sidebar';
import CustomScrollbars from 'util/CustomScrollbars';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IntlMessages from 'util/IntlMessages';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationContainer } from 'react-notifications';
import SelectMediaDrawer from 'components/Events/EventDescriptions/SelectMediaDrawer';
import { getSelectedMediaClear } from 'containers/Events/EventDescriptions/actions';
import { listTicketTypePhotos, postTicketTypePhoto, deleteTicketTypePhoto } from '../actions';

class MultiMedia extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showForm: false,
      photoFlag: '',
      deleteFlag: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { ticketTypeId, eventId } = nextProps.match.params;
    const { mediaData, postedTicketPhoto } = nextProps;
    const { photoFlag, deleteFlag } = this.state;
    const tenantId  = this.props.tenantsByDomain.id
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
          nextProps.postTicketTypePhoto({ tenantId, eventId, ticketTypeId, data: heroImage });
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
          nextProps.postTicketTypePhoto({ tenantId, eventId, ticketTypeId, data: additionalImages });
          this.setState({ photoFlag: '' });
          break;

        default:
          break;
      }
    }
    if (postedTicketPhoto) {
      nextProps.listTicketTypePhotos({ tenantId, eventId, ticketTypeId });
    }
    if (deleteFlag) {
      nextProps.listTicketTypePhotos({ tenantId, eventId, ticketTypeId });
      this.setState({ deleteFlag: '' });
    }
  }

  componentDidMount() {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.listTicketTypePhotos({ tenantId, eventId, ticketTypeId });
    this.props.getSelectedMediaClear();
  }

  handleChange = name => {
    this.setState({ showForm: true, photoFlag: name });
    this.props.getSelectedMediaClear();
  };

  photoRemove = photoId => {
    const { ticketTypeId, eventId } = this.props.match.params;
    const tenantId  = this.props.tenantsByDomain.id
    this.props.deleteTicketTypePhoto({ tenantId, eventId, ticketTypeId, photoId });
    this.setState({ deleteFlag: photoId });
  };

  hiddenForm = status => {
    this.setState({ showForm: status });
  };

  onCancel = () => {
    this.props.history.goBack();
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
              {this.props.deletedTicketPhoto && this.state.deleteFlag === item.mediaId ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <IntlMessages id="containers.Events.EventMultimedia.remove" />
              )}
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
                {this.props.deletedTicketPhoto && this.state.deleteFlag === item.mediaId ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  <IntlMessages id="containers.Events.EventMultimedia.remove" />
                )}
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
    const { data, listTicketPhotos, currTicketType, postedTicketPhoto } = this.props;
    const { eventId, ticketTypeId } = this.props.match.params;
    const { showForm } = this.state;

    let ticketTypeName = '';
    if (currTicketType !== undefined) {
      if (currTicketType.name !== undefined) {
        ticketTypeName = currTicketType.name;
      }
    }

    let heroImage = this.oneNoPhoto('hero');
    let additionalImages = this.oneNoPhoto('additional');

    let additionalImagesItems = [];

    if (listTicketPhotos && listTicketPhotos.items) {
      listTicketPhotos.items.map((item, index) => {
        if (item.primary) {
          heroImage = this.onePhoto(item);
        }
        if (item.caption === 'Additional Images') {
          additionalImagesItems.push(item);
        }
      });
    }

    if (additionalImagesItems.length > 0) {
      additionalImages = this.additionalPhotos(additionalImagesItems);
    }

    return (
      <div className="app-module animated slideInUpTiny animation-duration-3">
        <div className="app-module-sidenav d-none d-xl-flex">
          <TicketSidebar
            eventId={eventId}
            currType="Manage Multimedia"
            ticketTypeId={ticketTypeId}
            width={this.props.width}
            heading={<IntlMessages id="pages.ticketTypesPage.MultiMedia.multiMedia" />}
            history={this.props.history}
            backLink={{url: `/app/events/${eventId}/ticket-types/${ticketTypeId}/options`, label: <IntlMessages id="pages.ticketTypesPage.feesAndTaxes.backTicketOptions" />}}
            optionType="ticketType"
          />
        </div>

        <div className="module-box">
          <div className="module-box-header">
            <h2 className="mb-1 mt-1">
              <IntlMessages id="pages.ticketTypesPage.inventory.title" />
              {ticketTypeName}
            </h2>
            <p className="m-0">
              <IntlMessages id="pages.ticketTypesPage.MultiMedia.configureMultimedia" />
              {ticketTypeName}
              <IntlMessages id="pages.ticketTypesPage.MultiMedia.ticketTypeHere" />
            </p>
          </div>
          <div className="module-box-content">
            <CustomScrollbars className="module-list-scroll scrollbar" style={{ height: this.props.width >= 1200 ? 'calc(100vh - 150px)' : 'calc(100vh - 130px)' }}>
              <div className="app-wrapper">
                <div className="mb-5">
                  <h1>
                    <IntlMessages id="containers.Events.EventMultimedia.heroImage" />
                  </h1>
                  {heroImage}
                  <IntlMessages id="pages.ticketTypesPage.MultiMedia.heroImageHelper" />
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
                  <Button type="submit" className="mr-2" variant="raised" color="primary" onClick={() => this.onCancel()}>
                    <IntlMessages id="containers.Events.EventMultimedia.goBack" />
                  </Button>
                </div>
              </div>
            </CustomScrollbars>
          </div>
        </div>
        <SelectMediaDrawer showForm={showForm} hiddenForm={() => this.hiddenForm(false)} postedPhoto={postedTicketPhoto} />
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ settings, ticketTypes, tenants, eventdescriptions }) => {
  return {
    width: settings.width,
    tenantsByDomain: tenants.tenantsByDomain,
    listTicketPhotos: ticketTypes.get('listTicketPhotos').toJS(),
    postedTicketPhoto: ticketTypes.get('postedTicketPhoto'),
    deletedTicketPhoto: ticketTypes.get('deletedTicketPhoto'),
    currTicketType: ticketTypes.get('ticketType').toJS(),
    mediaData: eventdescriptions.mediaData,
  };
};

export default connect(
  mapStateToProps,
  { listTicketTypePhotos, getSelectedMediaClear, postTicketTypePhoto, deleteTicketTypePhoto },
)(MultiMedia);
