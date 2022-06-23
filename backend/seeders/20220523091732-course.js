'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Courses', [
    {
        name:"Webdev",
        createdAt:new Date(),
        updatedAt:new Date()
     },
     {
        name:"Python",
        createdAt:new Date(),
        updatedAt:new Date()
     },
     {
        name:"SQL",
        createdAt:new Date(),
        updatedAt:new Date()
     },
     {
        name:"IT genius",
        createdAt:new Date(),
        updatedAt:new Date()
     },
     {
        name:"Java",
        createdAt:new Date(),
        updatedAt:new Date()
     },
     {
      name:"Unity",
      createdAt:new Date(),
      updatedAt:new Date()
     },
     {
      name:"C++",
      createdAt:new Date(),
      updatedAt:new Date()
     },
     {
      name:"Data Analytics",
      createdAt:new Date(),
      updatedAt:new Date()
     },
     {
      name:"Компьютерная грамотность",
      createdAt:new Date(),
      updatedAt:new Date()
     },
     {
      name:"React",
      createdAt:new Date(),
      updatedAt:new Date()
     },
     {
      name:"Android",
      createdAt:new Date(),
      updatedAt:new Date()
     },
     {
      name:"IOS",
      createdAt:new Date(),
      updatedAt:new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Courses', null, {});
  }
};
