import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IntlMessages from 'util/IntlMessages';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import moment from 'moment';
import _ from 'lodash';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

class RoomTypeDailyInventory extends React.Component {
  constructor(props) {
    super(props);

    const { roomtypes, edit } = props
    const {inventoryDates} = roomtypes;
    const allDates = inventoryDates ? this.getDates(inventoryDates.from, inventoryDates.to) : [];
    this.state = {
      roomsDetail: this.getRoomData(allDates, edit, roomtypes),
    }
  }

  getRoomData = (Dates, edit, editData) => {
    const roomsDetail = [];
    Dates.map(date => {
      let initialRoomDetail = {
          date: date,
          rooms: '',
          buyRate:'',
          sellRate: '',
          markup: '',
          attrition:''
        }
      if(edit && editData && editData.dailyInventoryList){
        let temp = _.find(editData.dailyInventoryList, i => moment(moment(i.date).utc(true).format('YYYY-MM-DD')).isSame(date, 'day'));
        initialRoomDetail = temp || initialRoomDetail
        initialRoomDetail['date'] = moment(initialRoomDetail.date).utc(true).format('YYYY-MM-DD');
        initialRoomDetail['markup'] =initialRoomDetail.sellRate - initialRoomDetail.buyRate;
      }
      roomsDetail.push(initialRoomDetail)
    })
    return roomsDetail;
  }

  getDates = (startDate, stopDate) =>  {
    var dateArray = [];
    var currentDate = moment(startDate).utc(true);
    var stopDate = moment(stopDate).utc(true);
    while (currentDate <= stopDate) {
      dateArray.push(currentDate.format('YYYY-MM-DD'))
      currentDate = currentDate.add(1, 'days');
    }
    return dateArray;
  }

  handleChange = (index, name) => event => {
    if(event.target.value < 0){
      return false;
    }
    const roomsDetail = this.state.roomsDetail;
    roomsDetail[index][name] = event.target.value
    this.setState({roomsDetail}, () => this.props.saveRoomDetails(roomsDetail))
  }

  onBlur = (index, name) => event => {
    const { roomsDetail } = this.state;
    roomsDetail.map((room, index)=> {
      if(room[name] === ''){
        roomsDetail[index][name] = event.target.value;
      }
      if(room.buyRate && room.sellRate){
        roomsDetail[index].markup = room.sellRate - room.buyRate
      }
    })
    this.setState({roomsDetail}, () => this.props.saveRoomDetails(roomsDetail))
  }

  handleDelete = (index) => event => {
    const {roomsDetail} = this.state;
    roomsDetail[index] = {date: `${roomsDetail[index].date}T00:00:00Z`, rooms: '', buyRate:'', sellRate: '', markup: '', attrition:''}
    this.setState({roomsDetail}, () => this.props.saveRoomDetails(roomsDetail))
  }

  render() {
    const { roomtypes, hotelInventory, classes } = this.props;
    const { roomsDetail } = this.state;
    return (
      <div>
        <Typography className="mb-4" variant={'subheading'}>
          <IntlMessages id="containers.Hotels.HotelDetails.roomTypes.Form.step2.subheading" />
        </Typography>
        <Grid container justify={'flex-start'} direction={'column'}>
          <Grid item>
            <Grid container spacing={8} justify={'center'} alignContent={'center'}>
              <Grid item xs >Date</Grid>
              <Grid item xs>Total Rooms</Grid>
              <Grid item xs>Buy Price ({hotelInventory.currency.symbol})</Grid>
              <Grid item xs>Sell Price ({hotelInventory.currency.symbol})</Grid>
              <Grid item xs>Markup ({hotelInventory.currency.symbol})</Grid>
              <Grid item xs>Attritions (%)</Grid>
              <Grid item xs ></Grid>
            </Grid>
          </Grid>

          {roomsDetail.length && roomsDetail.map((room, index) => (
            <Grid item key={index} className={'my-2'}>
              <Grid container alignItems={'center'} alignContent={'center'} justify={'flex-start'} spacing={8}>
                <Grid item xs>
                  <Typography variant={'body1'}>
                    {moment(room.date).utc(true).format('MMM DD, YYYY')}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Input
                    id="rooms"
                    value = {room.rooms}
                    onChange={this.handleChange(index, 'rooms')}
                    onBlur={this.onBlur(index, 'rooms')}
                    margin="dense"
                    inputProps={{ min: 0 }}
                    type="number"
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value = {room.buyRate}
                    onChange={this.handleChange(index, 'buyRate')}
                    onBlur={this.onBlur(index, 'buyRate')}
                    startAdornment={<InputAdornment position="start">{hotelInventory.currency.symbol}</InputAdornment>}
                    inputProps={{ min: 0 }}
                    type="number"
                    margin="dense"
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value = {room.sellRate}
                    onChange={this.handleChange(index, 'sellRate')}
                    onBlur={this.onBlur(index, 'sellRate')}
                    startAdornment={<InputAdornment position="start">{hotelInventory.currency.symbol}</InputAdornment>}
                    inputProps={{ min: 0 }}
                    type="number"
                    margin="dense"
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value = {room.markup}
                    onChange={this.handleChange(index, 'markup')}
                    onBlur={this.onBlur(index, 'markup')}
                    startAdornment={<InputAdornment position="start">{hotelInventory.currency.symbol}</InputAdornment>}
                    disabled={true}
                    margin="dense"
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    value = {room.attrition}
                    onChange={this.handleChange(index, 'attrition')}
                    onBlur={this.onBlur(index, 'attrition')}
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    inputProps={{ min: 0 }}
                    type="number"
                    margin="dense"
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs>
                  <IconButton style={{height:'30px', width:'30px'}}>
                    <DeleteIcon onClick={this.handleDelete(index)}/>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            )
          )}
        </Grid>
      </div>
    );
  }
}

const styles = {
  input: {
    width: '80px'
  }
}
export default withStyles(styles)(RoomTypeDailyInventory);
