# Panstiago App

Aplicación que permite realizar pedidos en una tienda virtual dedicada a la venta de bocadillos online.

El proyecto completo está formado por un servidor RESTful API desarrollado mediante NodeJS y Express. Para dar vida a la base de datos se ha utilizado MongoDB. El acceso a los diferentes recursos privados del servidor se lleva a cabo empleando TOKENS (Json Web Token). La interfaz de usuario se ha desarrollado empleando React.

### Características de la Aplicación

Se puede navegar por la aplicación sin registrarse/logearse, pero para poder efectuar el pedido, es necesario estar registrado correctamente en la aplicación.

Una vez el cliente se ha logeado y tiene un pedido preparado, puede acceder a la pasarela de pago (stripe) empleando los siguientes datos para la tarjeta de crédito.

| Número de la tarjeta | MM/AA | CVC |
| -------------------- | ----- | --- |
| 4242 4242 4242 4242  | 12/24 | 123 |
