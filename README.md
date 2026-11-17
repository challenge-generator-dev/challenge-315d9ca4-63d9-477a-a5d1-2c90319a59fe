# Implementación de API para registro y notificación de pedidos

El sistema de comercio electrónico 'E-Shop' requiere una API que registre pedidos y emita notificaciones de cambio de estado. Los pedidos tienen un identificador único, un estado (pendiente, procesando, enviado, entregado), y un cliente asociado. La API debe validar que el estado del pedido sea uno de los permitidos y que el cliente exista. Cuando un pedido cambia de estado, se debe emitir una notificación al cliente. La notificación debe contener el identificador del pedido, el nuevo estado y una breve descripción del cambio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Notificaciones de pedidos |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Stack

- **Lenguaje:** TypeScript
- **Framework:** NestJS 10
- **Version:** Node 22

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `npm install --no-audit --no-fund && npm run build` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `npm install --no-audit --no-fund && npm run build`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Registro de pedidos

**Objetivo:** Implementar la funcionalidad para registrar un nuevo pedido con validación de estado y cliente.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Diseña y desarrolla la funcionalidad para registrar un nuevo pedido, asegurando que el estado y el cliente sean válidos.
- El pedido debe tener un identificador único, un estado válido y un cliente asociado.

**Entregable:** API que permite registrar un nuevo pedido con validación de estado y cliente.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar errores de validación.
- Piensa en cómo estructurar la información del pedido.

</details>

### Fase 2: Notificación de cambio de estado

**Objetivo:** Implementar la funcionalidad para emitir una notificación cuando el estado de un pedido cambia.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseña y desarrolla la funcionalidad para emitir una notificación cuando el estado de un pedido cambia.
- La notificación debe contener el identificador del pedido, el nuevo estado y una breve descripción del cambio.

**Entregable:** API que emite una notificación cuando el estado de un pedido cambia.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejarías la emisión de notificaciones en tiempo real.
- Piensa en cómo asegurarías que la notificación contenga toda la información necesaria.

</details>

### Fase 3: Optimización y refactorización

**Objetivo:** Optimizar y refactorizar el código para mejorar la eficiencia y mantenibilidad.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Refactorizar la pieza `OrderService` en `core` para extraer la lógica de validación de estados a una nueva pieza `OrderStateValidator` en `core`.
- Optimizar la pieza `NotificationService` en `outbound-adapter` para reducir la latencia en la emisión de notificaciones.
- Asegurar que los casos de aceptación de `OrderService` y `NotificationService` sigan pasando después de la refactorización.
- Verificar que las pruebas de `OrderStateValidator` cubran todos los estados válidos e inválidos.

**Entregable:** Código optimizado y refactorizado para la API de registro y notificación de pedidos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo podrías mejorar la eficiencia del código.
- Piensa en cómo podrías refactorizar el código para mejorar la mantenibilidad.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un pedido en el sistema E-Shop y cuáles son sus atributos?
- **paraQueSirve**: ¿Para qué sirve la notificación de cambio de estado en el sistema E-Shop?
- **comoSeUsa**: ¿Cómo se usa la API para registrar un nuevo pedido y emitir una notificación de cambio de estado?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al registrar un pedido o emitir una notificación de cambio de estado?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización y refactorización del código?

## Criterios de Evaluacion

- Implementación de la funcionalidad para registrar un nuevo pedido con validación de estado y cliente.
- Implementación de la funcionalidad para emitir una notificación cuando el estado de un pedido cambia.
- Optimización y refactorización del código para mejorar la eficiencia y mantenibilidad.

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

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install --no-audit --no-fund && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
