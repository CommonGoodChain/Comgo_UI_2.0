import { ComGo2Page } from './app.po';

describe('ComGo2 App', () => {
    let page: ComGo2Page;

    beforeEach(() => {
        page = new ComGo2Page();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to ComGo2!');
    });
});
