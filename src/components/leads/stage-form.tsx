'use client';
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  NuevoClienteForm,
  PorVisitarForm,
  PorCotizarForm,
  PorPresentarCotizacionForm,
  PorContratarForm,
  AjustarCotizacionForm,
  SeguimientoCotizacionForm,
  NoForm
} from './stage-forms';
import { useFormStage } from '@/hooks/use-form-stage';

const stageToFormComponent: { [key: string]: React.FC<any> } = {
  'Nuevo Cliente': NuevoClienteForm,
  'Por Visitar': PorVisitarForm,
  'Por Cotizar': PorCotizarForm,
  'Por Presentar Cotización': PorPresentarCotizacionForm,
  'Por Contratar': PorContratarForm,
  'Ajustar Cotización': AjustarCotizacionForm,
  'Seguimiento a la Cotización': SeguimientoCotizacionForm,
  'No': NoForm,
};

export const StageForm = ({ stageName, onSave, onDataChange, initialData = {} }: { stageName: string | null; onSave: (data: any) => void; onDataChange: (data: any) => void; initialData?: any; }) => {
  const { formData, handleChange, handleSelectChange, handleDateChange } = useFormStage(initialData, onDataChange);

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
