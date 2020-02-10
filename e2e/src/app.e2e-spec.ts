import { comgo2Page } from './app.po';

describe('comgo2 App', () => {
    let page: comgo2Page;

    beforeEach(() => {
        page = new comgo2Page();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to comgo2!');
    });
});
