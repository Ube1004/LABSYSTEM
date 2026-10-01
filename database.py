import sqlite3
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "sql.db"

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row

cur = conn.cursor()

cur.execute("""
            INSERT INTO Items
            (Code, Category, Type, Status, Class)
            VALUES ( ?, ?, ?, ?,?)
        """, ("TEST", "TEST", "TEST", "TEST", "TEST"))
conn.close()

print("done")

