"use client";

import { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { HookConfig } from "react-paystack/dist/types";

export default function PaystackWrapper({
  config,
  onSuccess,
  onClose,
}: {
  config: HookConfig;
  onSuccess: (response: any) => void;
  onClose: () => void;
}) {
  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    initializePayment({ onSuccess, onClose });
  }, []);

  return null;
}
