var URL = 'https://restcountries.eu/rest/v2/name/';

function Search() {
    var self = this;
    this.$element = createSearchInput();

    function createSearchInput() {
        var $search = $('<div>').addClass('search');
        var $button = $('<button>').addClass('button').text('Search');
        var $inputWrapper = new Autocomplete(URL, searchCountries.bind(self)).$element;
        var $input = $inputWrapper.find('input');

        function searchCountries() {
            var countryName = $input.val();
            if (!countryName.length) {
                return self.showCountriesList();
            }
            $.ajax({
                url: URL + countryName,
                method: 'GET',
                success: function(resp) {
                    self.showCountriesList(resp, countryName);
                },
                error: self.handleError.bind(self)
            });
        }

        $button.on('click', searchCountries);

        $search.append($inputWrapper)
               .append($button);

        return $search;
    }
}

Search.prototype = {
    showCountriesList: function(resp, countryName) {
        var countries = this.filterResponse(resp, countryName);
        var $countriesList = new CountriesList(countries);
        this.removeContent();
        this.$element.next().after($countriesList.$element);
    },

    handleError: function() {
        this.removeContent();
        this.$element.next().after($('<p class="info">').text('Data is not available!'));
    },

    removeContent: function() {
        this.$element.nextAll('ul, .info').remove();
    },

    filterResponse: function(resp, countryName) {
        var firstLettersInputMatch = '^' + countryName;
        return resp.filter(function(country) {
            return country.name.toLowerCase().match(new RegExp(firstLettersInputMatch));
        });
    }
};
