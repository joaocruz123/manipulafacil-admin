interface Users {
  email: string;
  fullName: string;
  cpfCnpj: string,
  mobilePhone: string,
  profile: any,
  active: false,
  id: string
}
interface Profile {
  id: string;
  name: string;
  code: string;
  applicationId: string;
  active: boolean,
}
export const mapAllPharmaciesUsers = (data: Array<Users>) => {
  return (
    (data &&
      data.length > 0 &&
      data.map((item: Users) => {
        return {
          name: item["fullName"],
          cpfCnpj: item["cpfCnpj"],
          profile: item["profile"],
          id: item["id"],
          active: item["active"],
          email: item["email"],
          mobilePhone: item["mobilePhone"]
        };
      })) ||
    []
  );
};

export const mapUserAuthAccess = (data: any) => {
  return {
    accessToken: data["accessToken"],
    uniqueId: data["uniqueId"],
    scopes: data["scopes"],
    tokenType: data["tokenType"],
  }
}

export const mapAllprofilesUsers = (data: Array<Profile>) => {
  return (
    (data &&
      data.length > 0 &&
      data.map((item: Profile) => {
        return {
          id: item["id"],
          name: item["name"],
          code: item["code"],
          applicationId: item["applicationId"],
          active: item["active"]
        };
      })) ||
    []
  );
};