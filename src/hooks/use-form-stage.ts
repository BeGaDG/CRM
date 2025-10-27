'use client';
import { useState, useEffect } from 'react';

export const useFormStage = (initialData: any, onDataChange: (data: any) => void) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const updateFormData = (newFormData: any) => {
    setFormData(newFormData);
    onDataChange(newFormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    const updatedData = {
      ...formData,
      [id]: isCheckbox ? checked : value,
    };
    updateFormData(updatedData);
  };

  const handleSelectChange = (id: string, value: string | boolean) => {
    const updatedData = {
      ...formData,
      [id]: value,
    };
    updateFormData(updatedData);
  };

  const handleDateChange = (id: string, date?: Date) => {
    const updatedData = {
      ...formData,
      [id]: date,
    };
    updateFormData(updatedData);
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
    handleDateChange,
  };
};
