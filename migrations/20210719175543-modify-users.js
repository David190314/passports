'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users','email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });

    await queryInterface.createTable('users','active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });
  }    
};