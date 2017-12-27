$(function() {
    var $searchInput = new Search();

    $('#main').append($('<h1>').text('Country search engine'))
              .append($searchInput.$element);
});