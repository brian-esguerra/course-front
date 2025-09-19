
export default function Footer() {
  return (
    <footer className="bg-[#00001b]">
      <div className="container py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        {/* Links */}
        <div
          className="-mx-5 -my-2 flex flex-wrap justify-center order-2"
          aria-label="Footer"
        >
          <div className="px-5">
            <a
              href="#"
              className="text-base text-white hover:text-gray-200"
            >
              Política de privacidad
            </a>
          </div>

          <div className="px-5">
            <a
              href="#"
              className="text-base text-white hover:text-gray-200"
            >
              Terminos y condiciones
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base text-white">
            &copy; B-Educar App. MIT Licensed.
          </p>
        </div>
      </div>
    </footer>
  );
}
