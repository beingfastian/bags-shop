'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456789', 10);

    await queryInterface.bulkInsert('Users', [
      {
        id: '958e96bd-5d2c-4caf-9f12-a969d1c4ab0a',
        display_name: 'admin',
        email: 'maaozofficialstorehelp@gmail.com',
        password: hashedPassword,
        status: 'active',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
