import { test } from '@playwright/test';
import { CareerPage } from '../pages/CareerPage';
import { ContactPage } from '../pages/ContactPage';

test('Vyplnění formuláře a odeslání', async ({ page }) => {
    const careerPage = new CareerPage(page);
    const contactPage = new ContactPage(page);

    await careerPage.navigateTo('https://v1-web-git-test-viableone.vercel.app/');
    await careerPage.goToCareerTab();

    await contactPage.scrollToContactForm();
    await contactPage.fillContactForm('Jan Novák', 'jan.novak@example.com', 'Toto je testovací zpráva.', 'files/Marat_Sanzhar_CV.pdf');
    await contactPage.submitForm();

    try {
        await contactPage.closeConfirmation();
    } catch (error) {
        console.error('Error during closing confirmation:', error);
        await page.screenshot({ path: 'close-confirmation-error.png' });
        throw error;
    }
});
