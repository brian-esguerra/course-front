import Footer from "../components/ui/footer/Footer";
import Header from "../components/ui/header/Header";
import NavBar from "../components/ui/navbar/NavBar";
import Section from "../components/ui/section/Section";
import Alert from '../components/shared/notifications/alert';
import CardCourse from "../components/shared/cards/cardCourse";
import LayoutSimple from "../components/shared/layout/LayoutSimple";
import Acordion from "../components/shared/group/Acordion";

import { useGetCoursesQuery } from '../app/api/courseApi';

function Courses() {
  // obtener cursos
  const { data: courses, error: coursesError, isLoading: coursesLoading } = useGetCoursesQuery();


  return (
    <>
      <NavBar />
      <Header title="B-Educar" current="Cursos" />
      <Section>
        <LayoutSimple id="filter" sizeLeft={3} sizeRigth={9} form={<Filter />}>
          <div className="">
            <p className="text-md text-gray-500 py-4"> 345 result found </p>
            {coursesLoading && <Alert type="info" message="Cargando cursos..." />}
            {coursesError && <Alert type="error" message="No se obtuvieron cursos" />}
        
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </LayoutSimple>
      </Section>
      <Footer />
    </>
  )
}

function Filter() {
  return (
    <>
      <div>
        <h3 className="mt-4 font-regular text-gray-900/80">Filtros:</h3>
        <hr className="border border-gray-100 my-4 w-full" />
      </div>
      <Acordion ref={'acc_1'} title="Categorías">
        <div key={1} className="flex items-center ps-3 border border-gray-200 rounded-sm dark:border-gray-700">
          <input id="radio_1" type="radio" value={1} name="plan" className="w-4 h-4" />
          <label for="radio_1" className="w-full py-2 ms-2 text-sm text-gray-800">Big Data</label>
        </div>
        <div key={2} className="flex items-center ps-3 border border-gray-200 rounded-sm dark:border-gray-700">
          <input id="radio_2" type="radio" value={1} name="plan" className="w-4 h-4" />
          <label for="radio_2" className="w-full py-2 ms-2 text-sm text-gray-900">Desarrollo y Software</label>
        </div>
        <div key={3} className="flex items-center ps-3 border border-gray-200 rounded-sm dark:border-gray-700">
          <input id="radio_3" type="radio" value={1} name="plan" className="w-4 h-4" />
          <label for="radio_3" className="w-full py-2 ms-2 text-sm text-gray-900">IA</label>
        </div>
        <div key={4} className="flex items-center ps-3 border border-gray-200 rounded-sm dark:border-gray-700">
          <input id="radio_4" type="radio" value={1} name="plan" className="w-4 h-4" />
          <label for="radio_4" className="w-full py-2 ms-2 text-sm text-gray-900">Infraestructura y Redes</label>
        </div>
        <div key={5} className="flex items-center ps-3 border border-gray-200 rounded-sm dark:border-gray-700">
          <input id="radio_5" type="radio" value={1} name="plan" className="w-4 h-4" />
          <label for="radio_5" className="w-full py-2 ms-2 text-sm text-gray-900">Gestión y administración</label>
        </div>
      </Acordion>

      <Acordion ref={'acc_2'} title="Nivel">
        <div class="flex justify-center flex-col space-y-2 px-4">
          <span class="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">Básico</span>
          <span class="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">Intermedio</span>
          <span class="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">Avanzado</span>
        </div>
      </Acordion>

      <Acordion reff={'acc_3'} title="Créditos">
      <div class="p-2">
        <div class="flex justify-between w-full">
            <div>0</div>
            <div>50</div>
        </div>
        <input id="range" type="range" class="block w-full py-2 text-red-700 bg-white accent-[#690cc6] rounded-md"></input>
      </div>
      </Acordion>
    </>
  )
}

export default Courses;