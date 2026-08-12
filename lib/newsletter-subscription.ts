"use client";

import * as React from "react";

const STORAGE_KEY = "community-portal-newsletter-subscribed";

/** Whether the signed-in persona is subscribed to the portal newsletter — a standalone preference, not tied to saved items or community reputation. */
export function useNewsletterSubscription(): [boolean, (value: boolean) => void] {
  const [subscribed, setSubscribed] = React.useState(false);

  React.useEffect(() => {
    setSubscribed(window.localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const update = React.useCallback((value: boolean) => {
    setSubscribed(value);
    window.localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  return [subscribed, update];
}
