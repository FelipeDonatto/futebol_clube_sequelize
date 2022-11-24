module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      home_team: {
        allowNull: false,
        type: Sequelize.INTEGER(30),
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER(30),
      },
      away_team: {
        allowNull: false,
        type: Sequelize.INTEGER(30),
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER(30),
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN(30),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};
