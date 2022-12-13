import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// react query
import { useQuery } from "react-query";

// helpers
import postReq from "../../helpers/postReq";

const TwoFa = () => {
  const [valid, setValid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  //   code state
  const [code, setCode] = useState("");

  // get hash from pathname
  const hash = location.pathname.replace("/fa/", "");

  // useQuery from React query
  const handlePostrequest = async () => {
    const hashData = { hash: hash };

    // post request
    return await postReq(hashData, "/api/twofapage");
  };

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: sendPost,
  } = useQuery(["pagevalidating"], handlePostrequest, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    // send request with the hash post
    const send = async () => {
      await sendPost();
    };
    send();
  }, []);

  useEffect(() => {
    //   redirect to login page if error
    if (data && data.code === "bad") {
      navigate("/");
    }
    // set validad to true if it s not expired
    if (data && data.code === "ok") {
      setValid(true);
    }
  }, [isLoading]);

  //   handle 2fa code verification
  const handleCodePostrequest = async () => {
    const codeData = { code };

    // post request
    return await postReq(codeData, "/api/twofacode");
  };

  const {
    data: codeData,
    isLoading: codeVerificationLoading,
    isSuccess: codeSuccess,
    refetch: sendCodePost,
  } = useQuery(["codevalidating"], handleCodePostrequest, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleCodeVerification = async (e) => {
    e.preventDefault();
    // send post req with the code to backend
    await sendCodePost();
  };

  useEffect(() => {
    if (codeData && codeSuccess) {
      navigate("/home");
    }
  }, [codeVerificationLoading]);

  return (
    <div className="twofa">
      {valid ? (
        <form onSubmit={handleCodeVerification}>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="2FA code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {codeVerificationLoading ? (
            <button className="btn loading">Submiting...</button>
          ) : (
            <button className="btn">Submit</button>
          )}
        </form>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default TwoFa;
