import sqlite3

# Database connection
db_path = 'static/db/test.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Define the mappings for idNumber to img URL
img_updates = {
    '6706163955500': 'https://images.stockcake.com/public/b/c/d/bcd8f220-09d5-4028-8a8c-88acbf92428f_large/elegant-senior-user-stockcake.jpg',
    '8512165193500': 'https://images.stockcake.com/public/b/c/d/bcd8f220-09d5-4028-8a8c-88acbf92428f_large/elegant-senior-user-stockcake.jpg',
    '8411092012500': 'https://images.stockcake.com/public/b/c/d/bcd8f220-09d5-4028-8a8c-88acbf92428f_large/elegant-senior-user-stockcake.jpg',
    '9305238375000': 'https://images.stockcake.com/public/5/7/e/57ef6e53-b901-4c69-8a9e-dc5a9d9ed0de_large/focused-tech-user-stockcake.jpg',
    '9303138029000': 'https://images.stockcake.com/public/5/7/e/57ef6e53-b901-4c69-8a9e-dc5a9d9ed0de_large/focused-tech-user-stockcake.jpg',
    '5502120211000': 'https://images.stockcake.com/public/5/7/e/57ef6e53-b901-4c69-8a9e-dc5a9d9ed0de_large/focused-tech-user-stockcake.jpg'
}

# Update img column based on idNumber
for id_number, img_url in img_updates.items():
    cursor.execute('''
    UPDATE debtors
    SET img = ?
    WHERE idNumber = ?
    ''', (img_url, id_number))

# Commit changes and close the connection
conn.commit()
conn.close()

print("Debtors table updated successfully.")
