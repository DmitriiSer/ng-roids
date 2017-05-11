# NgRoids

## Description

From [Wikipedia](https://en.wikipedia.org/wiki/Asteroids_(video_game)):

> Asteroids is an arcade space shooter released in November 1979 by Atari, Inc. and designed by Lyle Rains, Ed Logg, and Dominic Walsh.
> The player controls a spaceship in an asteroid field which is periodically traversed by flying saucers. The object of the game is to
> shoot and destroy asteroids and saucers while not colliding with either or being hit > by the saucers' counter-fire. The game becomes
> harder as the number of asteroids increases.

## [Demo](https://dmitriiser.github.io/ng-roids/)

## Todo list
- [x] ~~Shooting~~
- [ ] The legend shows what keys are available and what keys are active (pressed)
- [ ] Add asteroid component
- [ ] Randomly generate moving asteroids
- [ ] Create collision detection mecanism
- [ ] Collision animation(s)
- [ ] Add stars
- [ ] Better acceleration / deceleration physics. Velocity vectors are directional. Trying to accelerate in an opposite direction should combine 2 different velocity vectors.
- [ ] Better acceleration / deceleration physics. Rotation without acceleration drops current velocity faster?
- [ ] Launching missiles

## Prerequisites

1. [Node.js v6.xx](https://nodejs.org/en/download/)
2. NPM (included in Node.js package)
3. [Angular CLI](https://cli.angular.io/) installed globally

    a. You don't have it already installed:

    - run `npm install -g @angular/cli`

    b. You installed an older version of Angular CLI

    - Here is the manual on how to [update Angular CLI](https://github.com/angular/angular-cli#updating-angular-cli)

## Quick guide

1. Clone the repository
2. Navigate to the local repository folder
3. Run `npm install`
4. Run `ng serve`
5. Open browser at `http://localhost:4200/`