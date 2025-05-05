# Proyecto Demo de Web Services

Este proyecto demuestra la comunicación remota entre dos máquinas (una física y otra virtual) usando Web Servies (REST API con JSON).
Incluye el código fuente, las instrucciones para montarlo, y la documentación sobre el tema.

---

## Estructura del proyecto

practica-ssdd/
├── codigo/ # Fuentes de código para el servidor y el cliente
├── docs/ # Documentación e investigación
├── ejemplos / # Archivos compilados
├── scripts / # Scripts de ayuda
├── README.md # Este archivo

---

## Instrucciones para ejecutar la demo

1. Iniciar el servidor en la VM
2. Abrir el cliente en la máquina host
3. Usar la interfaz para hacer llamadas remotas

---

## Instrucciones para preparar el proyecto

Se necesitarán:

- Una máquina física (host) con:

* Git
* Node.js (se recomienda tener una versión igual o posterior a la v14)
* VirtualBox
* Navegador web

- Una máquina virtual (guest) con:

* Servidor Ubuntu 20.04 LTS
* Node.js

1. Clona el repositorio

```git clone https://github.com/u1988492/practica-ssdd
cd practica-ssdd
```

2. Prepara la máquina virtual

- Instala VirtualBox
- Crea una nueva VM con un servidor Ubuntu
- Configura los ajustes de red para un adaptador host-only
- Instala Node.js en la VM

```
sudo apt update
sudo apt install nodejs npm
```

3. Configura el servidor (desde la VM)

- Copia el directorio del servidor a la VM
- Dentro del directorio del servidor:

```
npm install
npm start
```

- Apunta la IP de la VM (comando ip addr para verla)

4. Configura el cliente (desde el host)

- Actualiza el endpoint de la API en **client/js/config.js** con la IP de la VM
- Abre **client/index.html** en el navegador
