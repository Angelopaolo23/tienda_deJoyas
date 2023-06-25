# Tienda de Joyas - Desafio 5 Diseño avanzado de una API REST modulo Backend con Node y Express

Este desafio consiste en la creacion de una API REST con dos Endpoints de metodos GET que retornan informacion de una base de datos de Joyas como aros, collares o anillos, ademas de sus respectivos precios, stocks, metales y categoria, ademas de su nombre.

Esta aplicacion debe permitir configurar la disposicion de la informacion a traves de:
1.- Límite de recursos
2.- Filtro de recursos por campos
3.- Paginación
4.- Ordenamiento
5.- Estructura de datos HATEOAS

## Installation

Install tienda_deJoyas with npm

```bash
  cd tienda_deJoyas
  npm install
  execute dbScript.sql
  npm run dev
```

## Authors

- [@angelopaolo23] - https://github.com/Angelopaolo23

## API Reference

#### Get all items

```http
  GET /joyas
```

| Parameter  | Type      | Description                                                                      |
| :--------- | :-------- | :------------------------------------------------------------------------------- |
| `limits`   | `Integer` | **Optional**. Limit the quantity of returned elements.                           |
| `page`     | `Integer` | **Optional**. Select the page number of your interest.                           |
| `order_by` | `String`  | **Optional**. Order elements by stock or precio, ASC or DESC, example stock_ASC. |

Example: localhost:3000/joyas?limits=3&page=2&order_by=stock_ASC

#### Get item

```http
  GET /joyas/filtros/
```

| Parameter    | Type      | Description                                                  |
| :----------- | :-------- | :----------------------------------------------------------- |
| `precio_min` | `Integer` | **Optional**. Select the minimun price of returned elements. |
| `precio_max` | `Integer` | **Optional**. Select the maximum price of returned elements. |
| `categoria`  | `String`  | **Optional**. Select among aros, collar or anillo.           |
| `metal`      | `String`  | **Optional**. Select among oro or plata.                     |

Example: localhost:3000/joyas/ﬁltros?precio_min=25000&precio_max=30000&categoria =aros&metal=plata

## Tech Stack

**Database:** PostgreSQL, PG y PG-FORMAT package for node.

**Server:** Node, Express, Joi package for data validation.
