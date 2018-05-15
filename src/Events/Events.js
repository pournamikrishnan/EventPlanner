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
      filter: this.props.filter
    };

    this.getDetails.bind(this);
  }

   handleAdd = (e) => {
     console.log(eventsEmbedded);
     console.log(eventsPlace);
     for (i in modelInstance.currentEventList.data) {
       if (e.target.id == modelInstance.currentEventList.data[i].id || e.target.parentNode.id == modelInstance.currentEventList.data[i].id){
         if (e.target.value) {
         modelInstance.addEvent(modelInstance.currentEventList.data[i], e.target.value)
         return;
         } else if (e.target.parentNode.value) {
         modelInstance.addEvent(modelInstance.currentEventList.data[i], e.target.parentNode.value)
        }
       }
      }
   }

  loadData (props) {
    props.date.setHours(props.date.getHours() + 2)
    props.enddate.setHours(props.enddate.getHours() + 2)
    props.enddate.setDate(props.enddate.getDate()+1)
    start_str = props.date.toISOString();
    end_str = props.enddate.toISOString();
    start_str = start_str.substring(0, 19) +'Z';
    end_str = end_str.substring(0,19)+'Z';

    modelInstance.getEventsPerState(props.stateName, start_str, end_str, props.filter).then(eventsPerState =>
      this.setState({
        status: 'LOADED',
        data: eventsPerState._embedded.events,
        state: props.stateName,
        date: props.date,
        enddate: props.enddate,
        filter: props.filter
        })).catch(error =>
          this.setState({
            status: 'ERROR'
          }))
  }

  componentDidMount = () => {
    this.loadData(this.props)
    modelInstance.addObserver(this)
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  getDetails = (event) => {
    modelInstance.setId(event.target.id);
  }

  componentWillReceiveProps = (props) => {
    this.loadData(props)
  }

  update() {
    this.setState({
      stateName: modelInstance.getStateCode(),
      date: this.props.date,
      enddate: this.props.enddate,
    })
  }

  render() {
    const {data} = this.state;
    eventsEmbedded.length = 0;
    eventsPlace.length = 0;
    for (i in data) {
      if (data[i].dates.start.localDate == Intl.DateTimeFormat('sv-SV').format(this.props.date)) {
          if (data[i]._embedded) {
            eventsEmbedded.push(data[i])
            modelInstance.currentEventList = eventsEmbedded;
          }
          else if (data[i].place) {
            eventsPlace.push(data[i])
            modelInstance.currentEventList = eventsPlace;
          }
        }

      }

    switch (this.state.status) {
      case 'INITIAL':
        return (
          <div className='Events'>
            <div className='loading'> Loading... </div>
          </div>
        )
        break;
      case 'LOADED':
        if (eventsEmbedded.length > 0 || eventsPlace.length > 0) {
          console.log(eventsEmbedded);
          console.log(eventsPlace);
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
                                <div key={item.id}>
                                    <img src={item.images[0].url}/>
                                    <div className="legend">
                                      <span key={item.id} onClick={this.getDetails} >
                                        <Link to="/details"><b id={item.id}>{item.name}</b></Link><br/>
                                      </span>
                                      <div className="OneEvent col-sm-2 m-auto" id={item.id} >
                                        <button id={item.id} value='1' className='removeEvent btn btn-success ' onClick={this.handleAdd}>
                                          Add
                                        </button>
                                      </div>
                                     {item.dates.start.localTime}<br/>
                                     {item._embedded.venues[0].city.name}, {item._embedded.venues[0].state.name}
                                    </div>
                                </div>
                              );
                          }

                        )
                        }
                      </Carousel>
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
            ) }
        break;
      default:
        return (
          <div className='Events'>
              <div id='Events' className='col-sm-8'>
                <br/>
                <div className='failed'> <b>No events were found on this date at this location, please try again.</b> </div>
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
