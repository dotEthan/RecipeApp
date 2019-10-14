# Recipeasy
[Landing Page is Here!](https://stupefied-morse-5e1233.netlify.com/)

You can register to save your own recipes or use the "Test Mode" button on the main page to load dummy recipes to test functionality with.

[Figma Redesign document](https://www.figma.com/file/ELOJaxxPqc3QnOjwqgVNeLZZ/Recipe-App-Redesign?node-id=4%3A180) - working on Responsive design and Shopping List

### Status

Functionality: 80%  
Design: 75%  
Coming along very well.

## Overview and Thoughts

### What's Working

Learned a great overview of Angular using [Maximilian Schwarzmüller's Udemy Tutorial](https://www.udemy.com/the-complete-guide-to-angular-2/). Highly recommended! 

Working with firebase as a backend and learning AngularFire for data pipeline and authentication.

Have implemented most of the basic recipe app functionality, and gone through a number of [tutorials](https://www.udemy.com/testing-angular-apps/learn/v4/content) regarding TDD. Currently in the process of getting unit and implementation tests set up. 

### What isn't working

Recipe Detail component not waiting for fetch recipes to finish. *not breaking, just console errors*

Recipes without Ingredients and/or Directions give error first time in editing mode.  *not breaking, just console errors*

---

Will fix the above after Shopping list design is complete. 

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
* Multiple "Ingredients" & "Directions" panes
* Mobile menu & recipe overlay - close on select & esc
* Multiple Shopping Lists
* Shopping List, edit in place
* Shopping List - Edit Full Form
* Fill out Test Mode Recipes with proper Recipes
* Shopping List Saving

### Working on Now:
* Redesign - Edit Recipe & Shopping List
* Tooltips for "Recipe Detail" add "to shoppinglist"

### To Come:

* ShoppingList Entry Animation
* Reminder - Refactor Header & sl-each
* warn if closing without saving
* Implement and maintain TDD
* Recipe Directions and Recipe Ingredients - DRY and Refactor code & put HTML into own component
* Accessibility (signin module removal on close, keyboard tab nav, lighthouse)
* Auto Truncating recipe Strings
* Recipes Sort (Name, Keyword, Ingredients, Date[modified, created])
* Upload Recipe Image
* Loading Spinner for all side effects
* Form Reset on login
* Warnings for login/register
* Third Party - How to use Tutorial

### Future thoughts:

* Shopping List/Ingredients quantities field
* Shopping List Price Field
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
* Firebase

## Author

* **Ethan Strauss** - [Portfolio](https://dotethan.github.io)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* My very patient and kind wife

