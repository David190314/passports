'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('statuses','title', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }    
};