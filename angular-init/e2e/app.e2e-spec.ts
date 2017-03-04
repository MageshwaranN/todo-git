import { AngularInitPage } from './app.po';

describe('angular-init App', function() {
  let page: AngularInitPage;

  beforeEach(() => {
    page = new AngularInitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
