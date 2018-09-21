export const  formatHotelData = (hotelData) => {
  let data = [];
  let rooms = {};

  hotelData.map((hotel, index)=> {
    rooms = {}
    rooms.name = hotel.name;
    hotel.roomTypeSummary.map(room => {
      Object.keys(room).map(r => {
        if(typeof room[r] === 'number'){
          rooms[r] = (rooms[r] === undefined ? 0 : rooms[r]) + room[r]
        }
      })
    })
    data.push(rooms)
  })
  return data;
}
