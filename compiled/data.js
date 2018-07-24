'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Data = function () {
    function Data() {
        _classCallCheck(this, Data);
    }

    _createClass(Data, [{
        key: 'getEvents',
        value: function getEvents(eventsSource) {
            return axios.get(eventsSource);
        }
    }, {
        key: 'getScorers',
        value: function getScorers(scorersSource) {
            return axios.get(scorersSource);
        }
    }, {
        key: 'getEventsAndScorers',
        value: function getEventsAndScorers(eventsSource, scorersSource) {
            var _this = this;

            return axios.all([this.getEvents(eventsSource), this.getScorers(scorersSource)]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    events = _ref2[0],
                    scorers = _ref2[1];

                return _this.sortHighlights(events, scorers);
            }).catch(function (err) {
                return console.log(err);
            });
        }
    }, {
        key: 'sortHighlights',
        value: function sortHighlights(events, scorers) {
            // List russian events and add country
            var russian = events.data.team1.events.concat(scorers.data.team1.goals);
            russian.forEach(function (event) {
                return event.country = 'Russia';
            });

            // List saudi arabian events and add country
            var arabian = events.data.team2.events.concat(scorers.data.team2.goals);
            arabian.forEach(function (event) {
                return event.country = 'Saudi Arabia';
            });

            // get all events and goals
            var highlights = russian.concat(arabian);

            // sort events by minute
            var sorted = _.sortBy(highlights, 'minute');

            // remove game start duplicate event
            sorted.shift();
            // remove country for game start event
            sorted[0].country = '';

            return sorted;
        }
    }]);

    return Data;
}();