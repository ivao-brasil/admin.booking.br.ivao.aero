import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Env } from '../env';

export const RedirectToLogin = () => {
  const [urlParams] = useSearchParams();
  const IVAOTOKEN = urlParams.get("IVAOTOKEN");

  const { signIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }

    const redirect = urlParams.get("redirect");
    if (redirect && redirect.indexOf("IVAOTOKEN") !== -1) {
        /*
            Se o servidor estiver rodando em localhost:3000, o site de login da IVAO irá redirecionar com uma query inválida
            Ex: new URLSearchParams(window.location.search).get("redirect") = /?IVAOTOKEN=error
        */
        throw new Error(`The IVAO Login service rejected the request. The server is in ivao.aero domain? Token query: ${redirect}`);
    }

    if (!IVAOTOKEN) {
      const ivaoLoginUrl = `${Env.LOGIN_HOST}/index.php?url={url}`;
      const baseUrl = window.location.href;
      window.location.href = ivaoLoginUrl.replace('{url}', `${baseUrl}?redirect=${window.location.pathname}`);
      return;
    }

    signIn(IVAOTOKEN).then(() => {
      navigate(redirect || '');
    });
  }, [IVAOTOKEN, signIn, navigate, user, urlParams]);

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
