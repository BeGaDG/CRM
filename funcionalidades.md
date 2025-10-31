# Documento de Funcionalidades del CRM Sol & Cielo

Este documento describe en detalle las funcionalidades implementadas en cada una de las secciones principales del sistema CRM.

---

## 1. Dashboard (`/`)

El Dashboard es la página principal y ofrece una vista panorámica del estado del negocio en tiempo real.

- **Visualización de KPIs (Indicadores Clave de Rendimiento):**
  - **Tarjetas de KPI:** Muestra métricas esenciales como:
    - **Nuevos Leads del Mes:** Total de clientes potenciales generados.
    - **Ingresos del Mes:** Suma de los valores de los contratos cerrados.
    - **Tasa de Conversión:** Porcentaje de leads que se convierten en contratos.
    - **Facturas Pendientes:** Conteo de facturas que aún no han sido pagadas.
  - Cada tarjeta incluye una comparación porcentual con el período anterior (ej. "+15.2% vs mes anterior").

- **Análisis de Ventas:**
  - **Gráfico de Ingresos:** Un gráfico de área que muestra la evolución de los ingresos por contratos a lo largo de los últimos meses, permitiendo identificar tendencias.

- **Embudo de Ventas (Lead Funnel):**
  - Visualiza el estado actual del pipeline de ventas, mostrando cuántos leads hay en cada etapa clave del proceso (Nuevos, Por Cotizar, En Negociación, Ganados).

- **Actividad Reciente:**
  - Muestra una lista cronológica de las últimas acciones importantes en el sistema, como la creación de un nuevo lead, la firma de un contrato o la recepción de un pago.

- **Contratos Recientes:**
  - Presenta una tabla con los últimos contratos cerrados, detallando el cliente, el tipo de interés (Planta Solar, Comercializadora), la fecha y el valor del contrato.

---

## 2. Gestión de Leads (`/leads`)

Esta es la sección central para la gestión del ciclo de vida de los clientes potenciales.

- **Listado y Visualización:**
  - Los leads se muestran en formato de tarjetas (`LeadCard`) interactivas.
  - Cada tarjeta resume la información clave: nombre, asesor asignado, teléfono, estado y tipo de interés.
  - Un indicador visual resalta los leads que no han sido contactados en más de 2 días.

- **Búsqueda y Filtros:**
  - **Búsqueda Rápida:** Permite buscar leads por nombre o número de teléfono.
  - **Filtro por Etapa:** Se puede filtrar la lista para ver solo los leads de una etapa específica (Nuevo, Por Visitar, Por Cotizar, etc.), con un contador de cuántos leads hay en cada una.
  - **Filtros Avanzados:** Un panel lateral (`LeadFilterSheet`) permite refinar la búsqueda por:
    - Rango de fechas de creación.
    - Tipo de interés (Planta Solar, Comercializadora).
    - Ciudad.

- **Creación e Importación:**
  - **Nuevo Lead:** Un formulario (`NewLeadForm`) permite crear un lead manualmente introduciendo sus datos básicos.
  - **Importación Masiva:** Permite importar leads desde un archivo CSV o Excel (`ImportLeadsSheet`), facilitando la carga de grandes volúmenes de datos. Se proporciona una plantilla para asegurar el formato correcto.

- **Panel de Detalle del Lead (`LeadDetailPanel`):**
  - Al hacer clic en una tarjeta, se abre un panel lateral con toda la información del lead.
  - **Resumen:** Muestra datos de contacto, fuente, tipo de interés y estado actual.
  - **Asignación de Asesor:** Permite cambiar o asignar un asesor comercial al lead.
  - **Gestión de Etapas:**
    - Sugiere el próximo paso lógico en el embudo de ventas.
    - Permite mover el lead a la siguiente etapa con un solo clic o cambiarlo manualmente a cualquier otra.
  - **Formularios por Etapa:**
    - Contiene un acordeón con formularios específicos para cada fase del proceso (`StageForm`).
    - El asesor puede rellenar información relevante según la etapa en la que se encuentre el lead (ej. datos para cotizar, información de la visita, motivo de rechazo, etc.).
    - La información se guarda y se puede consultar en el resumen del lead.
  - **Historial de Actividad:** Muestra un registro de todas las acciones y cambios relacionados con el lead.

---

## 3. Gestión de Usuarios (`/users`)

Módulo para la administración de los miembros del equipo.

- **Visualización de Usuarios:**
  - Los usuarios se muestran en tarjetas (`UserCard`) con su foto, nombre, rol y estado (activo/inactivo).
  - Muestra los permisos principales de cada usuario a través de iconos.

- **Filtros y Búsqueda:**
  - Permite buscar usuarios por nombre o correo.
  - Permite filtrar la lista por rol (Comercial, Supervisor, etc.) o por estado (Activo, Inactivo).

- **Creación y Edición:**
  - Un formulario modal (`UserModalForm`) permite:
    - Crear un nuevo usuario, asignándole nombre, correo, rol, sede y estado.
    - Editar la información de un usuario existente.
    - Cambiar la foto de perfil.

- **Panel de Detalle del Usuario (`UserDetailPanel`):**
  - Al seleccionar un usuario, se abre un panel con información detallada:
    - **Perfil:** Muestra rol, sede, estado y fecha del último acceso.
    - **Rendimiento:** Presenta estadísticas clave del rendimiento del usuario, como leads asignados, contratos cerrados, tasa de conversión y ventas totales. Incluye gráficos para visualizar su embudo de ventas.
    - **Configuración:** Permite realizar acciones administrativas como resetear la contraseña o desactivar la cuenta.

---

## 4. Reportes y Análisis (`/reportes`)

Página dedicada a la visualización y análisis de datos agregados del rendimiento del negocio.

- **Filtros Globales:**
  - Una barra de filtros (`FilterBar`) permite segmentar todos los reportes de la página por:
    - Rango de fechas.
    - Sede.
    - Asesor comercial.

- **Visualizaciones de Datos:**
  - **KPIs Principales:** Tarjetas que resumen el rendimiento según los filtros aplicados.
  - **Gráficos Múltiples:**
    - `BarChartCard`: Leads por etapa del embudo.
    - `LineChartCard`: Evolución de leads convertidos vs. descartados.
    - `PieChartCard`: Distribución de contratos por sede.
    - `AreaChartCard`: Facturación mensual acumulada.
  - **Tabla Detallada (`ReportTable`):** Desglosa los datos de los leads filtrados en una tabla con información de cliente, asesor, sede, estado y valor.
  - **Insights Automáticos:** Tarjetas que presentan conclusiones o tendencias detectadas en los datos (ej. "Mejor sede en conversión").

- **Exportación:**
  - Permite exportar el reporte generado (según los filtros) a un archivo.

---

## 5. Indicadores de Rendimiento (`/indicadores`)

Dashboard especializado en métricas operativas y de rendimiento específicas.

- **Filtro por Sede:**
  - Permite seleccionar una sede para visualizar sus indicadores correspondientes.

- **Grid de Gráficos Personalizado:**
  - **Tiempo de Respuesta:** Un gráfico de medidor (`EchartsGaugeChart`) muestra el tiempo promedio de respuesta a nuevos leads.
  - **Ofertas Presentadas vs. Vencidas:** Un gráfico de barras (`OffersChart`) compara el número de ofertas comerciales enviadas contra las que han expirado.
  - **Motivo de Rechazo:** Un gráfico de anillo (`RejectionReasonChart`) desglosa los motivos por los cuales los leads no se convierten en clientes.
  - **Ventas por Ciudad:** Un gráfico de área (`SalesByCityChart`) muestra la evolución de las ventas en diferentes ciudades.
