# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de API para registro y notificación de pedidos**.

| | |
|---|---|
| Tema | Notificaciones de pedidos |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | hexagonal/clean |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/common 10.4.22
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- class-transformer 0.5.1
- class-validator 0.15.1
- express 5.3.0
- reflect-metadata 0.2.2
- rxjs 7.8.2
- @types/express 4.17.25
- @types/node 22.20.5
- typescript 5.7.3
- jest 29.7.0
- ts-jest 29.2.5
- @types/jest 29.5.14

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install --no-audit --no-fund && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install --no-audit --no-fund && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Registro de pedidos**: API que permite registrar un nuevo pedido con validación de estado y cliente.
- **Fase 2 — Notificación de cambio de estado**: API que emite una notificación cuando el estado de un pedido cambia.
- **Fase 3 — Optimización y refactorización**: Código optimizado y refactorizado para la API de registro y notificación de pedidos.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `src/domain/services/order.service.ts` — La pieza p1 (Validación de datos de entrada y registro de pedidos, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/infrastructure/controllers/order.controller.ts` — La pieza p2 (Manejo de solicitudes HTTP y respuestas, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `src/domain/services/order-state.validator.ts` — La pieza p7 (Validación de transiciones de estado, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Registro de pedidos | Validación de datos de entrada y registro de pedidos | `src/domain/services/order.service.ts:OrderService.register` | La API permite registrar un nuevo pedido con validación de estado y cliente.; La API devuelve un error si el estado o cliente son inválidos. | — | — |
| f1 — Registro de pedidos | Manejo de solicitudes HTTP y respuestas | `src/infrastructure/controllers/order.controller.ts:OrderController.register` | La API permite registrar un nuevo pedido con validación de estado y cliente.; La API devuelve un error si el estado o cliente son inválidos. | — | — |
| f1 — Registro de pedidos | Pruebas unitarias para validación y registro de pedidos | — | La API permite registrar un nuevo pedido con validación de estado y cliente.; La API devuelve un error si el estado o cliente son inválidos. | — | — |
| f2 — Notificación de cambio de estado | Transición de estados y emisión de notificaciones | `src/domain/services/order.service.ts:OrderService.transition` | La API emite una notificación cuando el estado de un pedido cambia.; La API maneja errores al emitir notificaciones. | `src/acceptance/f2.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Notificación de cambio de estado | Emisión de notificaciones a un servicio externo | — | La API emite una notificación cuando el estado de un pedido cambia.; La API maneja errores al emitir notificaciones. | `src/acceptance/f2.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Notificación de cambio de estado | Manejo de solicitudes HTTP para transición de estados | `src/infrastructure/controllers/order.controller.ts:OrderController.transition` | La API emite una notificación cuando el estado de un pedido cambia.; La API maneja errores al emitir notificaciones. | `src/acceptance/f2.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f3 — Optimización y refactorización | Validación de transiciones de estado | `src/domain/services/order-state.validator.ts:OrderStateValidator.validate` | El código refactorizado mantiene la misma funcionalidad que antes.; Las pruebas de aceptación de las piezas refactorizadas pasan sin modificaciones. | `src/acceptance/f3.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f3.test.ts` |
| f3 — Optimización y refactorización | Optimización de emisión de notificaciones | — | El código refactorizado mantiene la misma funcionalidad que antes.; Las pruebas de aceptación de las piezas refactorizadas pasan sin modificaciones. | `src/acceptance/f3.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f3.test.ts` |

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Lo que falta y tenes que completar

### 1. Referencias colgando (1)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/domain/services/order.service.ts` — `OrderStatus.toLowerCase`
      Se invoca `toLowerCase` sobre `OrderStatus`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (16)

- `package.json`
- `tsconfig.json`
- `src/domain/models/order.model.ts`
- `src/domain/ports/order.repository.ts`
- `src/domain/ports/client.service.ts`
- `src/domain/ports/notification.service.ts`
- `src/domain/services/order.service.ts`
- `src/infrastructure/controllers/order.controller.ts`
- `src/domain/services/order-state.validator.ts`
- `src/test/unit/order.service.spec.ts`
- `src/acceptance/f2.test.ts`
- `src/acceptance/f3.test.ts`
- `src/infrastructure/repositories/order.repository.ts`
- `src/infrastructure/config/app.module.ts`
- `src/main.ts`
- `src/infrastructure/common/filters/http-exception.filter.ts`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `src/domain/models` (presente)
- `src/domain/ports` (presente)
- `src/domain/services` (presente)
- `src/application/services` (ausente)
- `src/infrastructure/controllers` (presente)
- `src/infrastructure/repositories` (presente)
- `src/infrastructure/clients` (ausente)
- `src/infrastructure/config` (presente)
- `test/unit` (ausente)

## Verificacion

```bash
npm install --no-audit --no-fund && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **hexagonal/clean**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: API que registra pedidos y emite notificaciones de cambio de estado

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
