"use client";

import { actionFunction } from "@/utils/types";
// import { useFormState } from "react-dom";
import { useEffect } from "react";

import React from "react";
import { toast } from "sonner";
const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = React.useActionState(action, initialState);

  useEffect(() => {
    console.log("state:", state);

    if (state.message) {
      toast(state.message);
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
