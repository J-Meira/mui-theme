import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';


export const useForm = () => {
  const formRef = useRef<FormHandles>(null);

  const isSavingAndClose = useRef(false);
  const isSavingAndNew = useRef(false);
  const isExport = useRef(false);


  const handleReset = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
    isExport.current = false;
    formRef.current?.reset();
  }, []);

  const handleSave = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
    isExport.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = true;
    isExport.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndClose.current = true;
    isSavingAndNew.current = false;
    isExport.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleExport = useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
    isExport.current = true;
    formRef.current?.submitForm();
  }, []);


  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  const handleIsExport = useCallback(() => {
    return isExport.current;
  }, []);


  return {
    formRef,

    formExport: handleExport,
    formReset: handleReset,
    formSave: handleSave,
    formSaveAndClose: handleSaveAndClose,
    formSaveAndNew: handleSaveAndNew,

    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
    isExport: handleIsExport,
  };
};
