export interface Patient {
    id: number;
    name: string;
    surname: string;
    email: string;
    cellphone: string;
    idNumber: string;
    dob: string;
}

export interface Booking {
    id: number;
    idNumber: string;
    time: string;
    status: string;
    type: string;
    name: string;
    surname: string;
    img: string;
    allergies: string;
    gender: string;
    date: string;
}

export interface PageServerData {
    patients: Patient[];
    bookings: Booking[];
}