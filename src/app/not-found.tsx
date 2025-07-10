"use server";

export default async function notFound() {
  return (
    <div className="text-center">
      <h1>404 Ошибка</h1>
      <h2>Страница не найдена</h2>
    </div>
  );
}
