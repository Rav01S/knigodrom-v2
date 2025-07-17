"use server";

export default async function IsEmailVerified() {
  return (
    <div className="max-w-xl mx-auto">
      <h1>Вы подтвердили Email</h1>
      <p>Теперь Вы можете войти в аккаунт</p>
    </div>
  );
}
