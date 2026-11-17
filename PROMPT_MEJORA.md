# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/domain/services/order.service.ts` — La pieza p1 (Validación de datos de entrada y registro de pedidos, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/infrastructure/controllers/order.controller.ts` — La pieza p2 (Manejo de solicitudes HTTP y respuestas, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/domain/services/order-state.validator.ts` — La pieza p7 (Validación de transiciones de estado, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/domain/services/order.service.ts` — `OrderStatus.toLowerCase`: Se invoca `toLowerCase` sobre `OrderStatus`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install --no-audit --no-fund && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
API que registra pedidos y emite notificaciones de cambio de estado

### Reto
- Tema: Notificaciones de pedidos
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de API para registro y notificación de pedidos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Registro de pedidos — objetivo: Implementar la funcionalidad para registrar un nuevo pedido con validación de estado y cliente. — entregable (NO resolver): API que permite registrar un nuevo pedido con validación de estado y cliente.
- Fase 2: Notificación de cambio de estado — objetivo: Implementar la funcionalidad para emitir una notificación cuando el estado de un pedido cambia. — entregable (NO resolver): API que emite una notificación cuando el estado de un pedido cambia.
- Fase 3: Optimización y refactorización — objetivo: Optimizar y refactorizar el código para mejorar la eficiencia y mantenibilidad. — entregable (NO resolver): Código optimizado y refactorizado para la API de registro y notificación de pedidos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: src/domain/models/order.model.ts ===
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum OrderStatus {
  PENDING = 'pendiente',
  PROCESSING = 'procesando',
  SHIPPED = 'enviado',
  DELIVERED = 'entregado',
}

export class Order {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  constructor(id: string, status: OrderStatus, clientId: string, description: string) {
    this.id = id;
    this.status = status;
    this.clientId = clientId;
    this.description = description;
  }

  changeStatus(newStatus: OrderStatus): void {
    if (!Object.values(OrderStatus).includes(newStatus)) {
      throw new Error(`Estado no válido: ${newStatus}`);
    }
    this.status = newStatus;
  }
}

// === ARCHIVO: src/domain/ports/order.repository.ts ===
import { Order } from '../models/order.model';

export interface OrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  update(order: Order): Promise<Order>;
}

// === ARCHIVO: src/domain/ports/client.service.ts ===
export interface ClientService {
  exists(clientId: string): Promise<boolean>;
}

// === ARCHIVO: src/domain/ports/notification.service.ts ===
import { Order } from '../models/order.model';

export interface NotificationService {
  notify(order: Order, message: string): Promise<void>;
}

// === ARCHIVO: src/domain/services/order.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../models/order.model';
import { OrderRepository } from '../ports/order.repository';
import { ClientService } from '../ports/client.service';
import { NotificationService } from '../ports/notification.service';
import { OrderStateValidator } from './order-state.validator';

export interface OrderData {
  clientId: string;
  description: string;
  status?: OrderStatus;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clientService: ClientService,
    private readonly notificationService: NotificationService,
    private readonly orderStateValidator: OrderStateValidator,
  ) {}

  async register(orderData: OrderData): Promise<Order> {
    throw new Error('TODO(reto): register');
  }

  validateOrderData(orderData: OrderData): void {
    throw new Error('TODO(reto): validateOrderData');
  }

  private isValidStatus(status: OrderStatus): boolean {
    return Object.values(OrderStatus).includes(status);
  }

  async transition(orderId: string, newState: string): Promise<Order> {
    throw new Error('TODO(reto): transition');
  }

  validateTransition(orderId: string, newState: string): void {
    throw new Error('TODO(reto): validateTransition');
  }

  private stringToStatus(status: string): OrderStatus {
    const statusMap: Record<string, OrderStatus> = {
      pendiente: OrderStatus.PENDING,
      procesando: OrderStatus.PROCESSING,
      enviado: OrderStatus.SHIPPED,
      entregado: OrderStatus.DELIVERED,
    };
    return statusMap[status.toLowerCase()] || OrderStatus.PENDING;
  }

  private generateId(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}

// === ARCHIVO: src/infrastructure/controllers/order.controller.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Post, Put, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { OrderService, OrderData } from '../../domain/services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async register(@Body() body: OrderData, @Res() res: Response): Promise<void> {
    throw new Error('TODO(reto): Post');
  }

  @Put(':id/transition')
  async transition(
    @Param('id') orderId: string,
    @Body() body: { newState: string },
    @Res() res: Response,
  ): Promise<void> {
    throw new Error('TODO(reto): Res');
  }
}

// === ARCHIVO: src/domain/services/order-state.validator.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderStatus } from '../models/order.model';

@Injectable()
export class OrderStateValidator {
  private readonly validTransitions: Map<string, string[]> = new Map([
    [OrderStatus.PENDING, [OrderStatus.PROCESSING]],
    [OrderStatus.PROCESSING, [OrderStatus.SHIPPED]],
    [OrderStatus.SHIPPED, [OrderStatus.DELIVERED]],
    [OrderStatus.DELIVERED, []],
  ]);

  validate(currentState: string, newState: string): boolean {
    throw new Error('TODO(reto): validate');
  }
}

// === ARCHIVO: src/test/unit/order.service.spec.ts ===
import { OrderService, OrderData } from '../../domain/services/order.service';
import { OrderRepository } from '../../domain/ports/order.repository';
import { ClientService } from '../../domain/ports/client.service';
import { NotificationService } from '../../domain/ports/notification.service';
import { OrderStateValidator } from '../../domain/services/order-state.validator';
import { Order, OrderStatus } from '../../domain/models/order.model';

describe('OrderService - Registro de pedidos (f1)', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let mockClientService: jest.Mocked<ClientService>;
  let mockNotificationService: jest.Mocked<NotificationService>;
  let mockOrderStateValidator: jest.Mocked<OrderStateValidator>;

  beforeEach(() => {
    mockOrderRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    mockClientService = {
      exists: jest.fn(),
    };

    mockNotificationService = {
      notify: jest.fn(),
    };

    mockOrderStateValidator = {
      getValidTransitions: jest.fn(),
    };

    orderService = new OrderService(
      mockOrderRepository,
      mockClientService,
      mockNotificationService,
      mockOrderStateValidator,
    );
  });

  describe('Registro exitoso de pedido', () => {
    it('debe registrar un pedido y devolver el pedido creado', async () => {
      const orderData: OrderData = {
        clientId: 'client-123',
        description: 'Pedido de prueba',
        status: OrderStatus.PENDING,
      };

      const expectedOrder = new Order(
        'ORD-123',
        OrderStatus.PENDING,
        'client-123',
        'Pedido de prueba',
      );

      mockClientService.exists.mockResolvedValue(true);
      mockOrderRepository.save.mockResolvedValue(expectedOrder);

      const result = await orderService.register(orderData);

      expect(mockClientService.exists).toHaveBeenCalledWith('client-123');
      expect(mockOrderRepository.save).toHaveBeenCalled();
      expect(result).toEqual(expectedOrder);
    });
  });

  describe('Error por estado inválido', () => {
    it('debe devolver un error indicando que el estado es inválido', async () => {
      const orderData: OrderData = {
        clientId: 'client-123',
        description: 'Pedido de prueba',
        status: 'INVALID_STATUS' as any,
      };

      await expect(orderService.register(orderData)).rejects.toThrow(
        'El estado del pedido es inválido',
      );
    });
  });

  describe('Error por cliente inexistente', () => {
    it('debe devolver un error indicando que el cliente no existe', async () => {
      const orderData: OrderData = {
        clientId: 'client-inexistente',
        description: 'Pedido de prueba',
      };

      mockClientService.exists.mockResolvedValue(false);

      await expect(orderService.register(orderData)).rejects.toThrow(
        'El cliente no existe',
      );
    });
  });

  describe('Error por datos incompletos', () => {
    it('debe devolver un error indicando que los datos son incompletos', async () => {
      const orderData: OrderData = {
        clientId: '',
        description: '',
      };

      await expect(orderService.register(orderData)).rejects.toThrow(
        'Los datos del pedido están incompletos',
      );
    });
  });
});

// === ARCHIVO: src/acceptance/f2.test.ts ===
import { OrderService } from '../domain/services/order.service';
import { OrderRepository } from '../domain/ports/order.repository';
import { ClientService } from '../domain/ports/client.service';
import { NotificationService } from '../domain/ports/notification.service';
import { OrderStateValidator } from '../domain/services/order-state.validator';
import { Order, OrderStatus } from '../domain/models/order.model';

describe('OrderService - Transición de estados (f2)', () => {
  let orderService: OrderService;
  let mockOrderRepository: jest.Mocked<OrderRepository>;
  let mockClientService: jest.Mocked<ClientService>;
  let mockNotificationService: jest.Mocked<NotificationService>;
  let mockOrderStateValidator: jest.Mocked<OrderStateValidator>;

  beforeEach(() => {
    mockOrderRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    mockClientService = {
      exists: jest.fn(),
    };

    mockNotificationService = {
      notify: jest.fn(),
    };

    mockOrderStateValidator = {
      getValidTransitions: jest.fn(),
    };

    orderService = new OrderService(
      mockOrderRepository,
      mockClientService,
      mockNotificationService,
      mockOrderStateValidator,
    );
  });

  describe('Transición exitosa de estado', () => {
    it('debe actualizar el estado del pedido y emitir una notificación', async () => {
      const existingOrder = new Order(
        'ORD-123',
        OrderStatus.PENDING,
        'client-123',
        'Pedido de prueba',
      );

      const updatedOrder = new Order(
        'ORD-123',
        OrderStatus.PROCESSING,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderStateValidator.getValidTransitions.mockReturnValue(['procesando', 'enviado']);
      mockOrderRepository.update.mockResolvedValue(updatedOrder);
      mockNotificationService.notify.mockResolvedValue();

      const result = await orderService.transition('ORD-123', 'procesando');

      expect(mockOrderRepository.findById).toHaveBeenCalledWith('ORD-123');
      expect(mockOrderStateValidator.getValidTransitions).toHaveBeenCalledWith(OrderStatus.PENDING);
      expect(mockOrderRepository.update).toHaveBeenCalled();
      expect(mockNotificationService.notify).toHaveBeenCalledWith(
        updatedOrder,
        'El pedido ha cambiado a estado: procesando',
      );
      expect(result.status).toBe(OrderStatus.PROCESSING);
    });
  });

  describe('Error por transición inválida', () => {
    it('debe devolver un error indicando que la transición es inválida', async () => {
      const existingOrder = new Order(
        'ORD-123',
        OrderStatus.DELIVERED,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderStateValidator.getValidTransitions.mockReturnValue([]);

      await expect(orderService.transition('ORD-123', 'pendiente')).rejects.toThrow(
        'La transición de estado es inválida',
      );
    });
  });

  describe('Error por pedido inexistente', () => {
    it('debe devolver un error indicando que el pedido no existe', async () => {
      mockOrderRepository.findById.mockResolvedValue(null);

      await expect(orderService.transition('ORD-inexistente', 'procesando')).rejects.toThrow(
        'El pedido no existe',
      );
    });
  });

  describe('Error al emitir notificación', () => {
    it('debe devolver un error indicando que no se pudo emitir la notificación', async () => {
      const existingOrder = new Order(
        'ORD-123',
        OrderStatus.PENDING,
        'client-123',
        'Pedido de prueba',
      );

      const updatedOrder = new Order(
        'ORD-123',
        OrderStatus.PROCESSING,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderRepository.findById.mockResolvedValue(existingOrder);
      mockOrderStateValidator.getValidTransitions.mockReturnValue(['procesando', 'enviado']);
      mockOrderRepository.update.mockResolvedValue(updatedOrder);
      mockNotificationService.notify.mockRejectedValue(new Error('Error de notificación'));

      await expect(orderService.transition('ORD-123', 'procesando')).rejects.toThrow(
        'No se pudo emitir la notificación',
      );
    });
  });
});

describe('OrderController - Transición de estados (f2)', () => {
  let orderController: any;
  let mockOrderService: any;
  let mockResponse: any;

  beforeEach(() => {
    mockOrderService = {
      register: jest.fn(),
      transition: jest.fn(),
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const { OrderController } = require('../infrastructure/controllers/order.controller');
    orderController = new OrderController(mockOrderService);
  });

  describe('Respuesta exitosa para transición de estado', () => {
    it('debe devolver una respuesta HTTP 200 con el pedido actualizado', async () => {
      const updatedOrder = new Order(
        'ORD-123',
        OrderStatus.PROCESSING,
        'client-123',
        'Pedido de prueba',
      );

      mockOrderService.transition.mockResolvedValue(updatedOrder);

      await orderController.transition('ORD-123', { newState: 'procesando' }, mockResponse);

      expect(mockOrderService.transition).toHaveBeenCalledWith('ORD-123', 'procesando');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedOrder);
    });
  });

  describe('Respuesta de error para transición inválida', () => {
    it('debe devolver una respuesta HTTP 400 con mensaje de error', async () => {
      mockOrderService.transition.mockRejectedValue(new Error('La transición de estado es inválida'));

      await orderController.transition('ORD-123', { newState: 'invalid' }, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'La transición de estado es inválida' });
    });
  });

  describe('Respuesta de error para pedido inexistente', () => {
    it('debe devolver una respuesta HTTP 404 con mensaje de error', async () => {
      mockOrderService.transition.mockRejectedValue(new Error('El pedido no existe'));

      await orderController.transition('ORD-inexistente', { newState: 'procesando' }, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'El pedido no existe' });
    });
  });
});

// === ARCHIVO: src/acceptance/f3.test.ts ===
import { OrderStateValidator } from '../domain/services/order-state.validator';
import { OrderStatus } from '../domain/models/order.model';

describe('Fase 3 - Validación de transiciones de estado', () => {
  let validator: OrderStateValidator;

  beforeEach(() => {
    validator = new OrderStateValidator();
  });

  describe('Transición válida', () => {
    it('debe devolver true para transición de pendiente a procesando', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.PROCESSING);
      expect(result).toBe(true);
    });

    it('debe devolver true para transición de procesando a enviado', () => {
      const result = validator.validate(OrderStatus.PROCESSING, OrderStatus.SHIPPED);
      expect(result).toBe(true);
    });

    it('debe devolver true para transición de enviado a entregado', () => {
      const result = validator.validate(OrderStatus.SHIPPED, OrderStatus.DELIVERED);
      expect(result).toBe(true);
    });
  });

  describe('Transición inválida', () => {
    it('debe devolver false para transición de pendiente a enviado', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.SHIPPED);
      expect(result).toBe(false);
    });

    it('debe devolver false para transición de pendiente a entregado', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.DELIVERED);
      expect(result).toBe(false);
    });

    it('debe devolver false para transición de procesando a entregado', () => {
      const result = validator.validate(OrderStatus.PROCESSING, OrderStatus.DELIVERED);
      expect(result).toBe(false);
    });

    it('debe devolver false para transición de enviado a pendiente', () => {
      const result = validator.validate(OrderStatus.SHIPPED, OrderStatus.PENDING);
      expect(result).toBe(false);
    });

    it('debe devolver false para estado actual desconocido', () => {
      const result = validator.validate('estado-desconocido', OrderStatus.PROCESSING);
      expect(result).toBe(false);
    });
  });

  describe('Transición a mismo estado', () => {
    it('debe devolver false cuando el estado actual y nuevo son pendiente', () => {
      const result = validator.validate(OrderStatus.PENDING, OrderStatus.PENDING);
      expect(result).toBe(false);
    });

    it('debe devolver false cuando el estado actual y nuevo son procesando', () => {
      const result = validator.validate(OrderStatus.PROCESSING, OrderStatus.PROCESSING);
      expect(result).toBe(false);
    });

    it('debe devolver false cuando el estado actual y nuevo son enviado', () => {
      const result = validator.validate(OrderStatus.SHIPPED, OrderStatus.SHIPPED);
      expect(result).toBe(false);
    });

    it('debe devolver false cuando el estado actual y nuevo son entregado', () => {
      const result = validator.validate(OrderStatus.DELIVERED, OrderStatus.DELIVERED);
      expect(result).toBe(false);
    });
  });
});

// === ARCHIVO: src/infrastructure/repositories/order.repository.ts ===
import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/ports/order.repository';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<string, Order> = new Map();

  async save(order: Order): Promise<Order> {
    this.orders.set(order.id, order);
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  async update(order: Order): Promise<Order> {
    if (!this.orders.has(order.id)) {
      throw new Error(`Order with id ${order.id} not found`);
    }
    this.orders.set(order.id, order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async findByClientId(clientId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.clientId === clientId,
    );
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.status === status,
    );
  }

  async delete(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.orders.has(id);
  }
}

// === ARCHIVO: src/infrastructure/config/app.module.ts ===
import { Module } from '@nestjs/common';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../../domain/services/order.service';
import { InMemoryOrderRepository } from '../repositories/order.repository';
import { ClientService } from '../../domain/ports/client.service';
import { NotificationService } from '../../domain/ports/notification.service';
import { OrderStateValidator } from '../../domain/services/order-state.validator';

export const CLIENT_SERVICE_TOKEN = 'ClientService';
export const NOTIFICATION_SERVICE_TOKEN = 'NotificationService';

class MockClientService implements ClientService {
  private readonly validClients: Set<string> = new Set(['client-1', 'client-2', 'client-3']);

  async exists(clientId: string): Promise<boolean> {
    return this.validClients.has(clientId);
  }
}

class MockNotificationService implements NotificationService {
  private readonly notifications: Array<{ orderId: string; message: string }> = [];

  async notify(order: any, message: string): Promise<void> {
    this.notifications.push({ orderId: order.id, message });
    console.log(`Notification sent for order ${order.id}: ${message}`);
  }

  getNotifications(): Array<{ orderId: string; message: string }> {
    return this.notifications;
  }
}

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    InMemoryOrderRepository,
    OrderStateValidator,
    {
      provide: CLIENT_SERVICE_TOKEN,
      useClass: MockClientService,
    },
    {
      provide: NOTIFICATION_SERVICE_TOKEN,
      useClass: MockNotificationService,
    },
  ],
  exports: [
    CLIENT_SERVICE_TOKEN,
    NOTIFICATION_SERVICE_TOKEN,
  ],
})
export class AppModule {}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/config/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

// === ARCHIVO: src/infrastructure/common/filters/http-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || exception.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: Array.isArray(message) ? message : [message],
    });
  }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof Error ? exception.message : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: [message],
    });
  }
}
```
