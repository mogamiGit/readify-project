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

### **2.2.Técnicas de Desarrollo React y TypeScript:**

- **Manejo de Estado y Efectos:** Uso de `useState` y `useEffect` para el estado local y los efectos secundarios, incluyendo estados de carga, error y datos.
- **Custom Hooks:** Implementación de *custom hooks* como `useBooks` para encapsular y reutilizar la lógica de negocio y gestión de estado. Para promover la modularidad, haciendo el código más limpio y mantenible.
- **Programación Asíncrona:** Las operaciones asíncronas se gestionaron predominantemente con **`async/await`**, lo que mejora la legibilidad y el manejo de flujos de control. Además, el uso de **`Promise.all`** fue crucial para optimizar la obtención de datos concurrentes (como la recuperación de múltiples detalles de autores).
- **Tipado Estricto con TypeScript:** Aplicación de tipos e interfaces para props, estados, y la definición de tipos personalizados para las respuestas de la API, asegurando la robustez y predictibilidad del código.
- **Manejo de Peticiones HTTP:** Uso de la API nativa `Workspace` con construcción dinámica de URLs (`URL` y `searchParams`) e implementación de manejo de errores.

## **3. Decisiones Técnicas y de Diseño**

Durante el desarrollo de este proyecto, se tomaron las siguientes decisiones técnicas y de diseño para estructurar y construir la aplicación:

- **Elección de Vite para el Entorno de Desarrollo:**
Se optó por **Vite** como la herramienta de construcción y entorno de desarrollo principal. La elección se basó en su reputación de **rapidez y facilidad para iniciar proyectos React**, lo que permitió un arranque ágil del desarrollo.
- **Estructura de Componentes con Atomic Design:**
El proyecto sigue una estructura de componentes inspirada en el patrón **Atomic Design**, organizada jerárquicamente dentro de la carpeta `src/components`:
    - `atoms`: Componentes UI básicos y reutilizables (ej. `Button`, `ContentWrapper`).
    - `molecules`: Agrupaciones de átomos con cierta funcionalidad (ej. `Book`, `SearchBar`).
    - `organisms`: Secciones más complejas de la UI compuestas por moléculas y átomos (ej. `BookList`).
    - `pages`: Componentes de nivel superior que representan vistas o páginas completas de la aplicación (ej. `DetailBook`).
    Esta organización promueve la **reusabilidad, mantenibilidad y escalabilidad** de la interfaz de usuario.
- **Enfoque de la API de Open Library y Manejo de Errores:**
La interacción con la API externa de Open Library se realizó utilizando la **Fetch API** nativa, con un diseño de `src/api/endpoints.ts` y `src/api/open-library.ts` para centralizar las llamadas. Se implementó una lógica específica para la **construcción dinámica de URLs** con `URL` y `searchParams` para los parámetros de búsqueda, y un robusto **manejo de errores** en las peticiones HTTP, mostrando mensajes al usuario. A pesar de ciertas inconsistencias en la API, se gestionó la obtención de recursos específicos (como imágenes de portada) y los identificadores `olid` (Open Library ID) para acceder a los detalles del libro.
- **Manejo de Rutas:**
La gestión de la navegación dentro de esta **Single Page Application (SPA)** se realiza mediante **`react-router-dom`**. Esta librería fue elegida para manejar las rutas de forma declarativa, permitiendo una experiencia de usuario fluida sin recargas completas de la página al cambiar de vista. Se implementaron **rutas dinámicas con parámetros**, haciendo uso de *hooks* como `useParams` y `useNavigate` para la navegación.
- **Optimizaciones de Experiencia de Usuario (UX) durante la Carga:**
Para mejorar la percepción de rendimiento, se implementaron varias técnicas de UX:
    - **Estados de Carga (Loading States):** Indicadores visuales durante la carga de datos.
    - **Skeletons:** Uso de componentes *skeleton* (`SkeletonBook`, `Loading`) para proporcionar un *feedback* visual inmediato mientras se espera el contenido real.
    - **Placeholders de Imágenes:** Implementación de *placeholders* para las imágenes que aún no han cargado.
    - **Manejo de estados de carga de imágenes** para una visualización progresiva.
- **Estrategia de Estilado con Tailwind CSS y Diseño Responsive:**
Se optó por **Tailwind CSS** para un desarrollo rápido y flexible de la interfaz. La aplicación hace uso de las utilidades de Tailwind para un **diseño responsive** (`grid`, `flexbox`) y la inclusión de **animaciones** (como `animate-pulse` en los *skeletons*), lo que contribuye a una interfaz de usuario dinámica y adaptativa.
- **Organización del Código y Constantes:**
Además de la arquitectura de componentes atómicos, se centralizaron **constantes y configuraciones** en archivos dedicados (`src/constants/pagination.ts`), y se agruparon **funciones de utilidad** (`src/utils/imageUtils.ts`, `src/utils/stringUtils.ts`) y **definiciones de tipos** (`src/types`) para mantener el código modular, legible y fácil de mantener.

## 4. Áreas de Mejora y Posibles Rectificaciones

Si hubiera tenido más tiempo para seguir desarrollando y optimizando el proyecto, me habría centrado en los siguientes aspectos:

- **Optimización de Tiempos de Carga y Caching:** Implementaría estrategias para **optimizar los tiempos de carga** inicial de la aplicación y consideraría investigar formas de **guardar datos en caché** (por ejemplo, los resultados de las primeras consultas a la API). Esto es crucial para reducir los tiempos de espera y mejorar la experiencia de usuario, especialmente en la primera interacción.
- **Mockeo de Datos:** Para facilitar el desarrollo y el testeo, me habría gustado **mockear los datos** de la API. Esto habría permitido un desarrollo más independiente de la disponibilidad y consistencia de la API externa, y habría agilizado la creación de tests unitarios (de haberlos realizado).
- **Manejo Robusto de Errores y Tipificación Específica:** Mejoraría la **especificación y el manejo de errores** provenientes de la API para que sean más descriptivos y fáciles de testear. Además, sería valioso **especificar mejor los errores** para facilitar el proceso de *testing* y depuración.
- **Gestión de Dependencias y Configuración:** Si bien se logró resolver, la integración de **Tailwind CSS con Vite** presentó desafíos iniciales debido a la falta de familiaridad con Vite (normalmente uso otros frameworks como Astro o Svelte).
- **Mejora de la Lógica de Búsqueda y Filtrado:** Refinaría la lógica de búsqueda para manejar mejor escenarios con **pocas letras** en los autores o títulos, que arrojan resultados extraños. También me habría gustado abordar de forma más robusta el **filtrado por preferencia de idiomas**, según los requisitos del briefing. También he detectado el problema de resultados inesperados respecto a los languages que comentabais en el briefing.
- **Manejo de Inconsistencias y Errores de la API:** Detecté **inconsistencias en los datos proporcionados por la API de Open Library**, lo que me gustaría investigar más a fondo para comprender mejor y mitigar sus efectos. Específicamente:
    - **Estructura de URLs para Imágenes:** Las URLs para cargar imágenes de portadas y autores a menudo son inconsistentes y requieren una construcción manual y específica de las mismas. Difieren de un patrón REST estándar donde se esperaría que estos recursos partieran de una raíz común como `https://openlibrary.org/v1/` (con versionado de la api que actualmente no tiene) y luego tuvieran rutas homogéneas coherentes, por ejemplo: `/api/v1/books/{id}/cover` o `/api/v1/authors/{id}/image`.
    Sin embargo, así es como funciona actualmente en Open Library:
        - Para **portadas**: `https://covers.openlibrary.org/b/id/{id}-L.jpg`
        - Para **autores**: `https://openlibrary.org/a/olid/{olid}.jpg`
    - La API para obtener **detalles de libros concretos (`/works/OLxxxxW`) devuelve una página HTML por defecto**, y se necesita **añadir `.json` a la URL** para obtener los datos estructurados. A pesar de esto, la **carga de detalles en algunos libros sigue siendo inestable o produce errores**, lo que apunta a posibles problemas en la consistencia de los datos del propio `.json` o en la estabilidad de la API.
    - Me gustaría investigar cómo **normalizar o pre-procesar** estos datos para hacerlos más predecibles y fáciles de consumir.

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