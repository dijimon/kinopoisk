// Core
global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;
import React from 'react';
import DetailsPopUp from './';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { render } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

const result = render(<DetailsPopUp show = { true } movie = { {
    adult:             false,
    backdrop_path:     '/ytKpFaLMpFWnuSXStz1GHrtTt6R.jpg',
    genre_ids:         [27, 53],
    id:                298250,
    original_language: 'en',
    original_title:    'Jigsaw',
    overview:          'В городе обнаруживают несколько тел',
    popularity:        360.769201,
    poster_path:       '/fU92rYGlDmojgj2M2oUgxihPPS.jpg',
    release_date:      '2017-10-26',
    title:             'Пила 8',
    video:             false,
    vote_average:      5.8,
    vote_count:        160
    } } genres = { [23, 12] }
/>);

describe('DetailsPopUp component:', () => {

    test('Should have 1 div element', () => {
        expect(result.find('div')).toHaveLength(1);
    });

    test('Section should have h2 component with title className', () => {
        expect(result.find('h2').hasClass('title'));
    });

    test('Section should have h2 component with title className', () => {
        expect(result.find('h2').hasClass('title'));
    });

    test('Should have 0 section elements', () => {
        expect(result.find('lsection')).toHaveLength(0);
    });
});
