export class Book {
  constructor(
    id,
    author,
    name,
    price,
    image,
    rating,
    description,
    releasedDate,
    genre,
    comments
  ) {
    this.id = id;
    this.author = author;
    this.name = name;
    this.price = price;
    this.image = image;
    this.rating = rating;
    this.description = description;
    this.releasedDate = releasedDate;
    this.genre = genre;
    this.comments = comments;
  }
}
