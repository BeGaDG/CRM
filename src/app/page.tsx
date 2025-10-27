
'use client';
import * as React from 'react';
import {
  Activity,
  Contact,
  DollarSign,
  FileText,
  Percent,
  FileSignature,
  CheckCircle,
  ClipboardList,
  Users
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SalesAnalyticsChart } from '@/components/dashboard/sales-analytics-chart';
import { LeadFunnelStats } from '@/components/dashboard/lead-funnel-stats';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { RecentContracts } from '@/components/dashboard/recent-contracts';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { kpis, recentContracts, recentActivity } from '@/lib/data/dashboard-data';


export default function Dashboard() {
  return (
    <DashboardLayout>
      <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6 overflow-auto">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi, index) => (
            <KpiCard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex">
            <SalesAnalyticsChart />
          </div>
          
          <div className="space-y-6">
            <LeadFunnelStats />
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
        
        <RecentContracts contracts={recentContracts} />
      </main>
    </DashboardLayout>
  );
}
