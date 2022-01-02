## install scss

-> npm install node-sass

## En esta app se trabajara con react-router-dom v5.3.0

## Redux

```Implementación de redux```

Patrón o forma de trabajar, reducer es una funcion pura

Contenedor predecible del estado de nuestra aplicacion

forma de controlar donde esta la info en todo momento, modificacion en solo una via.

No es propio de react

Estado de la apolicacion independiente del framework

#Store Fuente unica de la verdad, super mercado que provee la información y se consume. COmponentes van al store traen info que necesitan para trabajar,

Reducer --> funcion pura que maneja un estado da la info a la vista para que esta la use, pero solo la lee, mas no la modifica, para ello hacemos un action al reducer para que el reducer genera un nuevo estado

Ahora con redux.

State dado por el store, cumple la misma info, view recibe la info y la usa, en el momento que se modifique el componente genera un action, pero este de manera inmediata no car al store para ser modificado si no que cae primero a una fase llamada dispatcher, aqui se recibe analiza y se envia a un reducer especial, es decir, combinacion de un monton de reducer, auth, todo, tareas, entradas, monton de reducer pequeños, el dispatcher le asigna la accion al reducer indicado y este la ejecuta y genera un nuevo state. Este proceso es sincrono, sin peticiones http, si se enecesitan asincronas, se usa antes un middleware del dispatcher, para que cuando se reciba la info del api, el middleware se lo encia al store y se envia al reducer especial

```Autenticación firestore, google sign in```
** npm install react-redux redux

** Después de crear el reducer se crea el store o fuente unica de información 

**Se provee el store a la parte superior de la app, tratando de dejar limpio index.js, entinces se envia JournalApp.js

// Para hacer uso de las dev tools de google mirar aqui:https://github.com/zalmoxisus/redux-devtools-extension#usage


```Instalación de firebase y firestore```

--> npm i firebase

```Creación de middleware para tareas asincronas```

mirar imagen adjunta, especialmente, para motivos de autenticación. Desde el middleware hace las peticiones asicnronas y luego las envia al dispatch pues  esta ultima recibe solo sincronas

```Instalar redux thunk```

middleware especializado, encargada 

#npm install redux-thunk#

```Validator```

npm i validator