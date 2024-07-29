import { test, expect } from '@playwright/test';
import { CareerPage } from '../pages/CareerPage';
import { ContactPage } from '../pages/ContactPage';

test('Kontrola formuláře "Kontaktujte nás" a scrollování', async ({ page }) => {
    const careerPage = new CareerPage(page);
    const contactPage = new ContactPage(page);

    await careerPage.navigateTo('https://v1-web-git-test-viableone.vercel.app/');
    await careerPage.goToCareerTab();

    await contactPage.scrollToContactForm();

    // Zkontrolujeme, zda je formulář viditelný
    const contactFormVisible = await page.isVisible('#careerContactForm');
    expect(contactFormVisible).toBe(true);

    try {
        const alert = await contactPage.checkPrivacyAlert();
        expect(alert).toContain('Je třeba zaškrtnout políčko Souhlasím se zpracováním osobních údajů');
    } catch (error) {
        console.error('Error during checking privacy alert:', error);
        await page.screenshot({ path: 'privacy-alert-error.png' });
        throw error;
    }
});
