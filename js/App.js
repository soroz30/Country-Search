$(function() {
    var $searchInput = new Search();

    $('.main').append($('<h1><a href="index.html">Country search engine</a></h1>'))
              .append($searchInput.$element)
              .append('<div class="hidden-element"><h1>Country search engine</h1></div');

    $('body').vegas({
        slides: [
            { src: 'img/mountain.jpg' },
            { src: 'img/beach.jpg' },
            { src: 'img/lake.jpg' },
            { src: 'img/city.jpg' },
            { src: 'img/field.jpg' }
        ],
        overlay: true,
        timer: false,
        delay: 7500
    });
});