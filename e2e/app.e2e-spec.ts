import { BeckwayGroupPage } from './app.po';

describe('beckway-group App', () => {
  let page: BeckwayGroupPage;

  beforeEach(() => {
    page = new BeckwayGroupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
