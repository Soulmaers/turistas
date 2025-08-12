


import { useCallback } from 'react';

export const useGetImages = () => {
    // Функция для ресайза изображения
    const resizeImage = (blob: Blob, maxWidth: number, maxHeight: number): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(blob);
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                // Масштабируем пропорции
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context not available'));
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (compressedBlob) => {
                        if (compressedBlob) {
                            resolve(compressedBlob);
                        } else {
                            reject(new Error('Canvas toBlob failed'));
                        }
                    },
                    'image/jpeg',
                    0.7
                );
            };
            img.onerror = reject;
        });
    };

    // Функция для получения изображения с кешем и сжатием
    const getImage = useCallback(async (nameImage: string): Promise<string> => {
        const cacheKey = `img_${nameImage}`;

        // Проверяем кеш
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            return cachedData; // возвращаем закешированное сжатое изображение
        }

        // Если нет — загружаем оригинал
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nameImage })
        };

        try {
            const res = await fetch('/api/uploades', params);
            const imageBlob = await res.blob();

            // Ресайзим изображение
            const compressedBlob = await resizeImage(imageBlob, 300, 300); // размеры для превью
            const reader = new FileReader();

            const base64Data: string = await new Promise((resolve, reject) => {
                reader.onloadend = () => {
                    if (reader.result) resolve(reader.result as string);
                    else reject(new Error('Failed to read blob as data URL'));
                };
                reader.onerror = reject;
                reader.readAsDataURL(compressedBlob);
            });

            // Сохраняем в кеш
            localStorage.setItem(cacheKey, base64Data);

            return base64Data;
        } catch (err) {
            console.error('Ошибка получения изображения', err);
            throw err;
        }
    }, []);

    const getImageOrigin = async (nameImage: string) => {
        console.log(nameImage)
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nameImage })
        }
        const res = await fetch('/api/uploades', params)
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL
    }




    return { getImage, getImageOrigin };
};


/*export const useGetImages = () => {

    const getImage = async (nameImage: string) => {
        console.log(nameImage)
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nameImage })
        }
        const res = await fetch('/api/uploades', params)
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL
    }


    return { getImage }
} */