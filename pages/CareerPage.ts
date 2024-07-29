import { BasePage } from './BasePage';

export class CareerPage extends BasePage {
    async goToCareerTab() {
        await this.page.click('text=Kariéra');
        // Explicitně čekáme, až se stránka načte a formulář bude viditelný
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('#careerContactForm', { timeout: 60000 });
    }
}
