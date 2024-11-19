let books = [
  {
    id: 1,
    title: "The Great Adventure",
    author: "Jane Doe",
    year: 2015,
    genre: "Adventure",
    description:
      "A thrilling journey through uncharted territories, where unexpected challenges arise.",
  },
  {
    id: 2,
    title: "Mystery at Midnight",
    author: "John Smith",
    year: 2020,
    genre: "Mystery",
    description:
      "A suspenseful tale of secrets, lies, and unexpected twists, keeping readers on edge until the very end.",
  },
  {
    id: 3,
    title: "Beyond the Stars",
    author: "Alice Johnson",
    year: 2018,
    genre: "Science Fiction",
    description:
      "Exploring distant galaxies and alien worlds, this sci-fi epic pushes the boundaries of imagination.",
  },
  {
    id: 4,
    title: "The Last Kingdom",
    author: "Robert Lee",
    year: 2016,
    genre: "Historical Fiction",
    description:
      "Set in medieval times, a story of power, betrayal, and the rise and fall of empires.",
  },
  {
    id: 5,
    title: "Heartfelt Moments",
    author: "Emily Taylor",
    year: 2019,
    genre: "Romance",
    description:
      "A touching romance novel that delves into the complexities of love, loss, and hope.",
  },
  {
    id: 6,
    title: "Code for Success",
    author: "Michael Brown",
    year: 2021,
    genre: "Non-Fiction",
    description:
      "An inspiring guide to achieving personal and professional growth through resilience and adaptability.",
  },
  {
    id: 7,
    title: "Whispers in the Dark",
    author: "Sarah Green",
    year: 2017,
    genre: "Thriller",
    description:
      "A chilling thriller that unravels secrets hidden in the shadows, where nothing is as it seems.",
  },
  {
    id: 8,
    title: "The Art of Mindfulness",
    author: "David White",
    year: 2022,
    genre: "Self-Help",
    description:
      "A journey towards inner peace, offering practical techniques to cultivate mindfulness in everyday life.",
  },
  {
    id: 9,
    title: "Childhood Dreams",
    author: "Lily Carter",
    year: 2023,
    genre: "Children's Literature",
    description:
      "An enchanting story that celebrates the joy of imagination and the power of dreams.",
  },
  {
    id: 10,
    title: "The Mystery of the Ancient Relic",
    author: "Tom Harris",
    year: 2014,
    genre: "Adventure/Mystery",
    description:
      "An ancient relic holds the key to a world-changing secret, and a team of explorers is determined to find it.",
  },
];

let express = require("express");
const app = express();
require('dotenv').config()


app.use(express.json());
app.post("/books", (req, res) => {
  try {
    books.push(req.body);
    console.log(books);
  } catch (error) {
    console.log(error);
  }
});
app.get("/books", (req, res) => {
  try {
    res.status(200).json({ messsage: "book created", data: books });
  } catch (error) {
    console.log(error);
  }
});
app.get("/books/:id", (req, res) => {
  try {
    const bookId = req.params.id;
    const selectedbook = books.filter((element) => {
      return element.id == bookId;
    });
    res.json({ selectedbook });
  } catch (error) {
    console.log(error);
  }
});
app.put("/books/:id", (req, res) => {
  try {
    const newContent = req.body;
    const bookId = Number(req.params.bookId);
    const book = books.find((book) => book.id === bookId);
    if (book) {
      const ubooks = books.map((book) => {
        if (book.id === bookId) {
          book = { ...book, title: newContent.title };
        }
        return book;
      });
      books = ubooks;
      res.status(200).json({ message: "book updated", data: books });
    }else{
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    console.log(error);
  }
});
app.delete("/books/:id", (req, res) => {
  try {
    const bookId = req.params.id;
    const selectedbook = books.find((element) => {
      return element.id == bookId;
    });
    // console.log(selectedbook);

    if (selectedbook) {
      console.log(selectedbook);

      const newbooks = books.filter((element) => {
        return element.id != bookId;
      });

      console.log(newbooks);

      books = newbooks;
      res
        .status(200)
        .json({ message: "book deleted suuccessfully!", data: books });
    } else {
      console.log("something went wrong!");
    }
  } catch (error) {
    console.log(error);
  }
});
app.listen(process.env.PORT, (err) => {
  console.log("server is running");
});
