# Sistema de catálogo de productos para empresa de venta mayorista y minorista.
## Implementado por QuickDevSolutions
## Descripción del Proyecto

El sistema web propuesto automatiza el proceso de búsqueda de productos para los clientes, así como la gestión de productos y categorías desde el lado de los empleados. Este sistema permite una gestión eficiente de la vista de productos y mejora la visibilidad de los mismos.

## Funcionalidades Principales

### 1. Filtro por categorías
- **Visualización**: Listado y búsqueda de productos por categorías.

### 2. Manejo de búsquedas inteligentes
- **Búsqueda por medio de palabras clave**: Los clientes pueden buscar productos por palabras clave.
- **Filtro por cantidad**: Los clientes podrán ver en su totalidad o menor medida los productos que cumplan con sus parámetros de búsqueda. 

### 3. Ofertas
- **Del lado del cliente**: Se encuentran con un Slider en la página principal el cuál les permite a los clientes visualizar las ofertas actuales.
- **Del lado del empleado**: Les permite a los empleados, registrar, actualizar o borrar ofertas.

### 4. Extensibilidad
- **Módulos Adicionales**: Posibilidad de añadir módulos adicionales como gestión de inventario, sistema de ventas y otros según necesidades futuras.

## Módulo de Control de Empleados
> [!WARNING]
> No está realizado todavía

### Descripción General
Este módulo está diseñado para gestionar el acceso al sistema y controlar las actividades de los empleados. Permite a los empleados iniciar sesión de manera segura con credenciales individuales y proporciona una visión integral del uso del sistema por parte de cada usuario. Esto facilita la administración, supervisión y auditoría de las acciones realizadas dentro del sistema.

#### 1. Registro de Empleados:
- **Formulario de Registro**:
  - **Campos**: Nombre completo, dirección de correo electrónico, usuario, contraseña y rol (por ejemplo, empleado, supervisor, administrador).
  - **Validación**: Verifica que los datos sean válidos, que el usuario no exista ya y que la contraseña cumpla con los requisitos de seguridad (como longitud mínima, caracteres especiales, etc.).
- **Asignación de Rol**: Permite asignar un rol específico a cada empleado, que determina los permisos y accesos dentro del sistema.

#### 2. Inicio de Sesión:
- **Formulario de Login**:
  - **Campos**: Usuario y contraseña.
  - **Autenticación**: Verifica las credenciales proporcionadas contra la base de datos para permitir el acceso al sistema.
- **Recuperación de Contraseña**: Permite a los usuarios recuperar o restablecer su contraseña mediante un proceso de verificación de identidad (como un enlace enviado al correo electrónico).

#### 3. CRUD de productos y ofertas:
- **Modificación de ofertas**: Permite al administrador modificar las ofertas disponibles.
- **Productos**: Permite al administrador, crear, editar, eliminar o ver los productos disponibles.

## Proyecto implementado con el empaquetador Vite 
### Tecnologías Utilizadas:
- React.js (Framework principal de UI)
- Tailwind CSS (Librería para estilos)
- React-Router-Dom (Librería para la navegación entre páginas sin perder los estados y obtener los params)
- Axios (para peticiones a la API)
- JS-cookie (para el manejo de autenticación, no realizado todavía.)

### Estructura del proyecto
- AuthProvider (Proveedor para el manejo de las cargas mientras peticiones y autenticación de usuarios.)
- ProductosProvider (Proveedor de funciones para peticiones a la API, donde se encuentran la mayoría de funciones.)
- Rutas públicas (rutas de acceso público donde cualquier usuario que no esté logueado puede ingresar.)
- Rutas privadas (rutas de acceso privado para el personal administrativo, no realizadas todavía)
- **Vistas**:
  - Vista de carga adaptada a la paleta de colores de la empresa.
  - Slider de ofertas para los productos.
  - Scroll to Top, componente que ayuda a la mejor experiencia de usuario.

- **Componentes**:
  - Siempre mostrados: El header y el footer siempre estarán a la vista del usuario.
  - ProductContainer, contiene la vista de un producto.
  - Categories List, contiene la lista de categoría que será mostrada en ProductList.
  - ProductList, contiene la lista de productos según los parámetros establecidos.

- **Otras páginas**:
  - Inicio: página donde el usuario verá las principales ofertas, un slider de las mismas y todas las categorías que ofrece la empresa.
  - About: ofrece una descripción de lo que es la empresa.

## Contacto

Si estás interesado en este proyecto o deseas que desarrollemos uno a medida adaptado a tus necesidades, no dudes en ponerte en contacto con nosotros. Estaremos encantados de ayudarte a crear soluciones innovadoras y eficientes.

**Correo electrónico**: [santiagocuevas@quickdevsolution.com](mailto:santiagocuevas@quickdevsolution.com)

¡Esperamos trabajar contigo!
