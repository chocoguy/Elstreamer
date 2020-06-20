import React from 'react';

let quotes = [
    "Most ambitous project yet!",
    "I run Arch btw...",
    "Made with ReactJs!",
    "MongoDB > Mysql",
    "DecaHex 2020",
    "I hate ads",
    "1/2 months to create!",
    "Sailor Moon my fav anime!!!",
    "Melon gave DAMN. a 7..",
    "DecaHex.com",
    "Poetic Justice",
    "Black Lives Matter",
    "SONY ALWAYS WINSS BABYEEE",
    "1+1 = 10",
    'just Monika',
    'all my homies use C#',
    'Name jeff'
]


 
const Quote = () => {
    return(
    <div>
    <p>{quotes[ Math.floor(Math.random() * Math.floor(11))]}</p>
    </div>
    )
}

export default Quote;