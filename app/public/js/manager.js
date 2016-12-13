/**
 * Manages the content of dynamic cards.
 * @author Stephen Andrews
 * @since 12.13.16
 */
'use strict'

/**
 * Compares today's date with the specified Unix time.
 * @param  {Integer}  date The date in Unix time.
 * @return {Boolean}      True if the specified date is today.
 */
let isToday = (date) => {
  let today = new Date(Date.now());
  let parsed = new Date(date);
  return today.getDay() === parsed.getDay()
    && today.getMonth() === parsed.getMonth()
    && today.getYear() === parsed.getYear();
}
/**
 * Event card
 * =======================================
 */
let getTodaysEvents = (e) => {
  return isToday(e.date);
}

let renderEventCard = (events) => {
  let content = $('#event-card .content');
  for (var e of events) {
    let template = `<div class="event">
                      <div class="content">
                        <p class="name">${e.name}</p>
                        <p class='org text-muted'>${e.org}</p>
                      </div>
                      <p class="time">${e.time}</p>
                    </div>`;
    content.append(template);
  }
}

let displayEvents = (events) => {
  let todaysEvents = events.filter(getTodaysEvents)
  console.log(todaysEvents);
  renderEventCard(todaysEvents);
}

$.ajax({
  type: "GET",
  url: '/api/events',
  success: (d) => {
    displayEvents(d);
  }
});
