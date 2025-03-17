import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ResponsiveModel from "@/components/ResponsiveModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  title: string;
  message: string;
};

export type UseConfirmReturn = {
  ConfirmationDialog: () => JSX.Element;
  confirm: () => Promise<unknown>;
};

export default function useConfirm({ title, message }: Props): UseConfirmReturn {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveModel open={promise !== null} onOpenChange={handleClose}>
      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <div className="pt-4 w-full flex gap-2 items-center justify-end">
            <Button onClick={handleCancel} className="w-full lg:w-auto">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="w-full lg:w-auto">
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModel>
  );

  return {
    ConfirmationDialog,
    confirm,
  };
}
