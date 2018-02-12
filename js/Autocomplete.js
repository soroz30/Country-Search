function Autocomplete(url, searchCountries) {
    var self = this;
	this.url = url;
    this.searchCountries = searchCountries;

	this.$listUI = null;

    this.$element = createAutocomplete();
    this.$reset = this.reset.bind(this);

    function createAutocomplete() {
        self.$wrapper = $('<div>').addClass('autocomplete-wrapper');
        self.$input = $('<input>').addClass('country-name');

        self.wrapInput();
        self.createUI();
        self.bindEvents();
        self.valueChanged = self.debounce(self.valueChanged.bind(self), 300);

        self.reset();

        return self.$wrapper;
    }
}

Autocomplete.prototype.bindEvents = function() {
	this.$input.focus(this.handleInput.bind(this));
	this.$input.keydown(this.handleKeydown.bind(this));
	this.$listUI.mousedown(this.handleMousedown.bind(this));
    $('body').click(this.clearListUI.bind(this));
};

Autocomplete.prototype.wrapInput = function() {
	this.$input.insertBefore(this.$wrapper);
	this.$wrapper.append(this.$input);
};

Autocomplete.prototype.createUI = function() {
	this.$listUI = $('<ul>').addClass('autocomplete-ui');
	this.$wrapper.append(this.$listUI);
};

Autocomplete.prototype.draw = function() {
	this.$listUI.empty();

    this.matches.forEach(function(match, index) {
        var $li = $('<li>').addClass('autocomplete-ui-choice');
        if (index === this.selectedIndex) {
            $li.addClass('selected');
            this.$input.val(match);
        }
        $li.text(match);
        this.$listUI.append($li);
    }.bind(this));

	if (this.matches) {
        var selectedIndex = this.selectedIndex || 0;
		var selected = this.matches[selectedIndex];
	}
};

Autocomplete.prototype.fetchMaches = function(query, callback) {
    var self = this;
    $.ajax({
        url: this.url + encodeURIComponent(query),
        method: 'GET',
        success: callback.bind(self)
    });
};

Autocomplete.prototype.handleKeydown = function(event) {
	switch(event.key) {
		case 'Tab':
			this.$input.val(this.matches[0]);
			event.preventDefault();
			this.reset();
			break;
		case 'Enter':
			this.reset();
            this.searchCountries();
			break;
		case 'ArrowUp':
			event.preventDefault();
			if (this.selectedIndex === null || this.selectedIndex === 0) {
				this.selectedIndex = this.matches.length - 1;
			} else {
				this.selectedIndex -= 1;
			}
			this.draw();
			break;
		case 'ArrowDown':
			if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
				this.selectedIndex = 0;
			} else {
				this.selectedIndex += 1;
			}
			this.draw();
			break;
		case 'Escape': // escape
			this.$input.val(this.previousValue);
			this.reset();
			break;
        default:
            this.valueChanged();
            break;
	}
};

Autocomplete.prototype.handleMousedown = function(event) {
	event.preventDefault();

	var element = event.target;
	if (element.classList.contains('autocomplete-ui-choice')) {
		this.$input.val(element.textContent);
        this.searchCountries();
		this.reset();
	}
};

Autocomplete.prototype.reset = function(event) {
	this.visible = false;
	this.matches = [];
	this.selectedIndex = null;
	this.previousValue = null;
	this.draw();
};

Autocomplete.prototype.handleInput = function(e) {
	this.valueChanged();
};

Autocomplete.prototype.valueChanged = function() {
	var value = this.$input.val();
	this.previousValue = value;
	if (value.length > 1) {
		this.fetchMaches(value, function(matches) {
            if (matches) {
			    this.visible = true;
			    this.matches = this.sortMatches(matches);
		      	this.selectedIndex = null;
	   		    this.draw();
            }
		}.bind(this));
	} else {
		this.reset();
	}
};

Autocomplete.prototype.sortMatches = function(matches) {
    var inputValue = this.$input.val().toLowerCase();
    var inputMatch = inputValue;
    var firstLettersInputMatch = '^' + inputValue;
    var filteredMatches = []; 
    matches.filter(function(match) {
        return match.name.toLowerCase().match(new RegExp(firstLettersInputMatch));
    }).forEach(function(match) {
        return filteredMatches.push(match.name);
    });
    return filteredMatches;
};

Autocomplete.prototype.clearListUI = function(event) {
    this.$listUI.empty();
};

Autocomplete.prototype.debounce = function(func, delay) {
    var timeout;
    
    return function() {
        var args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function() {
            func.apply(null, args);
        }, delay);
    };
};