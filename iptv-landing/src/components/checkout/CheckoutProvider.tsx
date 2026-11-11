"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { featuredPlanId } from "@/content/plans";
import type { PlanId } from "@/types/plans";

const CheckoutDialog = dynamic(
  () => import("@/components/checkout/CheckoutDialog").then((module) => module.CheckoutDialog),
  { ssr: false, loading: () => null },
);

interface CheckoutState {
  isOpen: boolean;
  planId: PlanId;
}

type CheckoutAction = { type: "open"; planId: PlanId } | { type: "close" };

const initialState: CheckoutState = { isOpen: false, planId: featuredPlanId };

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "open":
      return { isOpen: true, planId: action.planId };
    case "close":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CheckoutContextValue extends CheckoutState {
  openCheckout: (planId?: PlanId) => void;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const openCheckout = useCallback((planId: PlanId = featuredPlanId) => {
    dispatch({ type: "open", planId });
  }, []);

  const closeCheckout = useCallback(() => {
    dispatch({ type: "close" });
  }, []);

  const value = useMemo<CheckoutContextValue>(
    () => ({ ...state, openCheckout, closeCheckout }),
    [state, openCheckout, closeCheckout],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      {state.isOpen ? (
        <CheckoutDialog planId={state.planId} onClose={closeCheckout} />
      ) : null}
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider.");
  }
  return context;
}
