import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Env } from '../env';

export const RedirectToLogin = () => {
  const [urlParams] = useSearchParams();
  const ivaoAuthCode = urlParams.get("code");

  const { signIn, token, openIdInfo } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!openIdInfo || !openIdInfo.authorizationEndpoint) {
      return;
    }

    if (token) {
      return;
    }

    if (ivaoAuthCode) {
      signIn(ivaoAuthCode);
      return;
    }

    const urlQueryParams = new URLSearchParams();
    urlQueryParams.set("client_id", Env.CLIENT_ID);
    urlQueryParams.set(
      "redirect_uri",
      encodeURI(`${window.location.href}`));
    urlQueryParams.set("response_type", "code");
    urlQueryParams.set("scope", "profile");
    urlQueryParams.set("response_mode", "query");

    window.location.href = `${openIdInfo.authorizationEndpoint}?${urlQueryParams.toString()}`;
  }, [signIn, token, location.state, openIdInfo, ivaoAuthCode]);

  return <>Loading...</>;
};

export const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToLogin />} />
      </Routes>
    </BrowserRouter>
  );
};
