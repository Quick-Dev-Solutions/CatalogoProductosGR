import FrontSuc from '../assets/brand/front-suc.jpg'

export const About = () => {
    return (
        <div className="about-container p-8 mx-auto flex sm:flex-row flex-col gap-8 w-[70vw]">
            <div className="md:sticky top-8 h-full">
                <img src={FrontSuc} alt="Frente de la sucursal" className="w-full h-auto" />
                
            </div>
            <div className="container-title flex flex-col justify-start">
                <div className="primer-texto mb-6">
                    <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>
                    <p>20 años de experiencia, más de 3.000 clientes satisfechos</p>
                </div>

                <p className="mb-6">
                    <strong>GR LLAVES</strong> nació hace 20 años como un pequeño negocio familiar en José C. Paz, Buenos Aires, Argentina. Con el tiempo, la pasión por la seguridad y la cerrajería, junto al compromiso con nuestros clientes, nos llevó a convertirnos en una distribuidora líder en el mercado online.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
                <p className="mb-6">
                    Brindar soluciones integrales en cerrajería y seguridad para el hogar, a través de una amplia gama de productos de alta calidad, asesoramiento personalizado y una experiencia de compra online segura y confiable.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
                <p className="mb-6">
                    Ser la empresa líder en distribución online de productos de cerrajería y seguridad en Argentina, reconocida por la excelencia en el servicio al cliente, la innovación y la calidad de nuestros productos.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Valores que nos definen</h2>
                <ul className="list-disc list-inside mb-6">
                    <li><strong>Compromiso:</strong> Nos comprometemos con la satisfacción de nuestros clientes, brindándoles productos de alta calidad y un servicio personalizado.</li>
                    <li><strong>Responsabilidad:</strong> Somos responsables de la seguridad y el bienestar de nuestros clientes, por eso solo ofrecemos productos de marcas confiables.</li>
                    <li><strong>Confianza:</strong> Generamos confianza en nuestros clientes a través de la transparencia en nuestras operaciones y la comunicación clara y efectiva.</li>
                    <li><strong>Innovación:</strong> Buscamos constantemente nuevas soluciones y productos para ofrecer a nuestros clientes la mejor experiencia de compra.</li>
                </ul>

                <p className="mb-6">
                    En <strong>GR LLAVES</strong>, estamos comprometidos con tu seguridad y la de tu familia.
                </p>

                <p>
                    Te invitamos a conocer nuestro amplio catálogo de productos y a disfrutar de una experiencia de compra online segura y confiable.
                </p>
            </div>
        </div>
    );
}
