function CountriesList(resp) {
    this.$element = createCountriesList(resp);

    function createCountriesList(resp) {
        var $countries = $('<ul>').addClass('countries');
        $countries.prev($('<h2>').text('List of countries'));
        
        resp.forEach(function(country) {
            var $country = new Country(country);
            $countries.append($country.$element);
        });

        return $countries;
    }
}