module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("list", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("Personal Goals", "Career Goals", "Daily Todo"),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
    },
  });
  return List;
};
