import React, { Component } from 'react';
import './Events.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';
import SelectEvent from '../SelectEvent/SelectEvent';
import Details from '../Details/Details';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

let i;
let j;
let start_str = '';
let end_str = '';
let id;
let eventsEmbedded = [];
let eventsPlace = [];

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      data: [],
      id: '',
      stateName: modelInstance.getStateCode(),
      date: this.props.date,
      enddate: this.props.enddate,
    };

    this.getDetails.bind(this);
  }


  loadData (props) {
    props.date.setHours(props.date.getHours() + 2)
    props.enddate.setHours(props.enddate.getHours() + 2)
    start_str = props.date.toISOString();
    end_str = props.enddate.toISOString();
    start_str = start_str.substring(0, 19) +'Z';
    end_str = end_str.substring(0,19)+'Z';

    modelInstance.getEventsPerState(props.stateName, start_str, end_str).then(eventsPerState =>
      this.setState({
        status: 'LOADED',
        data: eventsPerState._embedded.events,
        state: props.stateName,
        date: props.date,
        enddate: props.enddate
        })).catch(error =>
          this.setState({
            status: 'ERROR'
          }))
  }

  componentDidMount = () => {
    this.loadData(this.props)
  }

  getDetails = (event) => {
    modelInstance.setId(event.target.id);
  }

  componentWillReceiveProps = (props) => {
    this.loadData(props)
  }


  render() {
    switch (this.state.status) {
      case 'INITIAL':
        return (
          <div className='Events'>
            <div className='loading text-white'> Loading... </div>
          </div>
        )
        break;
      case 'LOADED':
        const {data} = this.state;
        modelInstance.currentEventList = this.state;
        eventsEmbedded.length = 0;
        eventsPlace.length = 0;
        for (i in data) {
          if (data[i].dates.start.localDate == Intl.DateTimeFormat('sv-SV').format(this.props.date)) {
              if (data[i]._embedded) {
                eventsEmbedded.push(data[i])
              }
              else if (data[i].place) {
                eventsPlace.push(data[i])
              }
            }
          }

          return (
              <div className ="Events mt-3">
              <div id='Events'>
              <Carousel showArrows={true} >{eventsEmbedded.map((item, index) => {
                let event = {
                  title: item.name,
                  description: item.info,
                  location: item._embedded ? item._embedded.venues[0].name : item.place[0].address,
                  startTime: item.sales.public.startDateTime,
                  endTime: item.sales.public.startDateTime
                };
                      return (
                        <div>
                            <img src={item.images[0].url}/>
                            <p className="legend">
                              <span key={item.id} onClick={this.getDetails} >
                                <Link to="/details"><b id={item.id}>{item.name}</b></Link><br/>
                              </span>
                             {item.dates.start.localTime}<br/>
                             {item._embedded.venues[0].city.name}, {item._embedded.venues[0].state.name}
                              {
                            // <div style={{display: "inline", marginLeft: "15px"}}>
                            //   <div style={{margin: "0px 15px"}} className="btn btn-primary" onClick={() => window.open(item.url, '_target')}>Buy</div>
                              //   this.state.savedEvents[item.id] ?
                              //   <div style={{margin: "0px 15px"}} className="btn btn-primary" onClick={this.removeFromEvents.bind(this, item)}>Remove</div>
                              // :
                              //   <div style={{margin: "0px 15px"}} className="btn btn-info "onClick={this.addToEvents.bind(this, item)}>Save to list</div>
                              // <div style={{margin: "0px 15px", display: "inline"}} >
                              // <AddToCalendar event={event}/>
                              // </div>
                            // </div>
                          }

                            </p>
                        </div>
                      );
                  })
                }</Carousel>
                {
              // <ul className="list-group">
              // {eventsEmbedded.map(event =>
              //     <li key={event.id} onClick={this.getDetails} className="list-group-item">
              //       <div className="OneEvent" id={event.id}>
              //         <img alt='eventImg' id='eventImg' src={event.images[0].url} width="100" height="65"></img>
              //         <Link to="/details"><b id={event.id}>{event.name}</b></Link><br/>
              //         {event.dates.start.localTime}<br/>
              //         {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}
              //       </div>
              //     </li>
              //   )}
              // </ul>
              }
              <ul className="list-group">
              {eventsPlace.map(event =>
                  <li key={event.id} onClick={this.getDetails} className="list-group-item">
                    <div className="OneEvent" id={event.id}>
                        <img alt='eventImg' id='eventImg' src={event.images[0].url} width="100" height="100"></img>
                      <Link to="/details"><b id={event.id}>{event.name}</b></Link><br/>
                      Time: {event.dates.start.localTime}<br/>
                      {event.place.city.name}
                    </div>
                  </li>
                )}
              </ul>


              </div>
              </div>
              )
        break;
      default:
        return (
          <div className='Events'>
          <div id='Events'>
            <h3 className='failed text-light' > <b>No events were found on this date on this location, please try again.</b> </h3>
          </div>

          </div>
        )
        break;
      }

      return (
        <div className="Events">
        </div>
      )

  }

  renderDetails() {
    return(
    <Details model={this.props.model} id={this.props.id}/>
    )
  }

}

export default Events;
