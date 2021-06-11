import { atom } from 'recoil';

export const modalAtom = atom({
    key: 'modal',
    default: {
        view: false,
        option: ''
    }
});

export const userAtom = atom({
    key: 'user',
    default: null,
});


export const editorAtom = atom({
    key: 'editor',
    default: null
});


