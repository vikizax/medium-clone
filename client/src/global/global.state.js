import { atom } from 'recoil';

export const articleLoading = atom({
    key: 'articleLoading',
    default: false
});

export const modalAtom = atom({
    key: 'modal',
    default: {
        view: false,
        option: '',
        loading: false
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

export const alertAtom = atom({
    key: 'alert',
    default: {
        hidden: true,
        message: '',
        severity: 'success'
    }
});