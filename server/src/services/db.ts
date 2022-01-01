import { join } from "path";
import fs, { readFileSync, writeFileSync } from "fs";
import { IUserFormData, UserFormStep } from "../types/userForm";

const INITIAL_DATA: IUserFormData = {
  [UserFormStep.STEP_ONE]: { email: "", fullName: "", phone: "" },
  [UserFormStep.STEP_TWO]: { annualRevenue: 0 },
  [UserFormStep.STEP_THREE]: { fundingRequestedAmount: 0 },
};

class UserDbService {
  dbPath = join(__dirname, "../db/db.json");

  constructor() {
    // if (!fs.existsSync(this.dbPath)) {
    this.updateUserData(INITIAL_DATA, 0);
    // }
  }

  readData() {
    const data = readFileSync(this.dbPath, "utf-8");
    const dbData = JSON.parse(data);
    return {
      userData: dbData.userData as Partial<IUserFormData>,
      formIndex: dbData.formIndex as number,
    };
  }

  updateUserData(incomingData: Partial<IUserFormData>, formIndex: number) {
    const oldData = this.readData().userData;

    const newData = {
      ...oldData,
      ...incomingData,
    };

    writeFileSync(
      this.dbPath,
      JSON.stringify({ userData: newData, formIndex }),
      "utf-8"
    );

    return newData;
  }
}

const UserService = new UserDbService();

export { UserService, UserDbService };
