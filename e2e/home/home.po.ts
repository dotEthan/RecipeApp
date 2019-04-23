import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getPublicPageTitle() {
    return element(by.css('.app-title')).getText();
  }

  getFirstListElInRightMenu() {
    return element(by.css('.rightward li')).getText();
  }

  getRecipesPageNavEl() {
    return element(by.css('.nav-recipes'));
  }
}
