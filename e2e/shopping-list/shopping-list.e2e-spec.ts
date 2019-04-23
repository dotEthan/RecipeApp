import { ShoppingListPage } from './shopping-list.po';
import { browser } from 'protractor';

describe('Shopping List Page', () => {
  let page: ShoppingListPage;

  beforeEach(() => {
    page = new ShoppingListPage();

    browser.waitForAngularEnabled(false);
    page.navigateTo();
  });

  it('should display Recipeasy starting Page when user first arrives', async () => {
    expect(await page.getPublicPageTitle()).toEqual('Welcome to Recipeasy');
  });

  it('should display Register as the first Menu item showing', () => {
    expect(page.getFirstListElInRightMenu()).toEqual('Register');
  });

  // it('should not display Recipes Page nav link in the header', () => {
  //   expect(page.getRecipesPageNavEl()).toBeUndefined();
  // });


});
