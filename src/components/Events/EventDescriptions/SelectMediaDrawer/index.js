import React from 'react';
import IntlMessages from 'util/IntlMessages';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from 'components/Pagination';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { getMedia, getSelectedMedia } from 'containers/Events/EventDescriptions/actions';
import { postMedia, postMediaClear } from 'containers/Events/EventMultimedia/actions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SelectMediaDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      rowsPerPage: 25,
      selectedImage: undefined,
      cols: 5,
      cellHeight: 150,
      height: window.innerHeight - 153,
      imgHeight: 0,
      imgWidth: 0,
      loading: false,
      copied: false,
    };
  }

  handleResize() {
    this.setState(window.innerWidth > 768 ? { cols: Math.floor(window.innerWidth / 220), cellHeight: 150 } : { cols: Math.floor(window.innerWidth / 150), cellHeight: 100 });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ height: window.innerHeight - 153 });
    if (nextProps.postedMedia) {
      this.setState({ selectedImage: nextProps.postedMedia });
      this.getAllMedia();
      nextProps.postMediaClear();
    }
    if (nextProps.postedPhoto !== undefined) {
      this.setState({ selectedImage: undefined, imgHeight: 0, imgWidth: 0, loading: false });
      this.props.hiddenForm();
    }
    if (this.state.selectedImage) {
      this.getMediaDimension(this.state.selectedImage.mediaUrl);
    } else {
      this.setState({ imgWidth: 0, imgHeight: 0 });
    }
  }

  componentWillMount() {
    this.handleResize();
    this.getAllMedia();
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      (this.handleResize = () => {
        this.setState(window.innerWidth > 768 ? { cols: Math.floor(window.innerWidth / 220), cellHeight: 150 } : { cols: Math.floor(window.innerWidth / 150), cellHeight: 100 });
      }),
    );
  }

  getAllMedia = () => {
    const { page, rowsPerPage } = this.state;
    const skip = page * rowsPerPage;
    const take = rowsPerPage;
    this.props.getMedia({ skip, take });
  };

  handleChangePage = page => {
    this.setState({  page: page ? page : 0  }, () => this.getAllMedia());
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value }, () => this.getAllMedia());
  };

  addImage = e => {
    e.preventDefault();
    const { imgHeight, imgWidth, selectedImage } = this.state;

    if (!selectedImage) {
      NotificationManager.error('No selected image.');
    } else {
      this.setState({ loading: true });
      this.props.getSelectedMedia({ selectedImage, imgHeight, imgWidth });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  mediaClick(tile) {
    this.getMediaDimension(tile.mediaUrl);
    this.setState({ selectedImage: tile });
  }

  modalClose() {
    this.props.hiddenForm();
    this.setState({ selectedImage: undefined, imgHeight: 0, imgWidth: 0 });
  }

  getMediaDimension(url) {
    var img = new Image();
    img.src = url;
    this.setState({ imgHeight: img.naturalHeight, imgWidth: img.naturalWidth });
  }

  render() {
    const { showForm, mediaLoader, media, photoLoader, postedPhoto, buttonDisable } = this.props;
    const { selectedImage, cols, cellHeight, height, page, rowsPerPage, imgHeight, imgWidth, loading, copied } = this.state;
    return (
      <Dialog fullScreen open={showForm} onClose={() => this.modalClose()} TransitionComponent={Transition}>
        <AppBar className="position-relative">
          <Toolbar>
            <Typography
              type="title"
              color="inherit"
              style={{
                flex: 1,
              }}>
              <IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.selectMedia" />
            </Typography>
            <IconButton onClick={() => this.modalClose()} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="app-wrapper">
          <React.Fragment>
            <div className="row">
              <div className="col-md-9 mb-4">
                <div className="gl-image border">
                  {(mediaLoader || photoLoader) && !loading ? (
                    <div className="loader-view" style={{ height: height }}>
                      <CircularProgress />
                    </div>
                  ) : (
                    <GridList cellHeight={cellHeight} style={{ height: height }} cols={cols} spacing={0}>
                      {media &&
                        Object.keys(media).length > 0 &&
                        media.items.map((tile, index) => (
                          <GridListTile key={index} cols={1} className="img-thumbnail mx-1 my-1 pointer" onClick={() => this.mediaClick(tile)}>
                            <div className="mx-1 my-1">
                              <img src={tile.mediaUrl} className="mw-100 mh-100" height="auto" width="auto" />
                            </div>
                          </GridListTile>
                        ))}
                    </GridList>
                  )}
                </div>
                <Pagination
                  colspan={3}
                  totalPages={media.totalPages}
                  count={media.totalCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  name={<IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.media" />}
                  styleName=" mw-100 ml-0 mt-1 position-relative media-pagination"
                />
              </div>
              <div className="col-md-3">
                <div className="dropzone">
                  <Dropzone
                    accept="image/jpeg, image/png"
                    onDrop={(accepted, rejected) => {
                      var data = new FormData();
                      data.append('uploadedFile', accepted[0]);
                      this.props.postMedia({ data });
                    }}
                    className="justify-content-center align-items-center border-dashed rounded-lg">
                    <i className="zmdi zmdi-upload zmdi-hc-2x" />
                    <p className="mb-0 mt-2">
                      <IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.dragging" />
                    </p>
                  </Dropzone>
                </div>
                <h1 className="my-4 text-center">
                  <IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.selectedImage" />
                </h1>
                <div className="my-4 d-flex mw-100 img-height flex-row justify-content-center align-items-center img-thumbnail" style={{ position: 'relative' }}>
                  <img src={selectedImage && selectedImage.mediaUrl} className="mw-100 mh-100" height={imgHeight} width={imgWidth} />
                </div>
                <div className="d-flex flex-row my-3 w-100 justify-content-center align-items-center">
                  <i className="zmdi zmdi-swap-vertical zmdi-hc-fw" />
                  <TextField
                    id="height"
                    label={<IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.height" />}
                    className="ml-3"
                    value={imgHeight}
                    onChange={this.handleChange('imgHeight')}
                    fullWidth
                    type="number"
                  />
                  <span className="text-pink mx-5">*</span>
                  <i className="zmdi zmdi-swap zmdi-hc-fw" />
                  <TextField
                    id="width"
                    label={<IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.width" />}
                    className="ml-3"
                    value={imgWidth}
                    onChange={this.handleChange('imgWidth')}
                    fullWidth
                    type="number"
                  />
                </div>
                <div className="d-flex flex-row my-5 w-100 justify-content-center">
                  <Button type="submit" variant="raised" color="primary" disabled={selectedImage && !buttonDisable ? false : true} onClick={this.addImage}>
                    {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : <IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.addSelectedImage" />}
                  </Button>
                  <div className="ml-2">
                    <CopyToClipboard text={selectedImage && selectedImage.mediaUrl && selectedImage.mediaUrl} id="Popover1" onCopy={() => this.setState({ copied: !copied })}>
                      <Button type="submit" variant="raised" color="primary" disabled={selectedImage && selectedImage.mediaUrl ? false : true}>
                        <IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.copyImageUrl" />
                      </Button>
                    </CopyToClipboard>
                    <Popover placement="bottom" isOpen={copied} target="Popover1" toggle={() => this.setState({ copied: !copied })}>
                      <PopoverBody>
                        <IntlMessages id="components.Events.EventDescriptions.SelectMediaDrawer.copied" />
                      </PopoverBody>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ eventdescriptions, eventmultimedia }) => {
  const { mediaLoader, media } = eventdescriptions;
  const { postedMedia, photoLoader } = eventmultimedia;
  return { mediaLoader, media, postedMedia, photoLoader };
};

export default connect(
  mapStateToProps,
  { getMedia, getSelectedMedia, postMedia, postMediaClear },
)(SelectMediaDrawer);
