"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

export default function BookCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="book-card border-2 rounded"
    >
      <Link href="/book/1" className="p-4 flex flex-col gap-4">
        <div className="book-card__image h-80">
          <Image
            src="/placeholders/image-not-available.jpg"
            alt="Book Cover"
            width={100}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="book-card__info">
          <h3 className="book-card__title">Название книги</h3>
          <p className="book-card__author">Автор книги</p>
        </div>
      </Link>
    </motion.div>
  );
}
