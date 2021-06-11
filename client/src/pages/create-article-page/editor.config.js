import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import SimpleImage from '@editorjs/simple-image';
import axios from 'axios';
import api from '../../constant/api.constant';

export const EDITOR_JS_TOOLS = {
    header: Header,
    paragraph: Paragraph,
    list: List,
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByFile(file) {
                    const formData = new FormData();
                    formData.append('image', file);
                    return axios.post(api.uploadFile, formData, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => ({
                        success: 1,
                        file: {
                            url: api.image + res.data.fileName
                        }
                    }
                    ))
                },
            }
        }
    },

    code: Code,
    quote: Quote,
    marker: Marker,
    delimiter: Delimiter,
    simpleImage: SimpleImage
}