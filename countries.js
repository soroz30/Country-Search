$(function() {
    var url = 'https://restcountries.eu/rest/v2/name/';
    var countriesList = $('#countries');

    function createTableHead(item) {
        return $('<thead>').append('<tr><th colspan="2">Background Information:</th></tr>');
    }

    function renderLanguages(item) {
        var languages = item.languages.map(function(lang){
                            return lang.name;
                        }).join(', ');
        return $('<tr>').append($('<th>').text('Languages'))
                        .append($('<td>').text(languages));
    }

    function renderCurrencies(item) {
        var currency = item.currencies[0].name + ' (' + item.currencies[0].symbol + ')';
        return $('<tr>').append($('<th>').text('Currencies'))
                        .append($('<td>').text(currency).addClass('currency'));
    }

    function renderInformations(item) {
        var $rows = [];
        for (var key in item) {
            if (['capital', 'region', 'population'].indexOf(key) !== -1) {
                if (key === 'population') {
                    item[key] = ((item[key] / 1000000).toFixed(2)) + ' mln.';
                }
                var $row = $('<tr>').append($('<th>').text(key))
                                    .append($('<td>').text(item[key]));
                $rows.push($row);
            }
        }
        return $rows;
    }

    function createTableBody(item) {
        var $tbody = $('<tbody>')
                     .append(renderLanguages(item))
                     .append(renderCurrencies(item))
                     .append(renderInformations(item));
        return $tbody;
    }

    function createTableFooter() {
        return $('<tfoot>').append('<tr><td colspan=2></td></tr>');
    }

    function createTable(item) {
        var $thead = createTableHead(item);
        var $tbody = createTableBody(item);
        var $tfoot = createTableFooter();
        return $('<table>').append($thead, $tbody, $tfoot);
    }

    function addCountry(item) {
        var $div = $('<div>').addClass('country-info')
                             .append($('<img>').attr('src', item.flag))
                             .append($('<h3>').text(item.name))
                             .append(createTable(item));
        $('#countries').append($div);
    }

    function showCountriesList(resp) {
        countriesList.empty();
        resp.forEach(function(item) {
            addCountry(item);
        });
    }

    function searchCountries() {
        var countryName = $('#country-name').val();
        if (!countryName.length) {
            countryName = 'Poland';
        }
        $.ajax({
            url: url + countryName,
            method: 'GET',
            success: showCountriesList
        });
    }

    $('#search').click(searchCountries);
});