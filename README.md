World Cup opening game visualizer
---

This is a techinical challenge to test Frontend development-related skills.

We provide a set of `.json` files with some statistics of the opening game of FIFA World Cup 2018 in Russia. Use
it to build an application to visualize this data in a human readable format. Images of both country flags 
are also provided under the `assets/` directory.


## Requirements

* The final game score has to be shown next to each corresponding team flag.
* Clicking the team's name/flag should display a detailed view of all its match stats
* Show a timeline of all match events _including scores_ and assistances. 
* Substitutions must be presented as a single event in the timeline.
* It must include JavaScript unit tests
* Add an optimized production-ready build of the application with `npm run build`.

### Delivering the project
* Publish the project on a _private_ Git repository using any service you like (i.e.: GitHub, Gitlab, BitBucket, etc)
* The project **MUST** be fully reproducible with a built-in development server after running the following sequence of commands:
```
npm install
npm run serve
```

### Plus points
* A good design counts 😎
* Use a responsible interface
* Make it deployable as a static site on Heroku

## Data files:
All data to be used by this challenge can be found under the `data/` directory. Here's a brief description of each
file and some insights about what you'll find on each one of them.

### `data/match-events.json`
It contains the main match events, including assists, substituitions, game starting and changing times. Events list:

* `Assist-Goal`: the player(s) that assisted a goal
* `Game-Start`: the game has started
* `Game-Change`: the teams changed sides of the field
* `In`/`Out`: Substituition including the player entering the game (`In`) the replaced player (`Out`)
* `Yellow-Card`: a yellow card was given to a player

### `data/match-scorers.json`
It contains player and time information abouteach goal scored.

### `data/match-stats.json`
It contains statistics about how both teams performed during the entire match.
