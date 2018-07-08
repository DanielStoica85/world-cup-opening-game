class UI {

    constructor() {
        this.statsSection = document.getElementById('content');
        this.russianColor = document.getElementById('container').style.borderLeftColor;
        this.arabianColor = document.getElementById('container').style.borderRightColor;
        this.statsTitle = document.getElementById('content-title');
        this.statsDiv = document.getElementById('stats');
    }

    showStats(teamStats) {

        // clear stats section
        if (this.statsDiv) {
            this.statsDiv.innerHTML = '';
        }

        // display data
        this.updateStatsTitle(teamStats.teamName);
        this.addStatistic(teamStats.teamStats);

    }

    updateStatsTitle(teamName) {
        console.log('Should update title.');
        this.statsTitle.textContent = `${teamName} statistics`;
    }

    addStatistic(stats) {

        for (let key in stats) {
            let result = key.replace(/([A-Z])/g, " $1");
            let statistic = result.charAt(0).toUpperCase() + result.slice(1);
            let statisticValue = stats[key];
            let output = `<h2 class="stat-value">${statisticValue}</h2>
                    <h3 class="stat-name">${statistic}</h3>`;
            const statDiv = document.createElement('div');
            statDiv.classList.add('stat');
            statDiv.innerHTML = output;
            this.statsDiv.appendChild(statDiv);
        }

    }
}