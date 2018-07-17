const ui = new UI();
const data = new Data();

document.addEventListener("DOMContentLoaded", (e) => {

    // get all highlights
    data.getEventsAndScorers()
        .then(highlights => {
            ui.displayHighlights(highlights);
        })
        .catch(err => console.log(err));

    document.querySelector('.header').addEventListener('click', (e) => {

        // if click is on team1/flag1 show team1 stats
        if (e.target.parentElement.id === 'flag1' || e.target.id === 'team1') {
            axios.get('/data/match-stats.json').then((response) => {
                ui.showStats(response.data.team1);
            }).catch(err => {
                console.log(err);
            });
            // if click is on team2/flag2 show team2 stats
        } else if (e.target.parentElement.id === 'flag2' || e.target.id === 'team2') {
            axios.get('/data/match-stats.json').then((response) => {
                ui.showStats(response.data.team2);
            }).catch(err => {
                console.log(err);
            });
        }
    });

    document.getElementById('score').addEventListener('click', (e) => {
        // get all highlights
        data.getEventsAndScorers()
            .then(highlights => {
                ui.displayHighlights(highlights);
            })
            .catch(err => console.log(err));
    });
});