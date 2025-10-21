import NavBar from '../components/ui/navbar/NavBar';
import Header from '../components/ui/header/Header';
import Section from '../components/ui/section/Section';
import { RiBook2Fill, RiComputerFill, RiGraduationCapFill } from 'react-icons/ri';
import CardService from '../components/shared/cards/cardService';
import CardPlan from '../components/shared/cards/cardPlan';
import CardCourse from '../components/shared/cards/cardCourse';
import Footer from '../components/ui/footer/Footer';
import Alert from '../components/shared/notifications/alert';

import { useGetPlansQuery } from '../app/api/planApi';
import { useGetCoursesQuery } from '../app/api/courseApi';

function Home() {
  // Obtener planes
  const { data: plans, error: plansError, isLoading: plansLoading } = useGetPlansQuery();
  // obtener cursos
  const { data: courses, error: coursesError, isLoading: coursesLoading } = useGetCoursesQuery();

  return (
    <>
      <NavBar />
      <Header title="B-Educar" isInitial current="Home" />
      <Section id="services" title="Servicios" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardService
            title="+ 1.200 cursos"
            description="Accede a una amplia biblioteca de cursos en diferentes áreas del conocimiento, disponibles en todo momento."
            icon={<RiBook2Fill size={40} />}
          />
          <CardService
            title="Profesores expertos"
            description="Aprende de docentes altamente calificados con experiencia práctica en el sector académico y profesional."
            icon={<RiComputerFill size={45} />}
          />
          <CardService 
            title="Certificación"
            description="Obtén certificados oficiales que validan tus habilidades y potencian tu perfil profesional en el mercado laboral."
            icon={<RiGraduationCapFill size={45} />}
          />
        </div>
      </Section>

      <Section id="courses" title="Cursos populares" subtitle="Conoce nuestro amplio catálogo de cursos.">
        {coursesLoading && <Alert type="info" message="Cargando cursos..." />}
        {coursesError && <Alert type="error" message="No se obtuvieron cursos" />}
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses?.map((course) => (
            <CardCourse
              id={course.id}
              image={course.image}
              key={course.id}
              tag={course.level}
              title={course.name}
              description={course.description}
              category={course.category}
              credits={course.credits}
              teacher={course.professor.name}
            />
          ))}
        </div>
      </Section>

      <Section id="plans" title="Planes" subtitle="Adquiere créditos para acceder a cursos.">
        {plansLoading && <Alert type="info" message="Cargando planes..." />}
        {plansError && <Alert type="error" message="No se obtuvieron planes" />}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans?.map((plan) => (
            <CardPlan
              key={plan.id}
              id={plan.id}
              title={plan.name}
              description={`Accede a este plan y obten ${plan.credits} créditos para adquirir cursos exclusivos que impulsarán tu aprendizaje y desarrollo profesional.`}
              price={`$${plan.credits* 2}`}
              buttonText="Adquirir"
              features={[
                `Créditos: <span class='font-semibold'>${plan.credits}</span>`,
                "Acceso individual: <span class='font-semibold'>1 usuario</span>",
                "Soprte premium: <span class='font-semibold'>6 meses</span>",
                "Actualizaciones: <span class='font-semibold'>1 año</span>",
              ]}
            />
          ))}
        </div>
      </Section>
      <Footer />
    </>
  )
}

export default Home;
