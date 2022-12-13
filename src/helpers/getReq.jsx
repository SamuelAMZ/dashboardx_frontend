const getReq = async (url) => {
  // headers
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("GET", "POST", "OPTIONS");
  headers.append(
    "Access-Control-Allow-Origin",
    `${import.meta.env.VITE_DOMAIN}`
  );
  headers.append("Access-Control-Allow-Credentials", "true");

  // fetch
  const req = await fetch(`${import.meta.env.VITE_DOMAIN}${url}`, {
    mode: "cors",
    method: "GET",
    headers: headers,
    credentials: "include",
  });

  const serverRes = await req.json();
  return serverRes;
};

export default getReq;
