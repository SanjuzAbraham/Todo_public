const listController = require("../controllers/listController.js");
const { checkToken } = require("../auth/tokenValidation.js");

const multer  = require('multer')
const upload = multer({ dest: 'files' })

const router = require("express").Router();

router.post(
  "/addList",
  checkToken,
  upload.single("file"),
  listController.addList
);
router.get("/getAllList", checkToken, listController.getAllList);
router.delete("/:id", checkToken, listController.deleteListById);
router.put("/:id", checkToken, listController.updateListById);

module.exports = router;
