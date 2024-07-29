import { Page } from 'playwright';
import {Locator} from "@playwright/test";

export class FormComponent {
    private page: Page;
    private form: Locator;

    constructor(page: Page) {
        this.page = page;
        this.form = page.locator('#careerContactForm');
    }

    async fillForm(name: string, email: string, phone: string, message: string, filePath: string) {
        await this.form.locator('input[placeholder="Jméno a Příjmení"]').fill(name);
        await this.form.locator('input[placeholder="E-mail"]').fill(email);
        await this.form.locator('input[placeholder="Telefon"]').fill(phone);
        await this.form.locator('input[type="file"]').setInputFiles(filePath);
        await this.form.locator('textarea[placeholder="Vaše zpráva"]').fill(message);
    }

    async submitForm() {
        await this.form.locator('#gdpr').click();
        await this.form.locator('button[type=submit]').click();
    }

    async checkAlertMessage() {
        return await this.page.textContent('text=Je třeba zaškrtnout políčko Souhlasím se zpracováním osobních údajů');
    }
}
