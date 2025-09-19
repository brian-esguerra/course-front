import { RiArrowRightLine } from 'react-icons/ri';
import useDocumentTitle from '../../../hooks/Title';
import './header.css'

interface HeaderProps {
  title: string;
  isInitial: boolean;
  current?: string;
}

export default function Header({title, isInitial ,current}: HeaderProps) {
  let pageTitle = title  + ' - ' + current;  
  useDocumentTitle(pageTitle);

  if(!isInitial) {
    return (
      <section id="sub-header">
        <div className="container sub__header__container">
          <h2 className="font-bold mb-4">
            {current}
          </h2>
          <h4>Home / {current}</h4>
        </div>
      </section>
    );
  }
  
  return (
    <section id="header">
      <div className="container header__container">
        <h4>WELCOME TO</h4>
        <h1>B-Educar where Knowledge<br />Meets Opportunity</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim lorem, posuere mollis pharetra sit amet, bibendum eget justo. Sed et hendrerit magna, at dictum tellus.</p>
        <div className="header__cta">
          <a href="/register" className="header__btn">Registrate <RiArrowRightLine /> </a>
          <a href="/#plans" className="header__btn">Ver Planes <RiArrowRightLine /> </a>
        </div>
      </div>
    </section>
  )
}