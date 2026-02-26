export interface Review {
    id: string;
    author: string;
    text: string;
    date: string;
}

export interface CoffeeShop {
    id: string;
    name: string;
    address: string;
    neighborhood: string;
    lat: number;
    lng: number;
    price: number;       // 1–5
    taste: number;       // 1–5
    strength: number;    // 1–5
    overall: number;     // 1–5
    reviews: Review[];
    imageDescription?: string;
}
