const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
    console.log('Usage: node generate-hash.js <password>');
    process.exit(1);
}

const salt = bcrypt.genSaltSync(12);
const hash = bcrypt.hashSync(password, salt);

console.log('\n--- Bcrypt Hash Generator ---');
console.log('Password:', password);
console.log('Hash:    ', hash);
console.log('-----------------------------\n');
console.log('Copy this hash to your .env.local as ADMIN_PASSWORD_HASH');
