'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('statuses','name',{
      type: Sequelize.STRING,
      allowNull : false
    });
  }  
};