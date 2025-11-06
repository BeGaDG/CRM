'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import {
  NuevoLeadForm,
  PorVisitarForm,
  PorCotizarForm,
  PorPresentarCotizacionForm,
  AjustarCotizacionForm,
  SeguimientoCotizacionForm,
  PorContratarForm,
  NoForm
} from './stage-forms';
import { Separator } from '../ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

// Combines lead data and collectedData
const combineInitialData = (initialData: any) => {
    return {
        ...initialData,
        ...initialData.collectedData
    }
};

export const FullLeadForm = ({
  initialData,
  onSave,
  onDataChange,
}: {
  initialData: any;
  onSave: (data: any) => void;
  onDataChange: (data: any) => void;
}) => {
  const [formData, setFormData] = React.useState(
    combineInitialData(initialData)
  );

  React.useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev: any) => ({
      ...prev,
      [id]: isCheckbox ? checked : value,
    }));
  };

  const handleSelectChange = (id: string, value: string | boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (id: string, date?: Date) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: date,
    }));
  };

  const handleSaveClick = () => {
    onSave(formData);
  };

  const formProps = { formData, handleChange, handleSelectChange, handleDateChange };

    return (
        <div className='space-y-6'>
            <Card>
                <CardHeader>
                    <CardTitle>Datos de Contacto</CardTitle>
                    <CardDescription>Información básica del lead.</CardDescription>
                </CardHeader>
                <CardContent>
                    <NuevoLeadForm {...formProps} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Datos de Visita</CardTitle>
                </CardHeader>
                <CardContent>
                    <PorVisitarForm {...formProps} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Datos para Cotizar</CardTitle>
                </CardHeader>
                <CardContent>
                    <PorCotizarForm {...formProps} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Datos de Presentación / Ajuste de Cotización</CardTitle>
                </CardHeader>
                <CardContent>
                     {/* Using PorPresentarCotizacionForm as it contains all fields for both */}
                    <PorPresentarCotizacionForm {...formProps} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Seguimiento</CardTitle>
                </CardHeader>
                <CardContent>
                    <SeguimientoCotizacionForm {...formProps} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Contratación</CardTitle>
                </CardHeader>
                <CardContent>
                    <PorContratarForm {...formProps} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Motivo de Rechazo</CardTitle>
                </CardHeader>
                <CardContent>
                    <NoForm {...formProps} />
                </CardContent>
            </Card>

            <Button onClick={handleSaveClick} className='w-full sticky bottom-0'>
                <Save className="mr-2 h-4 w-4" />
                Guardar Toda la Información
            </Button>
        </div>
    );
};
