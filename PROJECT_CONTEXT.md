# Resumen del Proyecto: Sol & Cielo CRM

Este documento proporciona una visión general del contexto, la arquitectura y los componentes clave del proyecto CRM desarrollado para Sol & Cielo S.A.S.

## 1. Stack Tecnológico

El proyecto está construido sobre un stack moderno de JavaScript y TypeScript, aprovechando las mejores prácticas del ecosistema de React.

- **Framework Principal:** [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Librería de UI:** [React](https://react.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [ShadCN/UI](https://ui.shadcn.com/)
- **Gráficos y Visualización:** [Recharts](https://recharts.org/) y [ECharts for React](https://github.com/hustcc/echarts-for-react)
- **Gestión de Formularios:** [React Hook Form](https://react-hook-form.com/)
- **Validación de Esquemas:** [Zod](https://zod.dev/)
- **Funcionalidades de IA:** [Genkit](https://firebase.google.com/docs/genkit) (para futuras integraciones de IA)
- **Iconos:** [Lucide React](https://lucide.dev/)

---

## 2. Estructura de Páginas y Funcionalidades

La aplicación se organiza en varias secciones principales, cada una con una funcionalidad específica.

### Dashboard (`/`)
- **Propósito:** Ofrecer una vista general del rendimiento del negocio.
- **Componentes Clave:**
    - `KpiCard`: Muestra indicadores clave de rendimiento (Nuevos Leads, Ingresos, etc.).
    - `SalesAnalyticsChart`: Gráfico de área que muestra la evolución de los ingresos.
    - `LeadFunnelStats`: Visualización del embudo de ventas.
    - `RecentActivity` y `RecentContracts`: Listas de eventos y contratos recientes.

### Leads (`/leads`)
- **Propósito:** Gestión completa del ciclo de vida de los leads.
- **Funcionalidades:**
    - Listado de leads con tarjetas interactivas (`LeadCard`).
    - Búsqueda por nombre o teléfono.
    - Filtros por etapa y fecha (`LeadFilterSheet`).
    - Creación de nuevos leads (`NewLeadForm`).
    - Importación de leads desde archivos CSV/Excel (`ImportLeadsSheet`).
    - Panel de detalle (`LeadDetailPanel`) para gestionar un lead específico, avanzar en las etapas y rellenar formularios (`StageForm`).

### Usuarios (`/users`)
- **Propósito:** Administrar los miembros del equipo, sus roles y permisos.
- **Funcionalidades:**
    - Visualización de usuarios en tarjetas (`UserCard`).
    - Filtros por rol y estado.
    - Creación y edición de usuarios a través de un modal (`UserModalForm`).
    - Panel de detalle (`UserDetailPanel`) con estadísticas de rendimiento individuales.

### Reportes (`/reportes`)
- **Propósito:** Análisis y visualización de datos de rendimiento.
- **Funcionalidades:**
    - Barra de filtros por fecha, sede y asesor.
    - Visualización de KPIs.
    - Múltiples gráficos: `BarChartCard`, `LineChartCard`, `PieChartCard`, `AreaChartCard`.
    - `ReportTable`: Una tabla detallada para desglosar los datos.
    - Estado vacío (`EmptyState`) cuando no hay datos.

### Indicadores (`/indicadores`)
- **Propósito:** Dashboard enfocado en métricas de rendimiento específicas.
- **Funcionalidades:**
    - Filtro por sede.
    - Grid de gráficos personalizado:
        - `EchartsGaugeChart`: Tiempo promedio de respuesta (usando ECharts).
        - `OffersChart`: Ofertas presentadas vs. vencidas.
        - `RejectionReasonChart`: Gráfico de anillo con los motivos de rechazo.
        - `SalesByCityChart`: Gráfico de área que muestra las ventas por ciudad.

### Otros
- **Facturas (`/invoices`):** Es un marcador de posición en la navegación, sin funcionalidad implementada actualmente.

---

## 3. Estructura del Código

El código fuente está organizado de manera modular para facilitar el mantenimiento y la escalabilidad.

- **`src/app/`**: Contiene las rutas y páginas principales de la aplicación.
- **`src/components/`**: Alberga todos los componentes de React, organizados en subdirectorios por funcionalidad (e.g., `dashboard`, `leads`, `users`, `ui`).
    - **`src/components/ui/`**: Componentes base de ShadCN/UI.
- **`src/lib/`**: Contiene la lógica auxiliar, utilidades y datos.
    - **`src/lib/data/`**: Archivos que exportan datos estáticos o de ejemplo para alimentar los componentes (e.g., `leads-data.ts`, `users-data.ts`).
    - **`src/lib/utils.ts`**: Funciones de utilidad, como la función `cn` para combinar clases de Tailwind.
- **`src/hooks/`**: Hooks personalizados de React (e.g., `useToast`, `useMobile`).
- **`src/ai/`**: Preparado para la lógica de Inteligencia Artificial con Genkit.

---

## 4. Flujo de Datos y Estado

- **Estado Local:** La mayoría del estado se gestiona localmente en los componentes de página (`useState`, `useMemo`) para mantener la simplicidad.
- **Datos Estáticos:** Los datos de ejemplo (leads, usuarios, KPIs) se importan directamente desde los archivos en `src/lib/data/`. En una aplicación de producción, esto sería reemplazado por llamadas a una API o base de datos.
- **Interacción entre Componentes:** La comunicación se realiza principalmente a través de *props* y *callbacks*. Por ejemplo, la página de `Leads` pasa funciones a `LeadCard` y `LeadDetailPanel` para manejar eventos como la selección o actualización de un lead.
