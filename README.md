# PreEntrega2RamirezPB-TS

Segunda pre entrega del proyecto final del curso de Programación Backend de CoderHouse.

## Consigna

Deberás entregar [el proyecto que has venido armando](https://github.com/ianshalaga/Desafio5RamirezPB-TS), cambiando la persistencia en archivos a base de datos y agregando algunos **endpoints** nuevos a tu **ecommerce**.

- Contarás con **MongoDB** como sistema de persistencia principal.
- Tendrás definidos todos los **endpoints** para poder trabajar con productos y carritos.
- Profesionalizar las consultas de productos con filtros, paginación y ordenamientos.
- Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.
- Permitir comentarios en el archivo.
- La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia.
- Los nuevos **endpoints** deben seguir la misma estructura y lógica que hemos seguido.

Con base en nuestra implementación actual de **productos**, modificar el método **GET /** para que cumpla con los siguientes puntos:

- Deberá poder recibir por **query params** un **limit** (opcional), una **page** (opcional), un **sort** (opcional) y un **query** (opcional).

  - **limit** permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir **limit**, este será de **10**.
  - **page** permitirá devolver la página que queremos buscar, en caso de no recibir page, esta será de **1**.
  - **sort**: **asc** / **desc**, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir **sort**, no realizar ningún ordenamiento.
  - **query**, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar, **category** y/o **status**), en caso de no recibir query, realizar la búsqueda general.

- El método **GET /** deberá devolver un objeto con el siguiente formato:

```javascript
{
    status: success / error
    payload: resultado de los productos solicitados
    totalPages: total de páginas
    prevPage: página anterior
    nextPage: página siguiente
    page: página actual
    hasPrevPage: indicador para saber si la página previa existe
    hasNextPage: indicador para saber si la página siguiente existe.
    prevLink: link directo a la página previa (null si hasPrevPage=false)
    nextLink: link directo a la página siguiente (null si hasNextPage=false)
}

```

- Se deberá poder buscar productos por categoría (**category**) o por disponibilidad (**status**), y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.

Agregar al **router** de **carts** los siguientes **endpoints**:

- **DELETE api/carts/:cid/products/:pid** deberá eliminar del carrito el producto seleccionado.
- **PUT api/carts/:cid** deberá actualizar el carrito con un arreglo de productos.
- **PUT api/carts/:cid/products/:pid** deberá poder actualizar solo la cantidad de ejemplares del producto por cualquier cantidad pasada desde **req.body**.
- **DELETE api/carts/:cid** deberá eliminar todos los productos del carrito.
- Esta vez, para el modelo de **Carts**, en su propiedad **products**, el **id** de cada producto generado dentro del array tiene que hacer referencia al modelo de **Products**. Modificar la ruta **/:cid** para que al traer todos los productos, los traiga completos mediante un **populate**. De esta manera almacenamos solo el **id**, pero al solicitarlo podemos desglosar los productos asociados.

Crear una vista en el **router** de **views** con ruta **/products** para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:

- Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
- Contar con el botón de **Agregar al carrito** directamente, sin necesidad de abrir una página adicional con los detalles del producto.

Agregar una vista en la ruta **/carts/:cid** para visualizar un carrito específico, donde se deberán listar solo los productos que pertenezcan a dicho carrito.

## Entrega

Enlace al repositorio de **GitHub** con el proyecto completo, sin la carpeta de **node_modules**.

## dependencies

- `npm i express`

> **Express.js** es un **framework** minimalista y flexible para **Node.js** que simplifica el desarrollo de aplicaciones web y **APIs** al proporcionar características esenciales como enrutamiento, manejo de **middleware**, integración con motores de plantillas, gestión de errores, y más. Su enfoque modular y su extensibilidad permiten a los desarrolladores construir aplicaciones de manera rápida y eficiente, adaptándose a las necesidades específicas de sus proyectos. Express.js es ampliamente utilizado en la comunidad de **Node.js** debido a su facilidad de uso y su capacidad para construir aplicaciones web escalables y robustas.

- `npm i zod`

> **Zod** es una biblioteca de validación de datos para **TypeScript** y **JavaScript**. Proporciona una forma simple y robusta de definir esquemas de datos y validarlos en tiempo de ejecución. Permite definir fácilmente la estructura y restricciones de datos, y luego utilizar esos esquemas para validar entradas de usuario, datos de **API**, y más.

- `npm i express-handlebars`

> **Handlebars** es un motor de plantillas para **JavaScript** que permite generar **HTML** de forma dinámica al combinar datos con plantillas **HTML** predefinidas. Es especialmente útil en aplicaciones web para renderizar vistas del lado del servidor con datos dinámicos.

- `npm i socket.io`

> **Socket.io** es una biblioteca de **JavaScript** que permite la comunicación bidireccional en tiempo real entre clientes web y servidores. Proporciona una abstracción sobre **WebSockets** y otros mecanismos de transporte, lo que facilita el desarrollo de aplicaciones web en tiempo real.

- `npm i mongodb`

> Controlador oficial de **MongoDB** para **Node.js**, lo que permite a las aplicaciones **Node.js** interactuar con una base de datos **MongoDB**.

- `npm i dotenv`

> **Dotenv** es una biblioteca de **Node.js** que permite cargar variables de entorno desde un archivo **.env** en tu aplicación.

- `npm i mongoose`

> **Mongoose** es una biblioteca de modelado de objetos de **MongoDB** para **Node.js**. Proporciona una solución basada en esquemas para modelar datos de aplicaciones utilizando **MongoDB**, lo que facilita la interacción con la base de datos **MongoDB** desde una aplicación **Node.js**.

- `npm i mongoose-paginate-v2`

> **mongoose-paginate-v2** proporciona funcionalidades de paginación para consultas en **MongoDB** utilizando **Mongoose**.

## devDependencies

- `npm i nodemon -D`

> **Nodemon** reinicia automáticamente el servidor en cuanto detecta que hay cambios en el código.

- `npm i typescript -D` (Compilador de **TypeScript**)
- `npm i tsx -D` (Motor de ejecución de **TypeScript** para paquetes de tipo **module**)
- `npm i @types/node -D` (Definiciones de tipos de **TypeScript** para **Node.js**)
- `npm i @types/express -D` (Definiciones de tipos de **TypeScript** para **Express.js**)

> **TypeScript** dependencies.

- `npm i tailwindcss -D`
- `npm i @tailwindcss/forms -D` (Conjunto de estilos predefinidos diseñados específicamente para mejorar el aspecto y la funcionalidad de los formularios **HTML**)

> Styles: **TailwindCSS**

## package.json

Se ubica en el directorio raíz.

- `"type": "module"`

> El proyecto utiliza módulos **ECMAScript** (**ESM**) en lugar de **CommonJS** para la gestión de módulos en **Node.js**. Permite utilizar la sintaxis de importación (**import**) y exportación (**export**) de **ECMAScript** estándar en lugar de la sintaxis **require** y **module.exports** de **CommonJS**.

## nodemon.json

Se ubica en el directorio raíz.

```json
{
  "watch": ["src", "public"],
  "ext": "js ts handlebars",
  "exec": "npx tailwindcss -i ./public/css/tailwind.css -o ./public/css/app.css && tsx ./src/app.ts"
}
```

> Al ejecutar con **nodemon** se compila el **css** y se ejecuta la **app**.

## tsconfig.json

Se ubica en el directorio raíz. Se especifican las opciones de configuración para el compilador de **TypeScript**.

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "Node"
  }
}
```

> - **"esModuleInterop": true**: **TypeScript** interpreta las importaciones predeterminadas (**import express from 'express'**) como si fueran importaciones de asignación (**import \* as express from 'express'**). Permite una mayor compatibilidad en las importaciones entre los diferentes estilos de exportación de módulos.
> - **"module": "ESNext"**: especifica el formato de módulo que se utilizará en la salida del compilador de **TypeScript**. **ESNext** indica que se utilizará el formato de módulo **ECMAScript** más reciente compatible con el entorno de ejecución.
> - **"moduleResolution": "Node"**: especifica el método de resolución de módulos que **TypeScript** utilizará al importar módulos. **TypeScript** utilizará la resolución de módulos de **Node.js** siguiendo la estructura de carpetas y los archivos **node_modules** para buscar y resolver las dependencias de los módulos.

## Ejecución

- **Scripts**: `tsx script.ts`.
- **TailwindCSS**: `npx tailwindcss -i tailwind.css -o output.css`
- **Nodemon**: `nodemon --exec tsx script.ts`

## JSON Formatter

- [JSON Formatter](https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa)

> Extensión para navegadores basados en Chromium.
