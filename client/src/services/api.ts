import { IUserFormData } from "../types/userForm";

// should be somewhere in envs, but I don't have time for such details
const URL_API = "http://localhost:8080";

class ApiService {
  url = URL_API;

  static async getUserFormData() {
    const req = await fetch(`${URL_API}/userFormData`);
    if (req.status !== 200) {
      // do somethind, idk
    }
    const parsedReq = await req.json();

    return parsedReq as {
      userData: IUserFormData;
      formIndex: number;
    };
  }

  static async sendUserFormData(
    userFormData: Partial<IUserFormData>,
    formIndex: number
  ) {
    const req = await fetch(`${URL_API}/userFormData`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData: userFormData,
        formIndex,
      }),
    });

    if (req.status !== 200) {
      // do somethind, idk
    }

    const parsedReq = (await req.json()) as IUserFormData;
    return parsedReq;
  }
}

export { ApiService };
