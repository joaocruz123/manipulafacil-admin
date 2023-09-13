import { loginRequest, apiConfig } from "@/libs/msal/authConfig";
import { useMsalInstancePharmacies } from "@/hooks/useMsalInstancePharmacies";

export async function callMsGraph() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const msalInstance = useMsalInstancePharmacies();
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }

  const response = await msalInstance.acquireTokenSilent({
    ...apiConfig,
    account: account,
  });

  const headers = new Headers();
  const bearer = `Bearer ${response.accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(apiConfig.uri as string, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
