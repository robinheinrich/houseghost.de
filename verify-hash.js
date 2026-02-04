const bcrypt = require('bcryptjs');

const password = process.argv[2];
const hash = process.argv[3];

if (!password || !hash) {
    console.log('Usage: node verify-hash.js <password> <hash>');
    process.exit(1);
}

try {
    const match = bcrypt.compareSync(password, hash);
    console.log('\n--- Bcrypt Verification ---');
    console.log('Password: ', password);
    console.log('Hash:     ', hash);
    console.log('Match:    ', match ? '✅ YES' : '❌ NO');
    console.log('---------------------------\n');
} catch (e) {
    console.error('Error during verification:', e.message);
}
