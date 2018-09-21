import React from 'react';

class BackgroundSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      items:[
        <div key={1} className="item active" />,
        <div key={2} className="item" />,
        <div key={3} className="item" />
      ]
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      let {items} = this.state;
      let div = items.shift();
      items.push(div);
      this.setState({items});
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="background-container">
        <div className="carousel carousel-fade">
          <div className="carousel-inner">
            {this.state.items}
          </div>
        </div>
      </div>
    );
  }
}


export default BackgroundSlider;
