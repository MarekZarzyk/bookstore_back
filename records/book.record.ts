import { FieldPacket } from "mysql2";
import { BookEntity } from "../types";
import { pool } from "../utils/db";

type BookRecordResults = [BookEntity[], FieldPacket[]];

export class BookRecord implements BookEntity {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image_url: string;

  constructor(obj: BookEntity) {
    this.id = obj.id;
    this.title = obj.title;
    this.author = obj.author;
    this.description = obj.description;
    this.price = obj.price;
    this.category = obj.category;
    this.quantity = obj.quantity;
    this.image_url = obj.image_url;
  }

  static async getOne(id: string): Promise<BookRecord> | null {
    const [results] = (await pool.execute(
      "SELECT * FROM `books` WHERE id = :id",
      {
        id,
      }
    )) as BookRecordResults;

    return results.length === 0 ? null : new BookRecord(results[0]);
  }

  static async getAllByCategory(
    category: string
  ): Promise<BookRecord[]> | null {
    const [results] = (await pool.execute(
      "SELECT * FROM `books` WHERE category LIKE :category",
      {
        category: `%${category}%`,
      }
    )) as BookRecordResults;

    return results.length === 0 ? null : results;
  }

  static async getAll(): Promise<BookRecord[]> | null {
    const [results] = (await pool.execute(
      "SELECT * FROM `books` "
    )) as BookRecordResults;

    return results.length === 0 ? null : results;
  }

  static async findAll(phrase: string): Promise<BookRecord[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `books` WHERE `title` like :search OR `author` like :search",
      {
        search: `%${phrase}%`,
      }
    )) as BookRecordResults;

    return results.length === 0 ? null : results;
  }
}
