import BookCard from "@/entities/Book/ui/BookCard";

export default function Home() {
  return (
    <div className="home__container flex-1 flex flex-col items-center justify-start w-full">
      <section id="search__section" className="w-full mt-20">
        <h2 className="text-center">Найдите вашу любимую книгу</h2>
        <form action="/search" className="flex justify-center w-full">
          <input
            name="query"
            type="text"
            placeholder="Введите запрос"
            className="border-2 p-2 w-full max-w-4xl rounded-s-md outline-none"
          />
          <button
            type="submit"
            className="border-2 p-2 rounded-e-md cursor-pointer"
          >
            Найти
          </button>
        </form>
      </section>
      <section id="recomended" className="w-full mt-20">
        <h2>Рекомендуемые книги</h2>
        <div className="grid [grid-template-columns:repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </section>
    </div>
  );
}
