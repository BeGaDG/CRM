
import {
  Users,
  DollarSign,
  Percent,
  FileText,
  Contact,
  FileSignature,
  CheckCircle,
  ClipboardList
} from 'lucide-react';

export const kpis = [
  {
    title: 'Nuevos Leads (Mes)',
    value: '124',
    delta: '+15.2% vs mes anterior',
    deltaType: 'positive' as const,
    icon: <Users className="h-6 w-6 text-blue-500" />,
    color: 'bg-blue-500',
  },
  {
    title: 'Ingresos del Mes',
    value: '$45,231.89',
    delta: '+20.1% vs mes anterior',
    deltaType: 'positive' as const,
    icon: <DollarSign className="h-6 w-6 text-green-500" />,
    color: 'bg-green-500',
  },
  {
    title: 'Tasa de Conversión',
    value: '23.5%',
    delta: '-1.2% vs mes anterior',
    deltaType: 'negative' as const,
    icon: <Percent className="h-6 w-6 text-purple-500" />,
    color: 'bg-purple-500',
  },
   {
    title: 'Facturas Pendientes',
    value: '12',
    delta: '3 vencidas',
    deltaType: 'negative' as const,
    icon: <FileText className="h-6 w-6 text-orange-500" />,
    color: 'bg-orange-500',
  },
];

export const recentContracts = [
    {
        id: 'contract-1',
        customer: 'Constructora S.A.S',
        value: 120000000,
        type: 'Planta Solar',
        date: '2024-07-23',
    },
    {
        id: 'contract-2',
        customer: 'Inversiones XYZ',
        value: 15000000,
        type: 'Comercializadora',
        date: '2024-07-20',
    },
    {
        id: 'contract-3',
        customer: 'Tiendas La Rebaja',
        value: 85000000,
        type: 'Ambos',
        date: '2024-07-15',
    },
     {
        id: 'contract-4',
        customer: 'Hotel El Dorado',
        value: 250000000,
        type: 'Planta Solar',
        date: '2024-07-11',
    },
];

export const recentActivity = [
    {
        icon: <Contact className="h-4 w-4" />,
        bgColor: 'bg-blue-100 dark:bg-blue-900/50',
        textColor: 'text-blue-600 dark:text-blue-300',
        description: "Nuevo lead 'Colegio Moderno' fue creado.",
        time: "Hace 5m"
    },
     {
        icon: <FileSignature className="h-4 w-4" />,
        bgColor: 'bg-green-100 dark:bg-green-900/50',
        textColor: 'text-green-600 dark:text-green-300',
        description: "Contrato firmado con 'Constructora S.A.S'.",
        time: "Hace 2h"
    },
     {
        icon: <CheckCircle className="h-4 w-4" />,
        bgColor: 'bg-sky-100 dark:bg-sky-900/50',
        textColor: 'text-sky-600 dark:text-sky-300',
        description: "Pago de factura de 'Inversiones XYZ' recibido.",
        time: "Hace 8h"
    },
     {
        icon: <ClipboardList className="h-4 w-4" />,
        bgColor: 'bg-orange-100 dark:bg-orange-900/50',
        textColor: 'text-orange-600 dark:text-orange-300',
        description: "Nueva cotización enviada a 'Logística Total'.",
        time: "Ayer"
    }
];
