
const httpOptions = {
  headers: { 'X-Mashape-Key': 'ajp0wkSehryzWQo24JvhNAuCF6RX2wyN'}
};

const EventModel = function () {
  let numberOfGuests = 4;
  let observers = [];
  let scheduleMorning = new Array();
  let scheduleAfternoon = new Array();
  let scheduleEvening = new Array();
  let timeDivideSchedule = new Array();
  let i;
  let state = '';
  let startTime;
  let endTime;
  let id;
  let stateCode;

  this.setNumberOfGuests = function (num) { //NOT USED YET
    if (num <= 0) {
      numberOfGuests = 0;
    }
    numberOfGuests = num;
    localStorage.setItem("NOG", num)
    notifyObservers();
  };

  this.getNumberOfGuests = function () { //NOT USED YET
    if (JSON.parse(localStorage.getItem("NOG"))) {
        return JSON.parse(localStorage.getItem("NOG"));
      } else {
          return numberOfGuests;
        }
  };

  this.setId = function(id) { //NOT USED YET
    localStorage.setItem("ID", id);
    notifyObservers();
  };

  this.getId = function() {
    if (localStorage.getItem("ID")){
      return localStorage.getItem("ID");
      }
    };

  this.setStateCode = function(stateCode) { //NOT USED YET
    localStorage.setItem("stateCode", stateCode);
    console.log(stateCode);
    notifyObservers();
  };

  this.getStateCode = function() {
        console.log(stateCode);
    if (localStorage.getItem("stateCode")){
      return localStorage.getItem("stateCode");
      }
    };

  this.addEvent = function(event, value) {
    if (value == 1) {
      for (i in scheduleMorning){
        if (event.id === scheduleMorning[i].id){
          scheduleMorning.splice(i, 1)
        }
      }
      scheduleMorning.push(event);
    } else if (value == 2) {
          for (i in scheduleAfternoon){
            if (event.id === scheduleAfternoon[i].id){
              scheduleAfternoon.splice(i, 1)
            }
          }
      scheduleAfternoon.push(event);
      } else {
        for (i in scheduleEvening){
          if (event.id === scheduleEvening[i].id){
            scheduleEvening.splice(i, 1)
          }
        }
      scheduleEvening.push(event);
      }
    notifyObservers();
    }

  this.getMorning = function() {
      return scheduleMorning;
  }
  this.getAfternoon = function() {
      return scheduleAfternoon;
  }
  this.getEvening = function() {
      return scheduleEvening;
  }

  this.eventTimeDivide = function(event) {
    timeDivideSchedule.push(event);
    notifyObservers();
  }

  this.getFullPrice = function() {
      let totalPrice = 0;

      return Math.floor(totalPrice);
  }

  this.removeEvent = function(id, value){
    if (value == 1) {
      for (i in scheduleMorning) {
        if (id == scheduleMorning[i].id) {
          scheduleMorning.splice(i, 1)
        }
        notifyObservers();
      }
      return scheduleMorning;
    }
    else if (value == 2) {
      for (i in scheduleAfternoon) {
        if (id == scheduleAfternoon[i].id) {
          scheduleAfternoon.splice(i, 1)
        }
        notifyObservers();

      }
      return scheduleAfternoon;
    }
    else {
      for (i in scheduleEvening) {
        if (id == scheduleEvening[i].id) {
          scheduleEvening.splice(i, 1)
        }
        notifyObservers();

      }
      return scheduleEvening;
    }

}

  // API Calls

  this.getEventsPerState = function (state, startTime, endTime) {
    let url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ajp0wkSehryzWQo24JvhNAuCF6RX2wyN&stateCode=' + state + '&startDateTime=' + startTime + '&endDateTime=' + endTime +'&size=10' ;
    return fetch(url)
      .then(processResponse)
      .catch(handleError)
  }


  this.getEventDetails = function (id) {
    const url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ajp0wkSehryzWQo24JvhNAuCF6RX2wyN&id=' + id
    return fetch(url)
      .then(processResponse)
      .catch(handleError)

  }
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getEventsPerState() API Error:', error.message || error)
      })
    } else {
      console.error('getEventsPerState() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());

  };
};

export const modelInstance = new EventModel();
