import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    async scrollToContactForm() {
        await this.page.waitForSelector('#careerContactForm', { timeout: 60000 });
        await this.page.$eval('#careerContactForm', element => element.scrollIntoView());
    }

    async fillContactForm(name: string, email: string, message: string, filePath: string) {
        await this.page.fill('#careerContactForm input[placeholder="Jméno a Příjmení"]', name);
        await this.page.fill('#careerContactForm input[placeholder="E-mail"]', email);
        await this.page.fill('#careerContactForm textarea[placeholder="Vaše zpráva"]', message);
        await this.page.setInputFiles('#careerContactForm input[type="file"]', filePath);
        await this.page.click('#careerContactForm input[type="checkbox"]');
    }

    async submitForm() {
        await this.page.click('#careerContactForm button[type="submit"]');
    }

    async closeConfirmation() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('button:has-text("OK")');
        await this.page.click('button:has-text("OK")');
    }

    async checkPrivacyAlert() {
        await this.page.click('#careerContactForm button[type="submit"]');
        await this.page.waitForSelector('#careerContactForm .alert-warning', { timeout: 10000 });
        await this.page.getByText('Je třeba zaškrtnout políčko');
    }
}
