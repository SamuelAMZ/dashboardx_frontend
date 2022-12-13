import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// helpers
import getReq from "../../helpers/getReq";

// react query
import { useQuery } from "react-query";

const Auth = () => {
  const navigate = useNavigate();

  const handleCheck = async () => {
    // get request
    return await getReq("/api/verifypages");
  };

  const { data, isLoading, isSuccess } = useQuery(["checkpage"], handleCheck, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  useEffect(() => {
    if (data && data.code === "bad") {
      navigate("/");
      console.log("redirect");
    }
  }, [isLoading]);

  return <></>;
};

export default Auth;
