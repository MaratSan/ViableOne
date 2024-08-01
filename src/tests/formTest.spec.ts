import { test, expect, chromium, Page } from '@playwright/test';
import { FormComponent } from '../components/formComponents';
import { config } from 'dotenv';
import { Client } from 'pg';

// Load environment variables
config();

let page: Page;

test.describe('Form Tests', () => {
    test.beforeAll(async () => {
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://v1-web-git-test-viableone.vercel.app/kariera');
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Check consent alert', async () => {
        const form = new FormComponent(page);
        await form.fillForm('Test Name', 'test@example.com', '123456789', 'Test Message', 'files/file.pdf');
        await form.submitForm();
        await page.waitForTimeout(4000);

        const alertMessage = await form.checkAlertMessage();
        expect(alertMessage).toContain('Je třeba zaškrtnout políčko Souhlasím se zpracováním osobních údajů');
    });

    test('Verify data in the database', async () => {
        const client = new Client({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await client.connect();
        const res = await client.query('SELECT * FROM your_table WHERE email = $1', ['test@example.com']);
        expect(res.rows.length).toBeGreaterThan(0);
        await client.end();
    });
});
