const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZjYTdjZmY4NDFiZjA5ZjI3YmFiNzhhNmUyM2E1ZjdiOGY3NGY3MTk5ZGIzYTI4ODU4ODcxZjg4Y2Q1ODYyMDI0MzRjM2IzMTBjN2YwMDQ3In0.eyJhdWQiOiJiZTYxYWY0Ni0xZjVjLTRmOTgtOGYxMC1mNmQxNjE3ZjIwOTkiLCJqdGkiOiI2Y2E3Y2ZmODQxYmYwOWYyN2JhYjc4YTZlMjNhNWY3YjhmNzRmNzE5OWRiM2EyODg1ODg3MWY4OGNkNTg2MjAyNDM0YzNiMzEwYzdmMDA0NyIsImlhdCI6MTczMjEyNDA2NiwibmJmIjoxNzMyMTI0MDY2LCJleHAiOjE3MzI5MjQ4MDAsInN1YiI6IjExODA0MjMwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyMDc5NTA2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZGU4MjY4MmEtMDZjNS00MTgxLWE0ODUtOTBhMzkwNWU5MzAwIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.PwP-ELslN43SEsrVoPIoG-inIRH7M305t83XOv4ZOLCX9clrVQVuU6d9yhAAgyILMbcYPy7u4voQ8gtHlGiqQSy2pUZCmtU-2hUCaD0_IUhM9b5MEaDXKanwVWFCm93UXWC3Jrjg79bYhzSUI8aghvXJt_rAVRavZQTkhh06Aa63d7jyLwgF6DDiNHZdPm3E1unhW1fNqk4Pllv8oGBUDLaYGo9-dJkxagjG1uCyePfaaYhc7wTTTNWXeTRnWqWHWkwJBJl1eG46T69iYpTZ0c2bMboO-SY4xyeepZTbh0z0cNjRwTO5332Q19kCSwWputFCVzV4zSKCOfk80t7PhQ';

const baseURL = 'http://sorokinvov4ik.amocrm.ru/api/v4';

const limit = 25;
let page = 1;

const getContacts = async () => {
    try {
        const data = await $.ajax({
            url: `${baseURL}/contacts`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                limit: limit,
                with: "leads",
                page: page,
            }
        });
        return data._embedded.contacts;
    } catch (error) {
        console.error('Ошибка при получении контактов:', error);
        throw error; // Пробрасываем ошибку для дальнейшей обработки
    }
};

const displayContacts = async () => {
    try {
        const contacts = await getContacts();
        for (let i = 0; i < contacts.length; i++) {
            console.log(`id: ${contacts[i].id}; name: ${contacts[i].name}`);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

displayContacts();
