import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { post } from 'cypress/types/jquery';

// https://playwright.dev/docs/test-api-testing
// https://jestjs.io/docs/expect

test.describe('Posts API', () => {
    test('GET /api/posts', async ({ request }) => {
        const response = await request.get('/api/posts');
        const posts = await response.json();
        // console.log(response);
        await expect(response.status()).toBe(200);
        await expect(posts.length).toBe(100);
    });

    test('GET /api/posts/:postId', async ({ request }) => {
        const postId = 3;
        const response = await request.get(`/api/posts/${postId}`);
        const post = await response.json();

        // console.log(response);
        // console.log('============');
        // console.log(post);

        await expect(response.status()).toBe(200);
        await expect(post).toEqual({
            userId: 1,
            id: postId,
            title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
            body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
        });
    });

    test('POST /api/posts', async ({ request }) => {
        const newPostData = {
            userId: 1,
            title: faker.lorem.sentences(),
            body: faker.lorem.text(),
        };

        const response = await request.post('/api/posts', { data: { ...newPostData } });
        const newPost = await response.json();

        await expect(response.status()).toBe(201);
        await expect(newPost).toEqual({ ...newPost, id: 101, });
    });
});