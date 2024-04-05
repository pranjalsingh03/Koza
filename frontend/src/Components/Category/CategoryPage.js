import React from 'react';
import { useParams } from 'react-router-dom';
import Male from './Male';
import Women from './Women';
import Accessories from './Accessories';
import Bags from './Bags';
import MCat from './MCat';

const CategoryPage = () => {
    const { type } = useParams();

    let categoryContent;
    switch (type) {
        case 'male':
            categoryContent =<Male/>;
            break;
        case 'female':
            categoryContent = <Women/>;
            break;
        case 'pillowcase':
            categoryContent = <Accessories/>;
            break;
        case 'bags':
            categoryContent = <Bags/>;
            break;
        case 'accessories':
            categoryContent = <Accessories/>;
            break;
        default:
            categoryContent = <MCat/>;
            break;
    }

    return (
        <>
        <div className="container mx-auto py-8 text-center">
            {/* <h1 className="text-3xl font-bold mb-4">Category: {type.toUpperCase()}</h1> */}
            {categoryContent}
        </div>
        </>
    );
}

export default CategoryPage;
