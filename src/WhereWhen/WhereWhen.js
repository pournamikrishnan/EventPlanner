import React, { Component } from 'react';
import { modelInstance } from '../data/EventModel';
import Events from '../Events/Events';
import './WhereWhen.css';
import user_logo from '../media/user_logo.png';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar'; //https://www.npmjs.com/package/react-calendar
import date from 'react-calendar';
import moment from 'moment';
import search from '../SelectEvent/SelectEvent'
import welcome from '../Welcome/Welcome'

let enddate = new Date();
let i;
let morningEventList = [];
let afternoonEventList = [];
let eveningEventList = [];

class WhereWhen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      stateName: modelInstance.getStateCode(),
      date: new Date(),
      enddate: new Date(),
    }

    this.searchState.bind(this)
    this.searchFilter.bind(this)

  }
  componentDidMount = () => {
    modelInstance.addObserver(this)
  }

  searchState = (event) => {
    this.setState({ stateName: event.target.value });
  }

  searchFilter = (event) => {
    this.setState({ filter: event.target.value })
  }

  setDate = date => {
    enddate.setTime(date.getTime());
    enddate.setHours(enddate.getHours() + 24);

    this.setState({
      date: date,
      enddate: enddate
    })
  }

  update() {
    this.setState({
      date: date,
      enddate: enddate,
    })
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  currentEventFunc = () => { // HOURS TO SECONDS
    morningEventList.length = 0;
    afternoonEventList.length = 0;
    eveningEventList.length = 0;
    for (i in modelInstance.currentEventList.data) {
      if (modelInstance.currentEventList.data[i].dates.start.localTime != undefined) {
        var timeElement = modelInstance.currentEventList.data[i].dates.start.localTime.split(':')
        var timeInSeconds = (+timeElement[0])*60*60+(+timeElement[1])*60+(+timeElement[2]);
        if (timeInSeconds < 43200) {
          morningEventList.push(modelInstance.currentEventList.data[i])
        }
        else if (timeInSeconds >= 43200 && timeInSeconds < 64800){
          afternoonEventList.push(modelInstance.currentEventList.data[i])
        }
        else if (timeInSeconds >= 64800 && timeInSeconds < 86400){
          eveningEventList.push(modelInstance.currentEventList.data[i])
        }
      }
    }

    modelInstance.morningEventList = morningEventList;
    modelInstance.afternoonEventList = afternoonEventList;
    modelInstance.eveningEventList = eveningEventList;
  }



  render() {
    return (
      <div className='WhereWhen'>
        <div className="container">
          <div className='row'>
            <div className="col-lg-4">
              <Calendar
                onChange={this.setDate}
                value={this.state.date}
              />
              <div className='btnDiv'>
              <Link to="/">
                <button className="backHome btn btn-success mt-5 btn-l"><i className="fa fa-angle-left"></i> Back to Home</button>
              </Link>
                <Link to="/search">
                  <button className="seeTime btn btn-success mt-5 btn-l" onClick={this.currentEventFunc}>See Time <i className="fa fa-angle-right"></i></button>
                </Link>
              </div>

            </div>
            <div id="searchInput" className='col-md-8'>
              <form  onSubmit={this.searchSubmit}>
              <div className="row">
                  <div className="col">
                    <input id="searchTxt" className="form-control mb-2 mr-sm-2" type="text" name="" placeholder="Search event" onChange={this.searchFilter} />
                  </div>
                  <div className="col">
                    <select id="typeState" name="types" className="form-control mb-2 mr-sm-2" placeholder="Select state" value={this.state.stateName} onChange={this.searchState}>
                      <option value="">Select state</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>

                    </select>
                  </div>
              </div>

              </form>

              <Events model={this.props.model} stateName ={this.state.stateName} date={this.state.date} enddate={this.state.enddate} />

            </div>
          </div>
        </div>
      </div>

    );

  }

  /*<form className="form-inline" onSubmit={this.searchSubmit}>
      <div className="form-group ">
        <input id="searchTxt" className="form-control mb-2 mr-sm-2" type="text" name="" placeholder="Search event" onChange={this.searchFilter} />
      </div>



   /<div className="form-group ">
        <select id="typeState" name="types" className="form-control mb-2 mr-sm-2" placeholder="Select state" value={this.state.state} onChange={this.searchState}>
            <option value="">Select state</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>

        </select>
      </div>

  </form>*/

}

export default WhereWhen;
