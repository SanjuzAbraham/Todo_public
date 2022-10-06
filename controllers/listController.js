const { Op } = require("sequelize");
const db = require("../models");

const List = db.lists;

const addList = async (req, res) => {
  let data = {
    userid: req.userId,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    filePath: req.file.path,
  };

  const list = await List.create(data);
  res.status(200).send(list);
};

const getAllList = async (req, res) => {
  const list = await List.findAll({
    where: {
      userid: req.userId,
    },
  });
  res.status(200).send(list);
  console.log(list);
};

const deleteListById = async (req, res) => {
  const list = await List.destroy({
    where: {
      [Op.and]: [{ userid: req.userId }, { id: req.params.id }],
    },
  });
  res.status(200).json({ message: "list Removed" });
  console.log("list removed");
};

const updateListById = async (req, res) => {
  const list = await List.update(req.body, {
    where: {
      [Op.and]: [{ userid: req.userId }, { id: req.params.id }],
    },
  });
  res.status(200).send(list);
  console.log("Updated");
  console.log(list);
};

module.exports = { addList, getAllList, deleteListById, updateListById };
