import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Env } from '../env';

export const RedirectToLogin = () => {
  const [urlParams] = useSearchParams();
  const { signed, token } = useContext(AuthContext);
  const ivaoToken = urlParams.get('IVAOTOKEN');

  const { signIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (signed) {
      const redirectPath = urlParams.get('redirect') || '/';
      navigate(redirectPath, { replace: true });
    }
  }, [signed, urlParams, navigate]);

  useEffect(() => {
    if (token) {
      return;
    }

    const redirectUrlParam = urlParams.get('redirect');
    if (redirectUrlParam && redirectUrlParam.indexOf('IVAOTOKEN') !== -1) {
      throw new Error(`The IVAO Login service rejected the request. The server is in ivao.aero domain? Token query: ${redirectUrlParam}`);
    }

    if (ivaoToken) {
      signIn(ivaoToken);
      return;
    }
    const location = useLocation();

    let locationState: { from?: Location } | null = null;
    if (typeof location.state === 'object') {
      locationState = location.state;
    }

    const baseUrl = window.location.href;
    let loginUrl = `${Env.AUTHORIZATION_SERVER}?url=${baseUrl}`;

    const redirectPath = locationState?.from?.pathname;
    if (redirectPath) {
      loginUrl += '?redirect=' + redirectPath;
    }

    window.location.href = loginUrl;
  }, [ivaoToken, signIn, navigate, user, urlParams]);

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
