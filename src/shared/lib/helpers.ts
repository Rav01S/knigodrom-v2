export const DEFAULT_AVATAR_IMAGE = "/placeholders/default-user-avatar.png";

export const toBase64 = (file: File) =>
  new Promise<string | null | ArrayBuffer>((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = () =>
      rej(new Error("Не удалось преобразовать изображение"));
  });
