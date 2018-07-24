'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function () {
    function UI() {
        _classCallCheck(this, UI);

        this.statsSection = document.getElementById('content');
        this.statsDiv = document.getElementById('stats');
        this.highlightsDiv = document.getElementById('highlights');
    }

    _createClass(UI, [{
        key: 'displayHighlights',
        value: function displayHighlights(highlights) {
            var _this = this;

            // clear stats section
            this.statsSection.innerHTML = '';

            // add title
            this.addTitle('Highlights');

            // create highlights div
            var highlightsDiv = document.createElement('div');
            highlightsDiv.id = 'highlights';

            // add all events in highlights div
            highlights.forEach(function (event, index) {
                // game start event
                if (event.eventName === 'Game-Start') {
                    var output = '<div class=\'minute\'>' + event.minute + ' </div>\n                                <div class=\'event\'>Game Started! </div>\n                                <div class=\'icon\'><i class="fas fa-hourglass-start"></i></div>';
                    _this.addEventDiv(highlightsDiv, output);
                }
                // game change event (whatever that means)
                if (event.eventName === 'Game-Change') {
                    var _output = '<div class=\'minute\'>' + event.minute + ' </div>\n                                <div class=\'event\'>Game Changed! </div>\n                                <div class=\'icon\'></div>';
                    _this.addEventDiv(highlightsDiv, _output);
                }
                // assist and goals events
                else if (!event.eventName) {
                        if (highlights[index - 1].eventName === 'Assist-Goal') {
                            var goalEvent = event;
                            var assistEvent = highlights[index - 1];
                            var _output2 = '<div class=\'minute\'>' + goalEvent.minute + ' </div>\n                                <div class=\'event\'>Goal scored by ' + goalEvent.player + ' after a great assist from ' + assistEvent.players[0].playerName + '! </div>\n                                <div class=\'icon\'><i class="fas fa-futbol"></i></div>';
                            _this.addEventDiv(highlightsDiv, _output2);
                        } else {
                            var _goalEvent = event;
                            var _output3 = '<div class=\'minute\'>' + _goalEvent.minute + ' </div>\n                                <div class=\'event\'>Goal scored by ' + _goalEvent.player + '!</div>\n                                <div class=\'icon\'><i class="fas fa-futbol"></i></div>';
                            _this.addEventDiv(highlightsDiv, _output3);
                        }
                    }
                    // substitutions
                    else if (event.eventName === 'Out') {
                            if (highlights[index + 1].eventName === 'In') {
                                var outEvent = event;
                                var inEvent = highlights[index + 1];
                                var _output4 = '<div class=\'minute\'>' + outEvent.minute + ' </div>\n                                    <div class=\'event\'>Player out: ' + outEvent.players[0].playerName + '. Player in: ' + inEvent.players[0].playerName + '.</div>\n                                    <div class=\'icon\'><i class="fas fa-arrow-down"></i><i class="fas fa-arrow-up"></i></div';
                                _this.addEventDiv(highlightsDiv, _output4);
                            } else if (highlights[index - 1].eventName === 'In') {
                                var _outEvent = event;
                                var _inEvent = highlights[index - 1];
                                var _output5 = '<div class=\'minute\'>' + _outEvent.minute + ' </div>\n                                    <div class=\'event\'>Player out: ' + _outEvent.players[0].playerName + '. Player in: ' + _inEvent.players[0].playerName + '.</div>\n                                    <div class=\'icon\'><i class="fas fa-arrow-down"></i><i class="fas fa-arrow-up"></i></div';
                                _this.addEventDiv(highlightsDiv, _output5);
                            }
                        }
                        // yellow cards
                        else if (event.eventName === 'Yellow-Card') {
                                var _output6 = '<div class=\'minute\'>' + event.minute + ' </div>\n                                <div class=\'event\'>Yellow card for ' + event.players[0].playerName + '.</div>\n                                <div class=\'icon\'><i class="card yellow"></i></div';
                                _this.addEventDiv(highlightsDiv, _output6);
                            }
            });

            // add highlights div
            this.statsSection.appendChild(highlightsDiv);
        }
    }, {
        key: 'addEventDiv',
        value: function addEventDiv(parentDiv, output) {
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('highlight');
            eventDiv.innerHTML = output;
            parentDiv.appendChild(eventDiv);
        }
    }, {
        key: 'showStats',
        value: function showStats(teamStats) {

            // clear stats section
            this.statsSection.innerHTML = '';
            // display data
            this.addTitle(teamStats.teamName);
            this.addStatistic(teamStats.teamStats, teamStats.teamName);
        }
    }, {
        key: 'addTitle',
        value: function addTitle(title) {
            var titleDiv = document.createElement('h1');
            titleDiv.id = 'content-title';
            titleDiv.textContent = title;
            this.statsSection.appendChild(titleDiv);
        }
    }, {
        key: 'addStatistic',
        value: function addStatistic(stats, teamName) {

            var statsDiv = document.createElement('div');
            statsDiv.id = 'stats';
            this.statsSection.appendChild(statsDiv);

            teamName = teamName.replace(/\s+/g, '-').toLowerCase();

            for (var key in stats) {
                // from camelCase to separate words
                var result = key.replace(/([A-Z])/g, " $1");
                // get name and value for each statistic items
                var statistic = result.charAt(0).toUpperCase() + result.slice(1);
                var statisticValue = stats[key];
                // display statistics
                var output = '<h2 class="stat-value ' + teamName + '-color">' + statisticValue + '</h2>\n                    <h3 class="stat-name">' + statistic + '</h3>';
                var statDiv = document.createElement('div');
                statDiv.classList.add('stat');
                statDiv.innerHTML = output;
                statsDiv.appendChild(statDiv);
            }
        }
    }, {
        key: 'showError',
        value: function showError(message) {
            // clear stats section
            this.statsSection.innerHTML = '';

            var errorDiv = document.createElement('div');
            errorDiv.id = 'error';
            errorDiv.innerText = message;

            this.statsSection.appendChild(errorDiv);
        }
    }]);

    return UI;
}();