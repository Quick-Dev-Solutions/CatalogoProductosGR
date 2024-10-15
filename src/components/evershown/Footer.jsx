import Location from '../../assets/location.svg'
import InstaLogo from '../../assets/instagram.svg'
import Mail from '../../assets/mail.svg'

export const Footer = () => {
    return (
      <footer className="bg-slate-600 text-white p-4 ">
        <div className="container mx-auto flex justify-between items-center">
          {/* Sección de información */}
          <div className="w-64">
            <h2 className="text-lg font-bold">GR Llaves</h2>
            <p className="text-sm">Lider Mayorista en automatización, herrajes y Seguridad. Atención y logistica excepcionales para tu tranquilidad y rentabilidad. ¡Contactanos y descubrí los beneficios de ser nuestro cliente!</p>
          </div>
  
          {/* Enlaces a redes sociales */}
          <div className="flex space-x-4">
            <a href="https://maps.app.goo.gl/49sMKiARTaAZunZr9" target="_blank" rel="noopener noreferrer">
              <img src={Location} alt="Maps" className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/gr_llaves" target="_blank" rel="noopener noreferrer">
              <img src={InstaLogo} alt="Instagram" className="h-6 w-6" />
            </a>
            <a href="mailto:info@grllaves.com.ar" target="_blank" rel="noopener noreferrer">
              <img src={Mail} alt="Email: info@grllaves.com.ar" className="h-6 w-6" />
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
  