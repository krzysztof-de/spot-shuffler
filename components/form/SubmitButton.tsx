"use client";
import React from "react";
import ButtonLoader from "../layout/ButtonLoader";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  className: string;
}

const SubmitButton = ({ text = "Submit", className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? <ButtonLoader /> : text}
    </button>
  );
};

export default SubmitButton;
