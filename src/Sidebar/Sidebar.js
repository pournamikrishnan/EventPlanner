import React, { Component } from 'react';
import './Sidebar.css';
import {modelInstance} from '../data/EventModel';
import { Link } from 'react-router-dom';

let i;
class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      morning: modelInstance.getMorning(),
      afternoon: modelInstance.getAfternoon(),
      evening: modelInstance.getEvening(),
    }
  }

  componentDidMount() {
    modelInstance.addObserver(this)
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  update() {
    this.setState({
      morning: modelInstance.getMorning(),
      afternoon: modelInstance.getAfternoon(),
      evening: modelInstance.getEvening(),
    })
  }

  removeEvent = (e) => {
    if (e.target.value) {
      modelInstance.removeEvent(e.target.id, e.target.value)
      return;
    } else if (e.target.parentNode.value) {
      modelInstance.removeEvent(e.target.parentNode.id, e.target.parentNode.value)
   }
  }

  render() {
      const {morning} = this.state;
      const {afternoon} = this.state;
      const {evening} = this.state;

          return (
              <div className ="Sidebar">
              <div id='Sidebar'>
              {/* <p className="text-white">Note: Your choosen events for [date]</p> */}
                <h4 className="mb-4 text-white">Your choosen events for <b>date</b></h4>
                    {/*MORNING SCHEDULE*/}
                    <div className="card-header bg-grey text-white text-center" role="tab" id="headingOne">
                        <a data-toggle="collapse" data-parent="#accordion" href="#" aria-expanded="true" className="text-white" aria-controls="collapseOne">
                          Morning
                        </a>
                    </div>
                    <ul className="list-group">
                    {morning.map(scheduledEvent =>
                      <li key={scheduledEvent.id} className="list-group-item p-0" >
                          <div className="OneEvent" id={scheduledEvent.id}>
                        <div className="container-fluid py-2">
                          <div className="row">
                            <div className='col-sm-3 m-auto'>
                              <div className="font1">
                                <i className="fa fa-clock-o"></i>  {scheduledEvent.dates.start.localTime}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                              <b>{scheduledEvent.name}</b><br/>
                              { scheduledEvent.place ? (
                                <div className="text-muted"><i className="fa fa-map-marker"></i> {scheduledEvent.place.address.line1}</div>
                              ) : (
                                <div className="text-muted"><i className="fa fa-map-marker"></i> {scheduledEvent._embedded.venues[0].address.line1}</div>
                              )
                            }
                            </div>
                            <div className="OneEvent col-sm-3 m-auto" id={scheduledEvent.id}>
                                <button id={scheduledEvent.id} value='1' className='removeEvent btn btn-success' onClick={this.removeEvent}>
                                   Remove
                                </button>
                            </div>
                          </div>
                          </div>
                          </div>
                      </li>
                    )}
                    </ul>

                    {/*AFTERNOON SCHEDULE*/}
                    <div className="card-header bg-grey text-white text-center" role="tab" id="headingTwo">
                        <a data-toggle="collapse" data-parent="#accordion" href="#" aria-expanded="true" className="text-white" aria-controls="collapseOne">
                        Afternoon
                        </a>
                    </div>
                    <ul className="list-group">
                    {afternoon.map(scheduledEvent =>
                      <li key={scheduledEvent.id} className="list-group-item p-0">
                          <div className="OneEvent " id={scheduledEvent.id}>
                        <div className="container-fluid py-2">
                          <div className="row">
                            <div className='col-sm-3 m-auto'>
                              <div className="font1">
                                <i className="fa fa-clock-o"></i> {scheduledEvent.dates.start.localTime}
                              </div>
                            </div>
                            <div className='col-sm-6'>
                              <b>{scheduledEvent.name}</b><br/>
                              { scheduledEvent.place ? (
                                <div className="text-muted"><i className="fa fa-map-marker"></i> {scheduledEvent.place.address.line1}</div>
                              ) : (
                                <div className="text-muted"><i className="fa fa-map-marker"></i> {scheduledEvent._embedded.venues[0].address.line1}</div>
                              )
                            }
                            </div>
                            <div className="OneEvent col-sm-3 m-auto" id={scheduledEvent.id}>
                                <button id={scheduledEvent.id} value='2' className='removeEvent btn btn-success' onClick={this.removeEvent}>
                                  Remove
                                </button>
                            </div>
                          </div>
                          </div>
                          </div>
                      </li>
                    )}
                    </ul>

                    {/*EVENING SCHEDULE*/}
                    <div className="card-header bg-grey text-white text-center" role="tab" id="headingThree">
                        <a data-toggle="collapse" data-parent="#accordion" href="#" aria-expanded="true" className="text-white" aria-controls="collapseOne">
                          Evening
                        </a>
                    </div>
                    <ul className="list-group">
                    {evening.map(scheduledEvent =>
                      <li key={scheduledEvent.id} className="list-group-item">
                          <div className="OneEvent" id={scheduledEvent.id}>
                        <div className="container-fluid py-2">
                          <div className="row">
                            <div className='col-sm-3 m-auto'>
                              <div className="font1">
                                <i className="fa fa-clock-o"></i> {scheduledEvent.dates.start.localTime}
                                </div>
                            </div>
                            <div className='col-sm-6'>
                              <b>{scheduledEvent.name}</b><br/>
                              { scheduledEvent.place ? (
                                <div className="text-muted"><i className="fa fa-map-marker"></i> {scheduledEvent.place.address.line1}</div>
                              ) : (
                                <div className="text-muted"><i className="fa fa-map-marker"></i> {scheduledEvent._embedded.venues[0].address.line1}</div>
                              )
                            }
                            </div>
                            <div className="OneEvent col-sm-3 m-auto" id={scheduledEvent.id}>
                                <button id={scheduledEvent.id} value='3' className='removeEvent btn btn-success' onClick={this.removeEvent}>
                                  Remove
                                </button>
                            </div>
                          </div>
                          </div>
                          </div>
                      </li>
                    )}
                    </ul>



              </div>
              </div>
              )
  }
}

export default Sidebar;
