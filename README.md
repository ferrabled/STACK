The project is aimed to study and develop a tool that provides users with an asset management system using blockchain technology. 
To achieve this statement a single page application has been made with React, that will be able to perform transactions to various contracts writ-
ten in Solidity. Those smart contracts will be deployed in an Ethereum testnet, finally obtaining a dApp, decentralized application.

The full paper can be found here: 

[STACK - Fernando Rabasco Ledesma](https://drive.google.com/file/d/1sIBtxPwQQymZDihbdmti7hUm-McP7396/view?usp=sharing)

## Deployment

Comenzamos instalando npm o en su defecto yarn para instalar las dependencias.

En este caso, estoy usando nvs para poder tratar con diferentes versiones de npm, ya que, para usar truffle (smart contract deployment) no me permitía usarlo con la versión 16.14 de node, por lo que cuento con dos versiones de node

![image](https://user-images.githubusercontent.com/48551658/166903683-92dd4131-10ea-49ee-9301-c79e45e419ca.png)

16.14 para usar npm con react y 14.19 para usarla con truffle.

**Con tan solo instalar la versión 14.19 basta para ambas partes**


Una vez contamos con node y npm procedemos a instalar Ganache (ganache nos permite crear una red blockchain local) desde el siguiente enlace
https://github.com/trufflesuite/ganache-ui/releases/tag/v2.6.0-beta.3
Para ello, descargamos el archivo con extensión .appx si nos encontramos en windows.



Procedemos a instalar truffle para poder desplegar nuestros smart contracts, para ello, 
`npm install -g truffle`


Una vez contemos con ambos programas abrimos Ganache para crear nuestra testnet local y pulsamos sobre new workspace ethereum. Podemos dejar los datos por defecto, pero tenemos que guardar la siguiente información:
- Port Number
- Network Id
- Hostname

 ![image](https://user-images.githubusercontent.com/48551658/166905326-4171ece6-1150-4219-b60f-212718fe8fdc.png)

Procedemos a abrir el archivo truffle-config.js dentro de la carpeta blockchain y colocamos la información que acabamos de obtener
![image](https://user-images.githubusercontent.com/48551658/166906085-43ca9e0f-7ec9-4e79-a5da-a0bc5cac2904.png)

Una vez tengamos la blockchain ejecutándose y hayamos indicado los datos correctamente, procedemos a deployear los contratos (este proceso solo se tiene que realizar la primera vez, para las siguientes, solo debemos de abrir Ganache y ejecutar nuestra testnet)

Abrimos cmd dentro de la carpeta blockchain y escribimos lo siguiente:

(Primero nos aseguramos de tener todas las dependencias y escribimos) `npm install`.

Luego procedemos a desplegar los contratos con:
`truffle migrate`

Si todo funciona, podremos ver que los contratos se han desplegado correctamente y nos indicará cuanto ETH nos ha costado desplegarlo.

Procedemos ahora a la ejecución del frontend, para ello, entramos en la carpeta frontend y escribimos 
`npm install` se instalarán las dependencias pertinentes y finalizamos con un `npm start`.

Esperamos y ya tendremos nuestra página desplegada.

Para finalizar, debemos conectar nuestra billetera metamask a la red de pruebas de ganache. 
Pulsamos sobre el icono superior con el nombre de la red y en Agregar Nueva red
![image](https://user-images.githubusercontent.com/48551658/166906970-3c10ab86-027a-4fd4-ab8c-867681380c16.png)

Introducimos los nuevos datos que obtuvimos anteriormente y finalizamos. Para obtener cuentas con ETH, podemos importar una nueva cuenta a metamask usando el mnemonic
que nos indica ganache en la pestaña accounts.






