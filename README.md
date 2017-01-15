# Pool League

This is a Pool League app written using riot, redux, bootstrap, and webpack. Here is the link to the associated blog post I wrote on it (http://blog.scottlogic.com/2016/09/02/reading-the-riot-act.html)

## Overview

You can view the league table, fixture list, or fixture grid. Each of these have various options available to the user. Data for players, fixtures, and results is hard-coded in files within the `scripts/data` directory. The scoring mechanism for matches is currently hard-coded within the algorithm (sorry about this).

### League Table

The league table can be sorted in ascending or descending order by a variety of fields

### Fixture List

The fixture list can be filtered by player name, game week, and game status

### Fixture Grid

This is just visually pretty, no interactivity here.

## Build

```
npm install
webpack -p
```

Minified tag script is in `dist/poolLeague.js`. Run `dist/index.html` to see the app in action.

## Development

Run `webpack-dev-server` in the root directory for all the intended benefits.

## Deployment

1. Run `webpack -p`. Minified tag script is in `dist/poolLeague.js`.
2. Delete everything except dist folder.
3. Move contents of dist folder to root directory
4. Push to gh-pages

