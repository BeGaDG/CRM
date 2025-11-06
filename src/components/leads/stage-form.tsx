
'use client';
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  NuevoLeadForm,
  PorVisitarForm,
  PorCotizarForm,
  PorPresentarCotizacionForm,
  PorContratarForm,
  AjustarCotizacionForm,
  SeguimientoCotizacionForm,
  NoForm
} from './stage-forms';

const stageToFormComponent: { [key: string]: React.FC<any> } = {
  'Nuevo Lead': NuevoLeadForm,
  'Por Visitar': PorVisitarForm,
  'Por Cotizar': PorCotizarForm,
  'Por Presentar Cotización': PorPresentarCotizacionForm,
  'Por Contratar': PorContratarForm,
  'Ajustar Cotización': AjustarCotizacionForm,
  'Seguimiento a la Cotización': SeguimientoCotizacionForm,
  'No': NoForm,
};

export const StageForm = ({ stageName, onSave, onDataChange, initialData = {} }: { stageName: string | null; onSave: (data: any) => void; onDataChange: (data: any) => void; initialData?: any; }) => {
    const [formData, setFormData] = React.useState(initialData);

    React.useEffect(() => {
        onDataChange(formData);
    }, [formData, onDataChange]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  }

  const FormComponent = stageName ? stageToFormComponent[stageName] : null;

  if (!FormComponent) return null;

  return (
    <div className='space-y-4'>
      <FormComponent
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleDateChange={handleDateChange}
      />
      <Button onClick={handleSaveClick} className='w-full'>
        <Save className="mr-2 h-4 w-4" />
        Guardar Borrador
      </Button>
    </div>
  );
};
