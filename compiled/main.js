'use strict';

var ui = new UI();
var data = new Data();

document.addEventListener("DOMContentLoaded", function (e) {

    // get all highlights
    data.getEventsAndScorers('../data/match-events.json', '../data/match-scorers.json').then(function (highlights) {
        ui.displayHighlights(highlights);
    }).catch(function (err) {
        console.log(err);
        ui.showError('Unable to fetch highlights of this match. Please try again later!');
    });

    document.querySelector('.header').addEventListener('click', function (e) {

        // if click is on team1/flag1 show team1 stats
        if (e.target.parentElement.id === 'flag1' || e.target.id === 'team1') {
            axios.get('/data/match-stats.json').then(function (response) {
                ui.showStats(response.data.team1);
            }).catch(function (err) {
                console.log(err);
            });
            // if click is on team2/flag2 show team2 stats
        } else if (e.target.parentElement.id === 'flag2' || e.target.id === 'team2') {
            axios.get('/data/match-stats.json').then(function (response) {
                ui.showStats(response.data.team2);
            }).catch(function (err) {
                console.log(err);
            });
        }
    });

    document.getElementById('score').addEventListener('click', function (e) {
        // get all highlights
        data.getEventsAndScorers('../data/match-events.json', '../data/match-scorers.json').then(function (highlights) {
            ui.displayHighlights(highlights);
        }).catch(function (err) {
            console.log(err);
            ui.showError('Unable to fetch highlights of this match. Please try again later!');
        });
    });
});