"use client";

export default function FieldErrorText({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) return null;
  return (
    <>
      <p className="text-red-500 text-sm">{children}</p>
    </>
  );
}
