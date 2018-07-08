const ui = new UI();

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