# README - Progetto Sales Taxes

Benvenuto nel progetto Sales Taxes! Questa applicazione è progettata per calcolare le tasse su un carrello della spesa e generare una ricevuta dettagliata. Segui questa guida per configurare e avviare il progetto sul tuo computer.

## Indice
1. Requisiti
2. Configurazione del Database
3. Configurazione del Backend (.NET)
4. Configurazione del Frontend (React)
5. Esecuzione del Progetto
6. Struttura del Progetto
7. Endpoint API

---

## Requisiti
Prima di iniziare, assicurati di avere installato i seguenti strumenti:

### Database:
- SQL Server Express (o un'istanza locale di SQL Server).
- SQL Server Management Studio (SSMS) per gestire il database.

### Backend (.NET):
- .NET SDK 8.0.
- Visual Studio 2022.

### Frontend (React):
- Node.js (versione 16 o superiore).
- npm o yarn.

---

## Configurazione del Database
### 1. Crea il Database
Apri SQL Server Management Studio (SSMS) e connettiti al tuo server locale.

Esegui il seguente script SQL per creare il database e le tabelle necessarie:

```sql
CREATE DATABASE SalesTaxes;
GO

USE SalesTaxes;
GO

CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    IsImported BIT NOT NULL
);

CREATE TABLE Receipts (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TotalTax DECIMAL(10, 2) NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL
);

CREATE TABLE ReceiptItems (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ReceiptId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ReceiptId) REFERENCES Receipts(Id),
    FOREIGN KEY (ProductId) REFERENCES Products(Id)
);
GO
```

### 2. (Opzionale) Inserisci alcuni dati di esempio:

Possono anche essere inseriti direttamente dall'applicazione in seguito. 
NB: le categorie che saranno escluse dal 10% di basic sale tax sono, come da consegna, books, food, and medical products.

```sql
INSERT INTO Products (Name, Price, Category, IsImported) VALUES
('book', 12.49, 'book', 0),
('music CD', 14.99, 'other', 0),
('chocolate bar', 0.85, 'food', 0),
('imported box of chocolates', 10.00, 'food', 1),
('imported bottle of perfume', 47.50, 'other', 1);
GO
```

---

## Configurazione del Backend (.NET)
### 1. Clona la Repository

```bash
git clone https://github.com/tuo-username/sales-taxes.git
cd sales-taxes/Backend
```

### 2. Configura la Stringa di Connessione
Apri il file `appsettings.json` nella cartella `Backend`.

Modifica la stringa di connessione per puntare al tuo database:

NB: al posto di `SalesTaxes` il nome del tuo database (se si è utilizzato la create table sopra, lasciare SalesTaxes)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SalesTaxes;Trusted_Connection=True;Encrypt=False;"
  }
}
```

### 3. Installa le Dipendenze

```bash
dotnet restore
```

### 4. Esegui il Backend

```bash
dotnet run
```

Il backend sarà disponibile all'indirizzo: `http://localhost:5062` (o `https://localhost:7230`)per i profili http e https, `http://localhost:44348` per IIS Express con SSL abilitato.

---

## Configurazione del Frontend (React)
### 1. Clona la Repository (Se Non Già Fatto)

```bash
git clone https://github.com/tuo-username/sales-taxes.git
cd sales-taxes/Frontend
```

### 2. Installa le Dipendenze

```bash
npm install
```

### 3. Configura l'URL del Backend
Apri il file `.env.local` nella cartella `Frontend` e imposta l'URL del backend agl indirizzi sopra descritti.

Di default è stato impostato l'indirizzo per https, se si vuole impostare un altro URL, togliere il commento (#) dall'URL che si desidera usare e commentare quello usato in precedenza.

### 4. Avvia il Frontend

```bash
npm start
```

Il frontend sarà disponibile all'indirizzo: `http://localhost:3000`.

---

## Esecuzione del Progetto
1. **Avvia il Backend:**
   - Assicurati che il backend sia in esecuzione (`dotnet run` nella cartella `SalesBackend`).

2. **Avvia il Frontend:**
   - Avvia il frontend (`npm start` nella cartella `sales-taxes-frontend`).

3. **Usa l'Applicazione:**
   - Apri il browser e vai a `http://localhost:3000`.
   - Aggiungi prodotti al carrello e genera una ricevuta.

---

## Struttura del Progetto
### Backend:
- `Controllers/`: Contiene i controller API.
- `Models/`: Contiene i modelli del database.
- `Services/`: Contiene i service (es. `TaxCalculator`).
- `Data/`: Contiene il contesto del database (`SalesTaxesContext`).

### Frontend:
- `src/`: Contiene il codice sorgente React.
- `public/`: Contiene i file statici (es. `index.html`).

---

## Endpoint API
- `GET /api/products`: Restituisce la lista dei prodotti.
- `POST /api/products`: Crea un nuovo prodotto.
- `POST /api/receipts`: Genera una nuova ricevuta.
- `GET /api/receipts`: Restituisce tutte le ricevute.

---

