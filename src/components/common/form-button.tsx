import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

export default function FormButton({children}:{children:React.ReactNode}){
  const {pending} = useFormStatus()

  return <Button isLoading={pending} type="submit">
    {children}
  </Button>
}