function CountriesList(resp) {
    this.$element = createCountriesList(resp);

    function createCountriesList(resp) {
        var $countries = $('<ul>').addClass('countries');
        
        resp.forEach(function(country, index) {
            var $country = new Country(country);
            if (resp.length < 10) {
                setTimeout(() => {
                    $country.$element.appendTo($countries).hide().fadeIn(500);
                }, index * 100);
            } else {
                $country.$element.appendTo($countries).hide().fadeIn(1000);
            }
        });

        return $countries;
    }
}