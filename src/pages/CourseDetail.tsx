import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from '../components/ui/navbar/NavBar';
import Header from '../components/ui/header/Header';
import Footer from '../components/ui/footer/Footer';
import Section from '../components/ui/section/Section';
import Alert from "../components/shared/notifications/alert";
import Label from "../components/shared/text/label";
import CardList from "../components/shared/cards/cardList";
import { RiArrowRightLine } from 'react-icons/ri';
import { FaUser, FaTags, FaTasks, FaCalendar, FaUsers } from 'react-icons/fa';

import { useGetCourseByIdQuery } from "../app/api/courseApi";
import { useCourseAssignment } from "../hooks/useCourseAssigment";
import { useGetUsersByCourseQuery } from "../app/api/assignApi";
import { formatDate } from "../utils/formatDate";

function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // obtener perfil user
  const { data: course, error: courseError, isLoading: courseLoading} = useGetCourseByIdQuery(id);

  const { assigned, checking, assigning, assignError, handleAssign } = useCourseAssignment(
    user?.id,
    id ? Number(id) : undefined
  );

  const errorMessage = assignError?.data?.error;

  return (
    <>
      <NavBar />
      <Header title="B-Educar" current="Detalle" />
      <Section>
        {courseLoading && <Alert type="info" message="Cargando curso..." />}
        {courseError && <Alert type="error" message="No se obtuvieron daatos" />}

        {course?.id && (
          <main class="bg-blue-200s mx-auto">
            <div class="flex flex-wrap justify-between">
                <div class="w-full md:w-8/12 px-4 mb-8 rounded-lg shadow-2xl">
                    <img src={course?.image} alt="Featured Image" class="w-full mt-6 h-64 object-cover rounded" />
                    <h3 class="text-4xl font-bold mt-4 mb-2">{course?.name}</h3>
                    <p class="text-gray-700 mb-4">{course?.description}</p>
                    <p class="text-gray-700 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.</p>
                    <p class="text-gray-700 mb-4">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt explicabo.</p>
                </div>
                <div class="w-full md:w-4/12 px-4 mb-8">
                  <div className="py-6 px-4 text-center align-center jusitfy-center space-y-4 flex flex-col rounded-lg border border-gray-200">
                    {user ? (
                      checking ? (
                        <p>Cargando estado...</p>
                      ) : assigned ? (
                        <p className="text-green-800 font-semibold">Ya estás inscrito</p>
                      ) : (
                        <>
                        <button
                          onClick={handleAssign}
                          disabled={assigning}
                          className="header__btn"
                        >
                          {assigning ? "Procesando..." : "Matricularme"} <RiArrowRightLine />
                        </button>
                        {errorMessage && (
                            <Alert type="error" message={`Error: ${errorMessage}`} />
                          )}
                        </>
                      )
                    ) : (
                      <button
                        onClick={() => navigate("/register")}
                        className="header__btn"
                      >
                        Registrarse <RiArrowRightLine />
                      </button>
                    )}
                    <hr className="border border-gray-100 w-full" />
                    <div className="grid w-full gap-2">
                      <Label title={`Créditos: ${course?.credits}`} icon={<FaTags size={15} />} />
                      <Label title={`Profesor: ${course?.professor.name}`} icon={<FaUser size={15} />} />
                      <Label title={`Publicación: ${ formatDate(course?.createdAt)}`} icon={<FaCalendar size={15} />} />
                      <hr className="border border-gray-100 w-full" />
                      <Label title={`Nivel: ${course?.level}`} icon={<FaTags size={15} />} />
                      <Label title={`Categoría: ${course?.category}`} icon={<FaTags size={15} />} />
                      <hr className="border border-gray-100 w-full" />
                      <Label title={`Matriculados: ${course?.credits}`} icon={<FaUsers size={15} />} />
                      <Label title={`Actividades: ${course?.credits * 4}`} icon={<FaTasks size={15} />} />
                    </div>
                    
                  </div>
                </div>
            </div>
          </main>
        )}
      </Section>
      {user && assigned && id && (
        <Section title="Actividades" subtitle=" ">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <CardList title="Actividad 1" price="Video" desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim lorem, posuere mollis pharetra sit amet, bibendum eget justo. Sed et hendrerit magna, at dictum tellus.'} />
            <CardList title="Actividad 2" price="Blog" desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim lorem, posuere mollis pharetra sit amet, bibendum eget justo. Sed et hendrerit magna, at dictum tellus.'} />
            <CardList title="Actividad 3" price="Podcast" desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim lorem, posuere mollis pharetra sit amet, bibendum eget justo. Sed et hendrerit magna, at dictum tellus.'} />
          </div>
        </Section>
      )}
      {user && assigned && id && (
        <Section title="Usuarios inscritos" subtitle=" ">
            <UserList courseId={Number(id)} />
        </Section>
      )}
      <Footer />
    </>
  )
}


function UserList({ courseId }: { courseId: number }) {
  const { data: users, error, isLoading } = useGetUsersByCourseQuery(courseId);

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-600">Error al obtener usuarios</p>;

  if (!users || users.length === 0) {
    return <p>No hay usuarios inscritos en este curso.</p>;
  }

  return (
    <ul className="mt-2 space-y-1">
      {users.map((u: any) => (
        <li
          key={u.user.id}
          className="p-2 rounded border border-gray-200 flex justify-between items-center"
        >
          <span>{u.user.name} ({u.user.email})</span>
          <span className="text-sm text-gray-500">{formatDate(u.enrolledAt)}</span>
        </li>
      ))}
    </ul>
  );
}


export default CourseDetail;
