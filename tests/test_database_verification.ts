import { Client } from 'pg';

async function verifyDatabase() {
    const client = new Client({
        host: 'school-main-db.c1va2wi6vhre.eu-west-1.rds.amazonaws.com',
        port: 5432,
        database: 'viableone',
        user: 'qaendineers',
        password: '2S5eQDcw%FuZbvo22',
    });

    await client.connect();

    const res = await client.query("SELECT * FROM contact_form WHERE email = 'jan.novak@example.com'");
    const result = res.rows[0];

    if (!result) {
        throw new Error('Data nebyla nalezena v databázi');
    }

    if (result.name !== 'Jan Novák' || result.email !== 'jan.novak@example.com' || result.message !== 'Toto je testovací zpráva.') {
        throw new Error('Data v databázi nejsou správná');
    }

    await client.end();
}

verifyDatabase().catch(error => {
    console.error(error);
    process.exit(1);
});
