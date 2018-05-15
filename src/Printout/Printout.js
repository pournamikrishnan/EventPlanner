import React, {Component} from 'react';
import './Printout.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';


class Printout extends Component {
  constructor(props) {
    super(props);
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

  update () {
    this.setState({
      morning: modelInstance.getMorning(),
      afternoon: modelInstance.getAfternoon(),
      evening: modelInstance.getEvening(),
    })
  }

  render() {
    const {morning} = this.state;
    const {afternoon} = this.state;
    const {evening} = this.state;

    console.log(morning);
    console.log(afternoon);
    console.log(evening);



    return (
      <div className = "Printout">
      <div className="container">
      <div className='header'>
        <h2 className="mb-4">Events planned for [clicked date]</h2>
      </div>

      <Link to="/search">
        <button id='goBackPrintout' type="button" className=" btn btn-success">Go back and edit schedule</button>
      </Link>

      <div id="dishdiv">
        <div className='table-responsive'>
          <table className='table'>
          <tbody className="tbody" >
            {morning.map(printEvent =>
              <tr key={printEvent.id}>
                <th scope="row">
                    {printEvent.name}
                    <i className="fa fa-clock-o"> </i>{printEvent.dates.start.localTime} <br/><br/>
                    { printEvent.place ? (
                        <i className="fa fa-map-marker">{printEvent.place.address.line1}</i>
                      ) : (
                        <i className="fa fa-map-marker">{printEvent._embedded.venues[0].address.line1}</i>
                    )}
                    { printEvent.priceRanges ? (
                      <i className='fa'>Price range: {printEvent.priceRanges[0].min}-{printEvent.priceRanges[0].max} {printEvent.priceRanges[0].currency}</i>
                    ) : (<i className='fa'> Cost is not available at the moment</i>)}
                </th>
              <td>{printEvent.pleaseNote}</td>
              </tr>
            )}
            {afternoon.map(printEvent =>
              <tr key={printEvent.id}>
              <th scope="row">
                {printEvent.name}
                <i className="fa fa-clock-o"></i>{printEvent.dates.start.localTime} <br/><br/>
                { printEvent.place ? (
                    <i className="fa fa-map-marker">{printEvent.place.address.line1}</i>
                  ) : (
                    <i className="fa fa-map-marker">{printEvent._embedded.venues[0].address.line1}</i>
                )}
                { printEvent.priceRanges ? (
                  <i className='fa'>Price range: {printEvent.priceRanges[0].min}-{printEvent.priceRanges[0].max} {printEvent.priceRanges[0].currency}</i>
                ) : (<i className='fa'> Cost is not available at the moment</i>)}
              </th>
              <td>{printEvent.pleaseNote}</td>
              </tr>
            )}
            {evening.map(printEvent =>
              <tr key={printEvent.id}>
              <th scope="row">
                {printEvent.name}
                <i className="fa fa-clock-o"></i>{printEvent.dates.start.localTime} <br/><br/>
                { printEvent.place ? (
                    <i className="fa fa-map-marker">{printEvent.place.address.line1}</i>
                  ) : (
                    <i className="fa fa-map-marker">{printEvent._embedded.venues[0].address.line1}</i> 
                )}
                { printEvent.priceRanges ? (
                  <i className='fa'>Price range: {printEvent.priceRanges[0].min}-{printEvent.priceRanges[0].max} {printEvent.priceRanges[0].currency}</i>
                ) : (<i className='fa'> Cost is not available at the moment</i>)}
              </th>
              <td>{printEvent.pleaseNote}</td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>

      <button type="button" onClick={() => window.print()} className="btn btn-success mt-4">Print Full Schedule</button>

      </div>
      </div>

    )
  }
}

export default Printout;
