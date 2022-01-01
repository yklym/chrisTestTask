import Express from "express";
import { IUserFormData } from "../types/userForm";
import { UserService } from "../services/db";

const router = Express.Router();

router.get("/", (_, res) => {
  console.log("GET DATA");

  const dbData = UserService.readData();
  res.status(200).json(dbData);
});

router.patch("/", (req, res) => {
  console.log("PATCH BODY:");

  console.log(req.body);

  const newFields = req.body.userData as Partial<IUserFormData>;
  const formIndex = req.body.formIndex ?? (0 as number);

  const userData = UserService.updateUserData(newFields, formIndex);

  res.status(200).json(userData);
});

export default router;
