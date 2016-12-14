/**
 * Manages the content of dynamic cards.
 * @author Stephen Andrews
 * @since 12.13.16
 */
'use strict'

/**
 * Compares today's date with the specified Unix time.
 * @param  {Integer}  date The date in Unix time.
 * @return {Boolean}       True if the specified date is today.
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

/**
 * Inteded to be used in a filter function to remove events not occuring today.
 * @param  {Object} e A singular event.
 * @return {Boolean}  True if the event date is today.
 */
let getTodaysEvents = (e) => {
  return isToday(e.date);
}

/**
 * Sorts through events that are occuring today and renders them to the
 * campus events card. Appends each event to the event card formatted to
 * a simple template.
 * @param  {Object} events All of the events fetched from the /api/events.
 */
let displayCampusEvents = (events) => {
  let todaysEvents = events.filter(getTodaysEvents)
  let content = $('#event-card .content');
  for (var e of events) {
    let template = `<div class="event">
                      <p class="name">${e.name}</p>
                      <p class="time">${e.time}</p>
                      <p class='org text-muted'>${e.org}</p>
                    </div>`;
    content.append(template);
  }
}

/**
 * AJAX request to fetch the list of campus events.
 */
$.ajax({
  type: "GET",
  url: '/api/events',
  success: (d) => {
    displayEvents(d);
  }
});
