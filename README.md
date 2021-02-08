# ALTI

0a. Try it as a GitHub template repository! Or,

0b. Clone this repo, replacing `<project>` with the new project name.
 * `git clone -o alti -b master --single-branch git@github.gatech.edu:c21u/alti.git <project>`
 
1. rename project
 * find and replace `alti` in the project (4 places, including changing the name for the Docker repo, and excluding this readme.)

2. Run `yarn install`

3. ensure all env variables are set
 * copy or rename `example.env` to `.env`
 * fill out the required variables.
 * check config.js for other vars to set.

4. Replace `CHANGELOG.md` and `README.md` for the new project.
