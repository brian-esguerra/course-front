import { useEffect, useState } from 'react';

import NavBar from '../components/ui/navbar/NavBar';
import Header from '../components/ui/header/Header';
import Footer from '../components/ui/footer/Footer';
import LayoutX from '../components/shared/layout/LayoutX';
import Input from '../components/shared/input/InputText';
import Alert from '../components/shared/notifications/alert';
import { RiArrowRightLine } from 'react-icons/ri';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useLoginMutation } from '../app/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const requiredMessage = 'Este campo es requerido';

const schema = yup.object({
  email: yup.string().email("Correo inválido").required(requiredMessage),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required(requiredMessage),
});

function Login() {
  const [signin, {data: signinData, error: signinError, isloading: signinLoadin}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [showError, setShowError] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setShowError(true);
    try {
      const response = await signin({email, password}).unwrap();
      console.log("Login:", response);

      // data OK
      dispatch(setCredentials({ token: response.token, user: response.user }));
      navigate("/welcome");
    } catch (err) {
      console.error("Error en registro:", err);
      setShowError(true);
    }
  };

  return (
    <>
      <NavBar />
      <Header title="B-Educar" current="Login" />
      <LayoutX title="Login">
        <form id="login" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 grid grid-cols-1 gap-6">
            <Input
              name="email"
              label="Correo electrónico"
              type="text"
              onChange={() => setShowError(false)}
              register={register}
              errors={errors}
            />
            <Input
              name="password"
              label="Contraseña"
              type="password"
              onChange={() => setShowError(false)}
              register={register}
              errors={errors}
            />
          </div>
          <div className="mt-6 text-center align-center self-center flex">
            <button className="header__btn">Iniciar sesión <RiArrowRightLine /> </button>
          </div>
          <div className="mt-6 flex">
            <label>No tienes una cuenta? </label>
            <a id="link" className="font-bold ml-1" href="/register">Registrate</a>
          </div>
          {showError && signinError && (
            <Alert type="error" message={`Error: ${JSON.stringify(signinError.data.error || signinError)}`} />
          )}
        </form>
      </LayoutX>
      <Footer />
    </>
  )
}

export default Login;
