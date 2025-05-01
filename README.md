# Proyecto Demo de Web Services

Este proyecto demuestra la comunicación remota entre dos máquinas (una física y otra virtual) usando Web Servies (AJAX + JSON-RPC).
Incluye el código fuente, las instrucciones para montarlo, y la documentación sobre el tema.

---

## Estructura del proyecto

practica-ssdd/
├── codigo/ # Fuentes de código para el servidor y el cliente
├── docs/ # Documentación e investigación
├── ejecutables/ # Archivos compilados
├── vm-setup/ # Guía para montar la VM y la red
├── README.md # Este archivo

---

## Tecnologías usadas

- Python
- Flask
- APIs REST
- VirtualBox

---

## Ejecutar la demo

Se necesitarán:

- Una máquina física (host)
- Una máquina virtual (guest) con Python instalado

1. Ejecuta el **servidor** en una máquina:

```
cd code/server
python3 app.py
```

2. Ejecuta el cliente en la otra máquina:

```
cd code/client
python3 call.py
```

3. El cliente debería enviar una petición remota y recibir el resultado
