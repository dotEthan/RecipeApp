# Recipeasy
[Landing Page is Here!](https://stupefied-morse-5e1233.netlify.com/)

You can register to save your own recipes or use the "Test Mode" button on the main page to load dummy recipes to test functionality with.

[Figma Redesign document](https://www.figma.com/file/ELOJaxxPqc3QnOjwqgVNeLZZ/Recipe-App-Redesign?node-id=4%3A180) - working on Responsive design and Shopping List

### Status

Functionality: 50%  
Design: 30%  
So, early days still.

## Overview and Thoughts

### What's Working

Learned a great overview of Angular using [Maximilian Schwarzmüller's Udemy Tutorial](https://www.udemy.com/the-complete-guide-to-angular-2/). Highly recommended! 

Working with firebase as a backend and learning AngularFire for data pipeline and authentication.

Have implemented most of the basic recipe app functionality, and gone through a number of [tutorials](https://www.udemy.com/testing-angular-apps/learn/v4/content) regarding TDD. Currently in the process of getting unit and implementation tests set up. 

### What isn't working

All going well except when reloading page with recipe item open, tries loading before getting info from store/firebase. Not breaking, once redesign is finished I will bring implement conditional loading.

## Where are we?

### Done:

* Storage, editing and deleteing
* Ingredient to Shopping list
* routing
* Animations
* Persistant login 
* Auto Fetch on Login
* Login Warnings
* User Specific Data
* Mobile Menu
* TestMode

### Working on Now:
* Redesign - Mobile & recipe overlay
* Upload Recipe Image

### To Come:

* Implement and maintain TDD
* Loading Spinner for all side effects
* Measurement types for "amount"
* Multiple "Ingredients" & "Steps" panes
* Form Reset on login
* Remove Recipe Detail Animation
* Warnings for trying to edit or create recipes anonymously
* Shopping List Saving
* Improve UI/UX - Most of the current state was done to help learn each aspect of Angular, updates will be made based on ease of use for the end user. 
* User Dashboard - More an excuse to build a cool dashboard in a SPA, looking forward to it.
* Website Parsing - Have some ideas, but more research is needed. 
* Meal Planning through ingredient tags, Calorie/Nutrient Counting 
* and...?


## Built With

* HTML
* SASS
* JavaScript
* Angular
* TypeScript
* Bootstrap
* Sass
* Karma
* Jasmine

## Author

* **Ethan Strauss** - [Portfolio](https://dotethan.github.io)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* My very patient and kind wife

