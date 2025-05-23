# **Readify Project**

## **Tabla de Contenidos**

- [1. Descripción General](https://www.google.com/search?q=%231-descripci%C3%B3n-general)
- [2. Tecnologías y Recursos Utilizados](https://www.google.com/search?q=%232-tecnolog%C3%ADas-y-recursos-utilizados)
- [3. Decisiones Técnicas y de Diseño](https://www.google.com/search?q=%233-decisiones-t%C3%A9cnicas-y-de-dise%C3%B1o)
- [4. Áreas de Mejora y Posibles Rectificaciones](https://www.google.com/search?q=%234-%C3%A1reas-de-mejora-y-posibles-rectificaciones)
- [5. Configuración y Ejecución Local](https://www.google.com/search?q=%235-configuraci%C3%B3n-y-ejecuci%C3%B3n-local)

## **1. Descripción General**

Este proyecto es un **buscador de libros** interactivo construido como una **Single Page Application (SPA)** que consume datos de la **API de Open Library**.

## Objetivo

Su objetivo principal es permitir a los usuarios explorar una amplia colección de libros, ofreciendo funcionalidades básicas de búsqueda. Los usuarios pueden **filtrar los resultados por idioma y realizar búsquedas generales, o específicas por autor o título, accediendo al detalle del libro seleccionado**.

## **2. Tecnologías y Recursos Utilizados**

### 2.1. Tecnologías

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías y recursos clave:

- **Framework/Librerías Principales:**
  - **React:** `^19.1.0`
  - **TypeScript:** `~5.8.3`
- **Herramientas de Desarrollo:**
  - **Vite:** `^6.3.5` (Utilizado como herramienta de construcción rápida y entorno de desarrollo)
- **Enrutamiento:**
  - **`react-router-dom`:** `^7.6.0` (Para la navegación y gestión de rutas en la aplicación de una sola página)
- **Estilado:**
  - **Tailwind CSS:** `^3.4.1` (Para un rápido desarrollo de la interfaz de usuario con clases de utilidad)
  - **PostCSS:** `^8.5.3` y **Autoprefixer:** `^10.4.21` (Para el procesamiento de CSS y asegurar la compatibilidad con navegadores)
- **Gestión de Código y Calidad:**
  - **ESLint:** `^9.25.0` (Con `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, y `typescript-eslint`) (Para el análisis estático de código y mantener estándares de calidad y estilo)
- **Peticiones HTTP:**
  - Se utilizó la **Fetch API** nativa del navegador para las peticiones a la API de Open Library.
- **Utilidades/Hooks Adicionales:**
  - **usehooks-ts:** (Para la inclusión de utilidades y hooks reutilizables, como `use-local-storage`).

### **2.2.Técnicas de Desarrollo React y TypeScript:**

- **Manejo de Estado y Efectos:** Uso de `useState` y `useEffect` para el estado local y los efectos secundarios, incluyendo estados de carga, error y datos.
- **Custom Hooks:** Implementación de custom hooks como `useBooks` para encapsular y reutilizar la lógica de negocio y gestión de estado. Para promover la modularidad, haciendo el código más limpio y mantenible. Además, se utilizó el custom hook `use-local-storage` de la librería `usehooks-ts` para la persistencia de datos en el `localStorage` del navegador, facilitando el almacenamiento de configuraciones o preferencias del usuario entre sesiones.
- **Programación Asíncrona:** Las operaciones asíncronas se gestionaron predominantemente con **`async/await`**, lo que mejora la legibilidad y el manejo de flujos de control. Además, el uso de **`Promise.all`** fue crucial para optimizar la obtención de datos concurrentes (como la recuperación de múltiples detalles de autores).
- **Tipado Estricto con TypeScript:** Aplicación de tipos e interfaces para props, estados, y la definición de tipos personalizados para las respuestas de la API, asegurando la robustez y predictibilidad del código.
- **Manejo de Peticiones HTTP:** Uso de la API nativa `Workspace` con construcción dinámica de URLs (`URL` y `searchParams`) e implementación de manejo de errores.

## **3. Decisiones Técnicas y de Diseño**

Durante el desarrollo de este proyecto, se tomaron las siguientes decisiones técnicas y de diseño para estructurar y construir la aplicación:

- **Elección de Vite para el Entorno de Desarrollo:**
  Se optó por **Vite** como la herramienta de construcción y entorno de desarrollo principal. La elección se basó en su reputación de **rapidez y facilidad para iniciar proyectos React**, lo que permitió un arranque ágil del desarrollo.
- **Estructura de Componentes con Atomic Design:**
  El proyecto sigue una estructura de componentes inspirada en el patrón **Atomic Design**, organizada jerárquicamente dentro de la carpeta `src/components`: - `atoms`: Componentes UI básicos y reutilizables (ej. `Button`, `ContentWrapper`). - `molecules`: Agrupaciones de átomos con cierta funcionalidad (ej. `Book`, `SearchBar`). - `organisms`: Secciones más complejas de la UI compuestas por moléculas y átomos (ej. `BookList`). - `pages`: Componentes de nivel superior que representan vistas o páginas completas de la aplicación (ej. `DetailBook`).
  Esta organización promueve la **reusabilidad, mantenibilidad y escalabilidad** de la interfaz de usuario.
- **Enfoque de la API de Open Library y Manejo de Errores:**
  La interacción con la API externa de Open Library se realizó utilizando la **Fetch API** nativa, con un diseño de `src/api/endpoints.ts` y `src/api/open-library.ts` para centralizar las llamadas. Se implementó una lógica específica para la **construcción dinámica de URLs** con `URL` y `searchParams` para los parámetros de búsqueda, y un robusto **manejo de errores** en las peticiones HTTP, mostrando mensajes al usuario. A pesar de ciertas inconsistencias en la API, se gestionó la obtención de recursos específicos (como imágenes de portada) y los identificadores `olid` (Open Library ID) para acceder a los detalles del libro.
- **Manejo de Rutas:**
  La gestión de la navegación dentro de esta **Single Page Application (SPA)** se realiza mediante **`react-router-dom`**. Esta librería fue elegida para manejar las rutas de forma declarativa, permitiendo una experiencia de usuario fluida sin recargas completas de la página al cambiar de vista. Se implementaron **rutas dinámicas con parámetros**, haciendo uso de _hooks_ como `useParams` y `useNavigate` para la navegación.
- **Optimizaciones de Experiencia de Usuario (UX) durante la Carga:**
  Para mejorar la percepción de rendimiento, se implementaron varias técnicas de UX: - **Estados de Carga (Loading States):** Indicadores visuales durante la carga de datos. - **Skeletons:** Uso de componentes _skeleton_ (`SkeletonBook`, `Loading`) para proporcionar un _feedback_ visual inmediato mientras se espera el contenido real. - **Placeholders de Imágenes:** Implementación de _placeholders_ para las imágenes que aún no han cargado. - **Manejo de estados de carga de imágenes** para una visualización progresiva.
- **Estrategia de Estilado con Tailwind CSS y Diseño Responsive:**
  Se optó por **Tailwind CSS** para un desarrollo rápido y flexible de la interfaz. La aplicación hace uso de las utilidades de Tailwind para un **diseño responsive** (`grid`, `flexbox`), lo que contribuye a una interfaz de usuario dinámica y adaptativa.
- **Organización del Código y Constantes:**
  Además de la arquitectura de componentes atómicos, se centralizaron **constantes y configuraciones** en archivos dedicados (`src/constants/pagination.ts`), y se agruparon **funciones de utilidad** (`src/utils/imageUtils.ts`, `src/utils/stringUtils.ts`) y **definiciones de tipos** (`src/types`) para mantener el código modular, legible y fácil de mantener.

## 4. Retos Enfrentados y Áreas de Mejora

Durante el desarrollo de este proyecto, me encontré con ciertos retos técnicos y limitaciones, además de diversas áreas donde el proyecto podría ser significativamente mejorado con tiempo adicional.

### 4.1. Retos Técnicos y del Entorno

En esta sección se detallan los principales desafíos y obstáculos técnicos que surgieron durante la implementación:

- **Manejo de Inconsistencias de la API de Open Library:** La interacción con la API de Open Library presentó varias complejidades. Específicamente:
  - **Variabilidad en la Estructura de la `description` de los libros:** He identificado una **inconsistencia en la propiedad `description` de los libros**, la cual a veces se recibe como un `string` simple y otras como un `object`. Esta variabilidad provocó fallos intermitentes en la carga y renderización de la vista de detalle del libro.
  - **Estructura de URLs para Imágenes:** Las URLs para cargar imágenes de portadas y autores a menudo son inconsistentes y requieren una construcción manual y específica de las mismas. **Difieren de un patrón REST estándar** donde se esperaría que estos recursos partieran de una raíz común como `https://openlibrary.org/v1/` (con versionado de la api que actualmente no tiene) y luego tuvieran rutas homogéneas coherentes, por ejemplo: `/api/v1/books/{id}/cover` o `/api/v1/authors/{id}/image`. Sin embargo, así es como funciona actualmente en Open Library:
    - Para **portadas**: `https://covers.openlibrary.org/b/id/{id}-L.jpg`
    - Para **autores**: `https://openlibrary.org/a/olid/{olid}.jpg`
  - **Formato de Respuesta para Detalles de Libros:** La API para obtener **detalles de libros concretos (`/works/OLxxxxW`) devuelve una página HTML por defecto**, y se necesita **añadir `.json` a la URL** para obtener los datos estructurados.
- **Curva de Aprendizaje y Necesidad de Investigación:** El desarrollo de este proyecto puso de manifiesto la necesidad de **investigación constante** ante mi falta de familiaridad con ciertas funciones específicas de React o el manejo de dependencias menos comunes. Este aprendizaje activo fue fundamental para superar obstáculos técnicos y optimizar soluciones. Por ejemplo, la implementación de **hooks personalizados** para una mayor reutilización y optimización del código, así como la investigación y uso de librerías externas como **`usehooks-ts`** para funcionalidades específicas como **`useLocalStorage`**, fueron áreas donde tuve que profundizar mis conocimientos.

### 4.2. Puntos de Mejora y Futuras Incorporaciones

Con más tiempo y recursos, los siguientes aspectos serían prioritarios para optimizar y expandir la funcionalidad y la experiencia de usuario del proyecto:

- **Optimización de Tiempos de Carga y Caching:** Implementaría estrategias para **optimizar los tiempos de carga** inicial de la aplicación y consideraría investigar formas de **guardar datos en caché** (por ejemplo, los resultados de las primeras consultas a la API). Esto es crucial para reducir los tiempos de espera y mejorar la experiencia de usuario, especialmente en la primera interacción.
- **Mockeo de Datos para Desarrollo y Pruebas:** Para facilitar un desarrollo más independiente de la disponibilidad y consistencia de la API externa, y para agilizar la creación de tests unitarios y de integración (de haberlos implementado), habría desarrollado un sistema robusto de mockeo de datos de la API.
- **Mejora de la Lógica de Búsqueda y Filtrado:** Refinaría la lógica de búsqueda para manejar mejor escenarios con **pocas letras** en los autores o títulos, que arrojan resultados extraños. También me habría gustado intentar abordar de forma más coherente el **filtrado por preferencia de idiomas**, aunque he podido comprobar que la API de serie arroja resultados peculiares, tal y como me comentasteis en el briefing.
- **Mejoras en la Experiencia de Usuario (UX) y el Diseño Visual:** En línea con las directrices del briefing que priorizaban la funcionalidad sobre el diseño visual, la interfaz actual es un reflejo de este enfoque. Sin embargo, con tiempo adicional, se pondría un énfasis significativo en la **mejora de la experiencia de usuario y el diseño gráfico**. Específicamente:
  - Implementaría **filtros de búsqueda más intuitivos** y un **menú desplegable responsivo para dispositivos móviles** bien estructurado que facilitara la navegación y la interacción.
  - La aplicación se beneficiaría enormemente de la adición de **animaciones y transiciones** para hacer la interacción más fluida, dinámica y atractiva (más allá de las animaciones básicas de carga).
  - Para la vista de detalle de un libro, mi intención inicial era presentar la información en un **modal flotante** en lugar de una página de navegación completa. Esto habría ofrecido una experiencia más ágil, permitiendo volver al listado principal con mayor facilidad.
- **Tipificación y Manejo de Errores Más Descriptivo:** Mejoraría la especificación y el manejo de los errores provenientes de la API para que fueran más descriptivos y fáciles de testear, para facilitar el proceso de depuración por parte del desarrollador.
- **Gestión de la Paginación en Listados Filtrados:** Implementar la **paginación correcta para el apartado de filtrado por libros leídos**. Actualmente la API proporciona una paginación total que no se alinea correctamente con la paginación específica por el estado “leído” que he implementado, que se puede marcar por un filtro. Que funcione correctamente, implicaría replantear la lógica de cómo se maneja, ya que la arquitectura actual no contempla este escenario de forma directa.

## **5. Configuración y Ejecución Local**

Para poner en marcha este proyecto en entorno de desarrollo local, sigue los siguientes pasos:

### **Prerrequisitos:**

Asegúrate de tener instalado Node.js (versión recomendada) y pnpm.

### **Instalación:**

1. Clona el repositorio:

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd readify-project
   ```

3. Instala las dependencias utilizando pnpm:

   ```bash
   pnpm install
   ```

### **Ejecución:**

1. Inicia el servidor de desarrollo:

   ```bash
   pnpm run dev
   ```

2. La aplicación se abrirá automáticamente en tu navegador en `http://localhost:5173` por defecto.
