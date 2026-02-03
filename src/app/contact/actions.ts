'use server';

import fs from 'fs';
import path from 'path';

export async function submitContactForm(formData: FormData) {
    const data = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
    };

    const dataDir = path.join(process.cwd(), 'src', 'data');
    const filePath = path.join(dataDir, 'contacts.json');

    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(fileContent);
        }

        existingData.push(data);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        return { success: true, message: 'Vielen Dank! Ihre Nachricht wurde gesendet.' };
    } catch (error) {
        console.error('Error saving contact data:', error);
        return { success: false, message: 'Fehler beim Senden. Bitte versuchen Sie es später erneut.' };
    }
}
