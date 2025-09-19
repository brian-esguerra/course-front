import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

import NavBar from '../components/ui/navbar/NavBar';
import Header from '../components/ui/header/Header';
import Footer from '../components/ui/footer/Footer';
import Section from '../components/ui/section/Section';
import CardStad from "../components/shared/cards/cardStad";
import Alert from "../components/shared/notifications/alert";
import CardCourse from "../components/shared/cards/cardCourse";
import CardList from "../components/shared/cards/cardList";

import { useGetUserByIdQuery } from "../app/api/userApi";

function Welcome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // obtener perfil user
  const { data: profile, error: profileError, isLoading: profileLoading} = useGetUserByIdQuery(user.id);


  return (
    <>
      <NavBar />
      <Header title="B-Educar" current="Mi Perfil" />
      <Section title={`Bienvenido, ${profile?.name == undefined ? '' : profile?.name }`} subtitle=" ">
        {profileLoading && <Alert type="info" message="Cargando perfil..." />}
        {profileError && <Alert type="error" message="No se obtuvieron daatos" />}

        {profile?.id && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
            <CardStad title="Créditos disponibles" number={profile?.creditsAvailable} />
            <CardStad title="Cursos" number={profile?.coursesCount} />
            <CardStad title="Planes adquiridos" number={profile?.plansCount} />
            <CardStad title="Certificados" number={profile?.id} />
          </div>
        )}
      </Section>
      <Section title="Mis cursos" subtitle="Avanza en tus cursos adquiridos">
        {profile?.courses.length > 0 ? (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile?.courses.map((course) => (
              <CardCourse
                id={course.id}
                image={course.image}
                key={course.id}
                tag={course.level}
                title={course.name}
                description={course.description}
                category={course.category}
                credits={course.credits}
                teacher={'Adquirido'}
              />
            ))}
          </div>
        ): (
          <Alert type="info" message="No tiene cursos adquiridos..." />
        )}
      </Section>
      <Section title="Historial de planes" subtitle="Consulta el historico de créditos adquiridos">
          {profile?.plans.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {profile?.plans.map((plan) => (
                <CardList title={plan.name} price={plan.credits * 2} desc={`${plan.credits} créditos comprados`} />
              ))}
            </div>
          ) : (
            <Alert type="info" message="No tiene planes adquiridos..." />
          )}
      </Section>
      <Footer />
    </>
  )
}

export default Welcome;
