class UI {

    constructor() {
        this.statsSection = document.getElementById('content');
        this.statsTitle = document.getElementById('content-title');
        this.statsDiv = document.getElementById('stats');
        this.highlightsDiv = document.getElementById('highlights');
    }

    showStats(teamStats) {

        this.highlightsDiv = document.getElementById('highlights');
        this.highlightsDiv.style.display = 'none';
        this.statsDiv = document.getElementById('stats');
        this.statsDiv.style.display = 'none';
        // display data
        this.updateStatsTitle(teamStats.teamName);
        this.addStatistic(teamStats.teamStats);

    }

    updateStatsTitle(teamName) {
        this.statsTitle.textContent = `${teamName} statistics`;
    }

    addStatistic(stats) {

        const statsDiv = document.createElement('div');
        statsDiv.id = 'stats';
        this.statsSection.appendChild(statsDiv);

        for (let key in stats) {
            // from camelCase to separate words
            let result = key.replace(/([A-Z])/g, " $1");
            // get name and value for each statistic items
            let statistic = result.charAt(0).toUpperCase() + result.slice(1);
            let statisticValue = stats[key];
            // display statistics
            let output = `<h2 class="stat-value">${statisticValue}</h2>
                    <h3 class="stat-name">${statistic}</h3>`;
            const statDiv = document.createElement('div');
            statDiv.classList.add('stat');
            statDiv.innerHTML = output;
            statsDiv.appendChild(statDiv);
        }

    }

    addEventDiv(parentDiv, output) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('highlight');
        eventDiv.innerHTML = output;
        parentDiv.appendChild(eventDiv);
    }

    displayHighlights(highlights) {

        const highlightsDiv = document.createElement('div');
        highlightsDiv.id = 'highlights';
        this.statsSection.appendChild(highlightsDiv);

        highlights.forEach((event, index) => {
            // game start event
            if (event.eventName === 'Game-Start') {
                const output = `<div class='minute'>${event.minute} </div>
                                <div class='event'>Game Started! </div>
                                <div class='icon'><i class="fas fa-hourglass-start"></i></div>`;
                this.addEventDiv(highlightsDiv, output);
            }
            // game change event (whatever that means)
            if (event.eventName === 'Game-Change') {
                const output = `<div class='minute'>${event.minute} </div>
                                <div class='event'>Game Changed! </div>
                                <div class='icon'></div>`;
                this.addEventDiv(highlightsDiv, output);
            }
            // assist and goals events
            else if (!event.eventName) {
                if (highlights[index - 1].eventName === 'Assist-Goal') {
                    let goalEvent = event;
                    let assistEvent = highlights[index - 1];
                    const output = `<div class='minute'>${goalEvent.minute} </div>
                                <div class='event'>Goal scored by ${goalEvent.player} after a great assist from ${assistEvent.players[0].playerName}! </div>
                                <div class='icon'><i class="fas fa-futbol"></i></div>`;
                    this.addEventDiv(highlightsDiv, output);
                } else {
                    let goalEvent = event;
                    const output = `<div class='minute'>${goalEvent.minute} </div>
                                <div class='event'>Goal scored by ${goalEvent.player}!</div>
                                <div class='icon'><i class="fas fa-futbol"></i></div>`;
                    this.addEventDiv(highlightsDiv, output);
                }
            }
            // substitutions
            else if (event.eventName === 'Out') {
                if (highlights[index + 1].eventName === 'In') {
                    let outEvent = event;
                    let inEvent = highlights[index + 1];
                    const output = `<div class='minute'>${outEvent.minute} </div>
                                    <div class='event'>Player out: ${outEvent.players[0].playerName}. Player in: ${inEvent.players[0].playerName}.</div>
                                    <div class='icon'><i class="fas fa-arrow-down"></i><i class="fas fa-arrow-up"></i></div`;
                    this.addEventDiv(highlightsDiv, output);
                } else if (highlights[index - 1].eventName === 'In') {
                    let outEvent = event;
                    let inEvent = highlights[index - 1];
                    const output = `<div class='minute'>${outEvent.minute} </div>
                                    <div class='event'>Player out: ${outEvent.players[0].playerName}. Player in: ${inEvent.players[0].playerName}.</div>
                                    <div class='icon'><i class="fas fa-arrow-down"></i><i class="fas fa-arrow-up"></i></div`;
                    this.addEventDiv(highlightsDiv, output);
                }
            }
            // yellow cards
            else if (event.eventName === 'Yellow-Card') {
                const output = `<div class='minute'>${event.minute} </div>
                                <div class='event'>Yellow card for ${event.players[0].playerName}.</div>
                                <div class='icon'><i class="card yellow"></i></div`;
                this.addEventDiv(highlightsDiv, output);
            }
        });
    }
}