function Country(country) {
    var self = this;
    this.$element = createCountryElement();

    function createCountryElement() {
        var $countryDiv = $('<div>').addClass('country-info')
                                    .append($('<img>').attr('src', country.flag))
                                    .append($('<h3>').text(country.name))
                                    .append(self.createTable(country));
        return $countryDiv;
    }
}

Country.prototype = {
    createTable: function(country) {
        var $thead = this.createTableHead(country);
        var $tbody = this.createTableBody(country);
        var $tfoot = this.createTableFooter();
        return $('<table>').append($thead, $tbody, $tfoot);
    },

    createTableHead: function() {
        return $('<thead>').append('<tr><th colspan="2">Background Information:</th></tr>');
    },

    createTableBody: function(country) {
        var $tbody = $('<tbody>')
                     .append(this.renderLanguages(country))
                     .append(this.renderCurrencies(country))
                     .append(this.renderInformations(country));
        return $tbody;
    },

    renderLanguages: function(country) {
        var languages = country.languages.map(function(lang){
                            return lang.name;
                        }).join(', ');
        return $('<tr>').append($('<th>').text('Languages'))
                        .append($('<td>').text(languages));
    },

    renderCurrencies: function(country) {
        var currency = country.currencies[0].name + ' (' + country.currencies[0].symbol + ')';
        return $('<tr>').append($('<th>').text('Currencies'))
                        .append($('<td>').text(currency).addClass('currency'));
    },

    renderInformations: function(country) {
        var $rows = [];
        for (var key in country) {
            if (['capital', 'region', 'population'].indexOf(key) !== -1) {
                if (key === 'population') {
                    country[key] = ((country[key] / 1000000).toFixed(2)) + ' mln.';
                }
                var capitalizeKey = key.charAt(0).toUpperCase() + key.slice(1);
                var $row = $('<tr>').append($('<th>').text(capitalizeKey))
                                    .append($('<td>').text(country[key]));
                $rows.push($row);
            }
        }
        return $rows;
    },

    createTableFooter: function() {
        return $('<tfoot>').append('<tr><td colspan=2></td></tr>');
    }
};
