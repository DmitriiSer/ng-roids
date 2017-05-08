import { NgRoidsPage } from './app.po';

describe('ng-roids App', () => {
  let page: NgRoidsPage;

  beforeEach(() => {
    page = new NgRoidsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
