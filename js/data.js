class Data {

    getEvents(eventsSource) {
        return axios.get(eventsSource);
    }

    getScorers(scorersSource) {
        return axios.get(scorersSource);
    }

    getEventsAndScorers(eventsSource, scorersSource) {
        return axios.all([this.getEvents(eventsSource), this.getScorers(scorersSource)])
            .then(([events, scorers]) => {
                return this.sortHighlights(events, scorers);
            })
            .catch(err => console.log(err));
    }

    sortHighlights(events, scorers) {
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
        // remove country for game start event
        sorted[0].country = '';

        return sorted;
    }

}