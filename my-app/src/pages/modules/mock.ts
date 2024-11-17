import { VisasResult } from "./Api.ts";

export const VISAS_MOCK: VisasResult = {
    user_draft_app_id: null,
    number_of_services: 0,
    services: [
    {
        pk: 1,
        type: 'Туристическая',
        price: 15000,
        url: "public/1.jpg"
    },
    {   pk: 2,
        type: 'Учебная',
        price: 14000,
        url: "public/2.jpg"},
    {   pk: 3,
        type: 'Рабочая',
        price: 13000,
        url: "public/3.jpg"},
    {   pk: 4,
        type: 'Частная',
        price: 12000,
        url: "public/4.jpg"},
    {   pk: 5,
        type: 'Транзитная',
        price: 11000,
        url: "public/5.jpg"},
    {   pk: 6,
        type: 'Гуманитарная',
        price: 10000,
        url: "public/6.jpg"},
    {   pk: 8,
        type: 'Деловая',
        price: 9000,
        url: "public/8.jpg"},
    
  ],
};