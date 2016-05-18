'use strict';

function getEmoticon(identifier) {
    switch(identifier) {
    case "good":
        return '../../assets/img/good.svg';
    case "great":
        return '../../assets/img/great.svg';
    case "okay":
        return '../../assets/img/okay.svg';
    case "poor":
        return '../../assets/img/poor.svg';
    case "awful":
        return '../../assets/img/awful.svg';
    default:
        return '../../assets/img/good.svg';
    }
    
    // if (identifier == 'good') {
    //     return '../../assets/img/good.svg';
    // } else if (identifier == 'great') {
    //     return '../../assets/img/good.'
    // }
    
    // else {
    //     return '../../assets/img/good.svg'; 
    // }
}