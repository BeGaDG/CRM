
export const usersData = [
    {
        id: 'user-1',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@sol-cielo.com',
        role: 'Comercial',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-22T14:30:00Z',
        avatar: 'https://picsum.photos/seed/301/100/100',
        performance: {
            leadsCount: 45,
            contractsCount: 8,
            totalSales: 280000000,
        }
    },
    {
        id: 'user-2',
        name: 'Ana Gómez',
        email: 'ana.gomez@sol-cielo.com',
        role: 'Supervisor',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-22T16:05:00Z',
        avatar: 'https://picsum.photos/seed/302/100/100',
        performance: {
            leadsCount: 25,
            contractsCount: 5,
            totalSales: 150000000,
        }
    },
    {
        id: 'user-3',
        name: 'Luisa Fernández',
        email: 'luisa.fernandez@sol-cielo.com',
        role: 'Administrador',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-22T10:15:00Z',
        avatar: 'https://picsum.photos/seed/303/100/100',
        performance: {
            leadsCount: 10,
            contractsCount: 2,
            totalSales: 95000000,
        }
    },
    {
        id: 'user-4',
        name: 'Jorge Arias',
        email: 'jorge.arias@sol-cielo.com',
        role: 'Comercial',
        sede: 'Otros',
        status: false,
        last_login: '2024-06-15T11:00:00Z',
        avatar: 'https://picsum.photos/seed/304/100/100',
        performance: {
            leadsCount: 30,
            contractsCount: 3,
            totalSales: 120000000,
        }
    },
     {
        id: 'user-5',
        name: 'Maria Rodriguez',
        email: 'maria.rodriguez@sol-cielo.com',
        role: 'Contabilidad',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-21T09:00:00Z',
        avatar: 'https://picsum.photos/seed/305/100/100',
        performance: {
            leadsCount: 0,
            contractsCount: 0,
            totalSales: 0,
        }
    },
     {
        id: 'user-6',
        name: 'Pedro Pascal',
        email: 'pedro.pascal@sol-cielo.com',
        role: 'Operaciones',
        sede: 'Montería',
        status: true,
        last_login: '2024-07-23T08:00:00Z',
        avatar: 'https://picsum.photos/seed/306/100/100',
        performance: {
            leadsCount: 5,
            contractsCount: 1,
            totalSales: 40000000,
        }
    },
    {
        id: 'user-7',
        name: 'Sofia Vergara',
        email: 'sofia.vergara@sol-cielo.com',
        role: 'Comercial',
        sede: 'Sincelejo',
        status: true,
        last_login: '2024-07-23T09:30:00Z',
        avatar: 'https://picsum.photos/seed/307/100/100',
        performance: {
            leadsCount: 55,
            contractsCount: 12,
            totalSales: 450000000,
        }
    },
    {
        id: 'user-8',
        name: 'J Balvin',
        email: 'j.balvin@sol-cielo.com',
        role: 'Marketing',
        sede: 'Otros',
        status: true,
        last_login: '2024-07-22T11:45:00Z',
        avatar: 'https://picsum.photos/seed/308/100/100',
        performance: {
            leadsCount: 150,
            contractsCount: 0,
            totalSales: 0,
        }
    }
];

export type User = typeof usersData[0];

export const roleColors: { [key: string]: string } = {
  Comercial: 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-300 dark:bg-blue-900/50',
  Supervisor: 'bg-purple-500/10 text-purple-700 border-purple-500/20 dark:text-purple-300 dark:bg-purple-900/50',
  Administrador: 'bg-primary/10 text-primary border-primary/20 dark:text-primary dark:bg-primary/20',
  Contabilidad: 'bg-green-500/10 text-green-700 border-green-500/20 dark:text-green-300 dark:bg-green-900/50',
  Operaciones: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-300 dark:bg-yellow-900/50',
  Marketing: 'bg-pink-500/10 text-pink-700 border-pink-500/20 dark:text-pink-300 dark:bg-pink-900/50',
};
