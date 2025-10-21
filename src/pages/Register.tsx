import { useState, useEffect } from 'react';
import NavBar from '../components/ui/navbar/NavBar';
import Header from '../components/ui/header/Header';
import LayoutX from '../components/shared/layout/LayoutX';
import Input from '../components/shared/input/InputText';
import Alert from '../components/shared/notifications/alert';
import Footer from '../components/ui/footer/Footer';
import { RiArrowRightLine } from 'react-icons/ri';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useGetPlansQuery, useAssignPlanMutation } from '../app/api/planApi';
import { useSignupMutation } from '../app/api/authApi';
import { useDispatch } from "react-redux";
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate, useSearchParams } from "react-router-dom";

const requiredMessage = 'Este campo es requerido';

const schema = yup.object({
  name: yup.string().required(requiredMessage),
  idType: yup.string().required(requiredMessage),
  idNumber: yup.string().required(requiredMessage),
  email: yup.string().email("Correo inválido").required(requiredMessage),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required(requiredMessage),
  plan: yup.number().required("Debes seleccionar un plan"),
});

function Register() {
  const [signup, { data: signupData, error: signupError, isLoading: signupLoading }] = useSignupMutation();
  const [assign, { data: assignData, error: assignError, isLoading: assignLoading }] = useAssignPlanMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const idPlanFromUrl = searchParams.get("idPlan");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (idPlanFromUrl) {
      setSelectedPlan(idPlanFromUrl);
    }
  }, [idPlanFromUrl]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [showError, setShowError] = useState(false);

  // Obtener planes
  const { data: plans, error: plansError, isLoading: plansLoading } = useGetPlansQuery();

  const onSubmit = async({ name, idType, idNumber, email, password, plan }) => {
    setShowError(false);
    let role = 'STUDENT';
    let data = { name, idType, idNumber, email, password, role}
    console.log(data);
    try {
      const response = await signup(data).unwrap();
      console.log("Registro exitoso:", response);
      // asignar plan
      const assignData = { userId: response.user.id, planId: plan }
      console.log(assignData);
      const responseAssign = await assign(assignData).unwrap();
      console.log("assignacion exitoso:", responseAssign);
      
      // Registro OK (guardar sesion, reenviar a welcome)
      alert("Registro completado con éxito");
      dispatch(setCredentials({ token: response.token, user: response.user }));
      navigate("/welcome");
    } catch (err) {
      console.error("Error en registro:", err);
      setShowError(true);
    }
  };

  const isLoading = signupLoading || assignLoading;
  const errorMessage = signupError?.data?.error || assignError?.data?.error;

  return (
    <>
      <NavBar />
      <Header title="B-Educar" current="Registro" />
      <LayoutX title="Registro">
        <form id="register" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 grid grid-cols-1 gap-6">
            <Input
              name="name"
              label="Nombre"
              type="text"
              onChange={() => setShowError(false)}
              register={register}
              errors={errors}
            />
            <Input
              name="idType"
              label="Tipo de documento"
              type="text"
              onChange={() => setShowError(false)}
              register={register}
              errors={errors}
            />
            <Input
              name="idNumber"
              label="Número de documento"
              type="text"
              onChange={() => setShowError(false)}
              register={register}
              errors={errors}
            />
            <div>
              <p className="mt-4 font-bold text-lg text-purple-800/80">Plan:</p>
              <hr className="border border-gray-100 w-full" />
            </div>
            <div className="grid sm:col-span-4">
              {plans?.map((plan) => (
                <div key={plan.id} className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
                  <input id={`radio_${plan.id}`} {...register("plan", { required: true })} type="radio" value={plan.id} name="plan" checked={selectedPlan === String(plan.id)} onChange={(e) => setSelectedPlan(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                  <label for={`radio_${plan.id}`} className="w-full py-4 ms-2 text-sm font-medium text-gray-900">{plan.name} - {plan.credits} créditos</label>
                </div>
              ))}
              {errors.plan && <p className="text-red-500 text-xs">{errors.plan.message}</p>}
            </div>
            <div>
              <p className="mt-4 font-bold text-lg text-purple-800/80">Datos de sesión:</p>
              <hr className="border border-gray-100 w-full" />          
            </div>
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

          <div className="mt-6 text-center flex justify-center">
            <button type="submit" className="header__btn flex items-center gap-2" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Regístrate"} <RiArrowRightLine />
            </button>
          </div>
          {showError && errorMessage && (
            <Alert type="error" message={`Error: ${errorMessage}`} />
          )}
        </form>
      </LayoutX>
      <Footer />
    </>
  )
}

export default Register;
