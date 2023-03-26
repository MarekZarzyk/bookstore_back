import { Router } from "express";
import { BookRecord } from "../records/book.record";

export const BookRouter = Router()
  .get("/book/:id", async (req, res) => {
    const book = await BookRecord.getOne(req.params.id);
    res.json(book);
  })
  .get("/category/:category", async (req, res) => {
    const books = await BookRecord.getAllByCategory(req.params.category);
    res.json(books);
  })
  .get("/all", async (req, res) => {
    const books = await BookRecord.getAll();
    res.json(books);
  })
  .get("/search/:search?", async (req, res) => {
    const books = await BookRecord.findAll(req.params.search ?? "");
    res.json(books);
  });
