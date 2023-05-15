import { useState, useCallback, useEffect } from "react";

type FormData<T> = {
  [key in keyof T]: string;
};

type UseForm<T> = {
  formData: FormData<T>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData<T>>>;
};

export const useForm = <T>(initialState: T): UseForm<T> => {
  const [formData, setFormData] = useState<FormData<T>>(
    initialState as FormData<T>
  );

  useEffect(() => {
    setFormData(initialState as FormData<T>);
  }, [initialState]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { formData, handleChange, setFormData };
};
