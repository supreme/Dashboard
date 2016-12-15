/**
 * Typeahead completion for search bar.
 * @author Stephen Andrews
 * @since 12.14.16
 */
'use strict';

$(document).ready(() => {
  let search = $('#search');
  let mappings = [];
  let getMappings = (callback) => {
     $.get('/api/mappings', (data) => {
       mappings = data;
       callback()
     });
  }

  getMappings(() => {
    search.typeahead({
        source: mappings,
        minLength: 0,
        afterSelect: (obj) => {
          var dest = obj['dest'];
          window.location.href = dest;
        }
      });
  });

  search.on('focus', () => {
    console.log('click');
    $('.typeahead').css('min-width', search.width() + 25);
    $('.typeahead').css('display', 'block');
  });

  search.on('focusout', () => {
    $('.typeahead').css('display', 'none');
  });
});
