import sqlite3
import random
from faker import Faker
import datetime

# Initialize Faker to generate fake data
fake = Faker()

def generate_sa_id_number():
    """Generate a South African ID number."""
    today = datetime.date.today()
    dob = fake.date_of_birth(minimum_age=18, maximum_age=90)  # Minimum 18 years old
    dob_str = dob.strftime('%y%m%d')
    sequence = random.randint(0, 9999)
    gender = random.choice(['0', '5'])  # 0 for female, 5 for male
    citizenship = '0'  # 0 for South African citizens
    id_number = f"{dob_str}{sequence:04}{gender}{citizenship}0"  # Check digit can be 0 for simplicity
    return id_number

def generate_unique_sa_id_numbers(count):
    """Generate a set of unique South African ID numbers."""
    id_numbers = set()
    while len(id_numbers) < count:
        id_numbers.add(generate_sa_id_number())
    return id_numbers

# Database connection
db_path = 'static/db/test.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Truncate tables
cursor.execute('DROP TABLE IF EXISTS bookings')
cursor.execute('DROP TABLE IF EXISTS debtors')

# Create tables with updated schema
cursor.execute('''
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idNumber TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS debtors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    idNumber TEXT NOT NULL,
    gender TEXT NOT NULL,
    img TEXT NOT NULL,
    cellphone TEXT NOT NULL,
    email TEXT NOT NULL,
    allergies TEXT NOT NULL
)
''')

# Insert data into bookings table
status_options = ['Ready', 'Pending', 'Completed']
type_options = ['Emergency', 'Routine', 'Urgent']

# Generate unique South African ID numbers
id_numbers = generate_unique_sa_id_numbers(20)

# Insert bookings data for August 2024
for id_number in id_numbers:
    start_time = fake.time(pattern='%H:%M')
    end_time = (datetime.datetime.strptime(start_time, '%H:%M') + datetime.timedelta(minutes=30)).strftime('%H:%M')
    time = f'{start_time} - {end_time}'
    status = random.choice(status_options)
    type_ = random.choice(type_options)
    date = fake.date_between_dates(date_start=datetime.date(2024, 8, 1), date_end=datetime.date(2024, 8, 31)).strftime('%Y-%m-%d')
    cursor.execute('''
    INSERT INTO bookings (idNumber, time, status, type, date)
    VALUES (?, ?, ?, ?, ?)
    ''', (id_number, time, status, type_, date))

# Define images based on gender
img_urls = {
    'Male': 'https://images.stockcake.com/public/3/0/c/30c39765-62a8-411e-aa91-63c86a76e4de_large/happy-tech-user-stockcake.jpg',
    'Female': 'https://images.stockcake.com/public/8/0/d/80d1bb50-8fed-4399-8ce3-51403fbc2768_large/futuristic-headphone-user-stockcake.jpg'
}

# Insert data into debtors table
gender_options = ['Male', 'Female']
allergies_options = ['None', 'Peanuts', 'Milk', 'Shellfish', 'Dust']

for id_number in id_numbers:
    name = fake.first_name()
    surname = fake.last_name()
    gender = random.choice(gender_options)
    img = img_urls[gender]  # Assign image based on gender
    cellphone = fake.phone_number()
    email = fake.email()
    allergies = random.choice(allergies_options)
    cursor.execute('''
    INSERT INTO debtors (name, surname, idNumber, gender, img, cellphone, email, allergies)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (name, surname, id_number, gender, img, cellphone, email, allergies))

# Commit changes and close the connection
conn.commit()
conn.close()

print("Tables truncated, created, and data inserted successfully.")
