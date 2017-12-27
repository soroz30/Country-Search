var URL = 'https://restcountries.eu/rest/v2/name/';

function Search() {
    var self = this;
    this.$element = createSearchInput();

    function createSearchInput() {
        var $search = $('<div>').addClass('search');
        var $button = $('<button>').addClass('button').text('Search a country');
        var $input = $('<input>').addClass('country-name');

        function searchCountries() {
            var countryName = $input.val();
            if (!countryName.length) {
                countryName = 'Poland';
            }
            $.ajax({
                url: URL + countryName,
                method: 'GET',
                success: self.showCountriesList.bind(self),
                error: self.handleError.bind(self)
            });
        }

        $button.on('click', searchCountries);
        $input.on('keypress', function(e) {
            if (e.which === 13) {
                searchCountries();
            }
        });

        $search.append($button)
               .append($input);

        return $search;
    }
}

Search.prototype = {
    showCountriesList: function(resp) {
        var $countriesList = new CountriesList(resp);
        this.removeContent();
        this.$element.after($countriesList.$element);
    },

    handleError: function() {
        this.removeContent();
        this.$element.after($('<p>').text('Data is not available'));
    },

    removeContent: function() {
        this.$element.nextAll().remove();
    }
};
