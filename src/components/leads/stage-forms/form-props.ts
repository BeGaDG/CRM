'use client';
import type React from 'react';

export type StageFormProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (id: string, value: string | boolean) => void;
  handleDateChange: (id: string, date?: Date) => void;
};
