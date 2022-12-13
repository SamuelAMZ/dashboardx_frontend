// built in hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// third party dependencie
import ReCAPTCHA from "react-google-recaptcha";
// react query
import { useQuery } from "react-query";
// custom  hook
import postReq from "../../helpers/postReq";

const Logins = () => {
  // captcha
  const [captchaState, setCaptachaState] = useState(false);
  const handleCaptcha = (e) => {
    if (e) {
      setCaptachaState(e);
    } else {
      setCaptachaState(false);
    }
  };

  // login to site
  const [formInputs, setFormInputs] = useState({
    pubKey: "",
    priKey: "",
    access: "",
  });

  // useQuery from React query
  const handlePostrequest = async () => {
    // check if an element from form is empty
    if (
      !formInputs.pubKey ||
      !formInputs.priKey ||
      !formInputs.access
      // || !captchaState
    ) {
      return console.log("error");
    }

    // sending data for validation and login to backend
    const inputData = { ...formInputs, captcha: captchaState };

    // post request
    return await postReq(inputData, "/api/login");
  };

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch: sendPost,
  } = useQuery(["login"], handlePostrequest, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    // send req
    sendPost();
  };

  // after check credentials
  const navigate = useNavigate();
  useEffect(() => {
    // redirect to 2fa hash page
    if (data && data.code === "ok") {
      navigate(`/fa/${data.payload.tempHash}`);
    }
  }, [isLoading]);

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Public key"
          className="input input-bordered w-full"
          value={formInputs.pubKey}
          onChange={(e) =>
            setFormInputs({
              pubKey: e.target.value,
              priKey: formInputs.priKey,
              access: formInputs.access,
            })
          }
        />
        <input
          type="text"
          placeholder="Private key"
          className="input input-bordered w-full"
          value={formInputs.priKey}
          onChange={(e) =>
            setFormInputs({
              pubKey: formInputs.pubKey,
              priKey: e.target.value,
              access: formInputs.access,
            })
          }
        />
        <input
          type="text"
          placeholder="Access"
          className="input input-bordered w-full"
          value={formInputs.access}
          onChange={(e) =>
            setFormInputs({
              pubKey: formInputs.pubKey,
              priKey: formInputs.priKey,
              access: e.target.value,
            })
          }
        />
        {/* recaptcha */}
        <ReCAPTCHA
          className="thecaptcha"
          sitekey="6LfWCHQjAAAAADLjKDt_kvUCs3hCsgsVrELKjKWa"
          onChange={handleCaptcha}
        />
        {isLoading ? (
          <button className="btn loading">Login...</button>
        ) : (
          <button className="btn">Login</button>
        )}
      </form>
    </div>
  );
};

export default Logins;
