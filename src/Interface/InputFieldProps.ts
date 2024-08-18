
import React from "react";

export interface InputFieldProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
