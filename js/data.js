class Data {

    constructor() {
        this.russianEvents = [];
        this.arabianEvents = [];
        this.highlights = {};
    }

    getEvents() {
        return axios.get('../data/match-events.json');
    }

    getScorers() {
        return axios.get('../data/match-scorers.json');
    }

    getEventsAndScorers() {
        return axios.all([this.getEvents(), this.getScorers()])
            .then(([events, scorers]) => {

                // List russian events and add country
                let russian = events.data.team1.events.concat(scorers.data.team1.goals);
                russian.forEach(event => event.country = 'Russia');

                // List saudi arabian events and add country
                let arabian = events.data.team2.events.concat(scorers.data.team2.goals);
                arabian.forEach(event => event.country = 'Saudi Arabia');

                // get all events and goals
                const highlights = russian.concat(arabian);
                // sort events by minute
                let sorted = _.sortBy(highlights, 'minute');
                // remove game start duplicate event
                sorted.shift();
                sorted[0].country = '';
                return sorted;
            })
            .catch(err => console.log(err));
    }

}