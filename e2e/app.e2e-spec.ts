import { Phonebook1Page } from './app.po';

describe('phonebook1 App', () => {
  let page: Phonebook1Page;

  beforeEach(() => {
    page = new Phonebook1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
