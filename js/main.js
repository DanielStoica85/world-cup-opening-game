const ui = new UI();
const data = new Data();

document.addEventListener("DOMContentLoaded", function (e) {

    // get all highlights
    data.getEventsAndScorers()
        .then(highlights => {
            ui.displayHighlights(highlights);
        })
        .catch(err => console.log(err));

    document.addEventListener('click', function (e) {

        if (e.target.parentElement.id === 'flag1' || e.target.id === 'team1') {
            axios.get('/data/match-stats.json').then((response) => {
                ui.showStats(response.data.team1);
            }).catch(err => {
                console.log(err);
            });
        } else if (e.target.parentElement.id === 'flag2' || e.target.id === 'team2') {
            axios.get('/data/match-stats.json').then((response) => {
                ui.showStats(response.data.team2);
            }).catch(err => {
                console.log(err);
            });
        }
    });
});