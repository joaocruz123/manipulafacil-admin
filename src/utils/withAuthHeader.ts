const withPublicAuthHeader = (includeFormData: boolean = false) => {
  const sessionRoot: { [key: string]: any } = JSON.parse(
    window.sessionStorage.getItem("persist:root") || "{}"
  );
  const sessionUser: { [key: string]: any } = JSON.parse(
    sessionRoot.auth || "{}"
  );
  if (sessionUser) {
    const auth: string = `Bearer ${sessionUser.recoverPassword.accessToken}`;
    if (includeFormData) {
      return {
        headers: {
          Authorization: auth,
          "Content-Type": "multipart/form-data",
        },
      };
    } else {
      return {
        headers: {
          Authorization: auth,
        },
      };
    }
  }
  return null;
};

export default withPublicAuthHeader;
