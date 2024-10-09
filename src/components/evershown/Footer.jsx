export const Footer = () => {
    return (
      <footer className="bg-slate-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Sección de información */}
          <div className="w-64">
            <h2 className="text-lg font-bold">Sobre Nosotros</h2>
            <p className="text-sm">Lider Mayorista en automatización, herrajes y Seguridad. Atención y logistica excepcionales para tu tranquilidad y rentabilidad. ¡Contactanos y descubrí los beneficios de ser nuestro cliente!</p>
          </div>
  
          {/* Enlaces a redes sociales */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
            </a>
          </div>
  
          {/* Derechos de autor */}
          <div className="text-sm">
            <p>&copy; 2024 GR LLaves. Todos los derechos reservados.</p>
            <a href="/politica-privacidad" className="hover:underline">Política de Privacidad</a>
          </div>
        </div>
      </footer>
    );
  }
  