import { OcodeClientPage } from './app.po';

describe('ocode-client App', () => {
  let page: OcodeClientPage;

  beforeEach(() => {
    page = new OcodeClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
