const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "student.veleri.hr",
    user: "riwa",
    password: "11",
    port: 3306,
    database: "riwa",
  });
  
app.use(express.urlencoded({ extended: true }));
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
  
app.post("/api/rezerv_knjige", (req, res) => {
  const data = req.body;
  rezervacija = [[data.datum, data.id_knjiga, data.id_korisnik]]
  connection.query("INSERT INTO rezervacija (datum_rezervacije, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//unos knjige
app.post("/api/unos_knjige", (req, res) => {
  const data = req.body;
  rezervacija = [[data.naslov, data.autor, data.opis, data.slika, data.stanje, "slobodna"]]
  connection.query("INSERT INTO knjiga (naslov, autr, opis, slika, stanje, status) VALUES ?", 
    [knjiga], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// 1) Sve knjige
app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});



// 2) Slobodne knjige
app.get("/api/knjige/slobodne", (req, res) => {
  connection.query("SELECT * FROM knjiga WHERE status = 'slobodna'", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


// 3) Pronađi knjigu po nazivu
app.get("/api/knjige/naziv/:naslov", (req, res) => {
  const naslov = req.params.naslov;

  connection.query(
    "SELECT * FROM knjiga WHERE naslov = ?",
    [naslov],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


// 4) Pronađi knjigu po autoru
app.get("/api/knjige/autor/:autor", (req, res) => {
  const autor = req.params.autor;

  connection.query(
    "SELECT * FROM knjiga WHERE LOWER(autor) = LOWER(?)",
    [autor],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


// 5) Svi korisnici
app.get("/api/korisnici", (req, res) => {
  connection.query("SELECT * FROM korisnik", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


// 6) Korisnik po emailu/korisničkom imenu
app.get("/api/korisnik/:korime", (req, res) => {
  const korime = req.params.korime;

  connection.query(
    "SELECT * FROM korisnik WHERE korime = ?",
    [korime],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


// 7) Sve rezervirane knjige + korisnik + knjiga
app.get("/api/rezervacije", (req, res) => {
  const sql = `
    SELECT r.datum_rezervacije, r.datum_vracanja,
           k.id AS korisnik_id, k.ime, k.prezime,
           b.id AS knjiga_id, b.naslov, b.autor
    FROM rezervacija r
    JOIN korisnik k ON r.korisnik = k.id
    JOIN knjiga b ON r.knjiga = b.id
    WHERE b.status <> 'slobodna'
  `;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


// 8) Rezervirane knjige koje nisu vraćene
app.get("/api/knjige/rezervirane", (req, res) => {
  connection.query(
    "SELECT * FROM knjiga WHERE status <> 'slobodna'",
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


// 9) Korisnici s rezerviranim (nevraćenim) knjigama
app.get("/api/korisnici/rezervacije", (req, res) => {
  const sql = `
    SELECT DISTINCT 
        k.id, k.ime, k.prezime, k.brtel,
        k.korime, k.lozinka, k.zadnji_pristup, k.uloga
    FROM korisnik k
    JOIN rezervacija r ON k.id = r.korisnik
    JOIN knjiga b ON r.knjiga = b.id
    WHERE b.status <> 'slobodna'
  `;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


// 10) POST rezervacija knjige (tvoj originalni endpoint)
app.post("/api/rezerv_knjige", (req, res) => {
  const data = req.body;

  const rezervacija = [[
    data.datum,
    data.id_knjiga,
    data.id_korisnik
  ]];

  connection.query(
    "INSERT INTO rezervacija (datum_rezervacije, knjiga, korisnik) VALUES ?",
    [rezervacija],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});


app.listen(port, () => {
    console.log("Server running at port: " + port);
});