# Recipe App
Landing Page Coming Soon

The early stage starting framework for what I hope to turn into a recipe storage and shopping list app. A proof of concept for my over all idea of a larger, modularized personal assistant app. 

[Landing Page is Here! Woot Woot!](https://stupefied-morse-5e1233.netlify.com/)

Once I implement testing for the current build I'm going to take a break and thoroughly redesign the layout with responsive design and accessibility as the focus. 

### Status

Functionality: 40%
Design: 20%
So, early days still.

## Overview and Thoughts

### What's Working

Learned a great overview of Angular using [Maximilian Schwarzmüller's Udemy Tutorial](https://www.udemy.com/the-complete-guide-to-angular-2/). Highly recommended! 

Working with firebase as a backend and learning AngularFire for data pipeline and authentication.

Have implemented most of the basic recipe app functionality, and gone through a number of [tutorials](https://www.udemy.com/testing-angular-apps/learn/v4/content) regarding TDD. Currently in the process of getting that implemented. 

### What isn't working

Getting a strange error in the Testing where a simple NgRx store.select call is creating a CORS Policy error. Been looking for answers but none found yet. For now will comment out the one line for testing purposes and put it back for production, but I don't like it. Might rebuild the store from scratch as it would be good practice and might find the problem along the way.

Otherwise all is good.

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


### Working on Now:
* Implement and maintain TDD

### To Come:

* Mobile Layout
* Remove Recipe Detail Animation
* Warnings for trying to edit or create recipes anonymously
* Shopping List Saving
* Upload Recipe Image
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

