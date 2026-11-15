"use client";

import ErrorVista from "@/components/ErrorVista";

export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorVista {...props} />;
}
