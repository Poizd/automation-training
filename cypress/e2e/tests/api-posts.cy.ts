//const apiPosts = 'htt://localhost:4200/api/posts';

import { faker } from "@faker-js/faker";
import { property } from "cypress/types/lodash";

const apiPosts = 'http://localhost:4200/api/posts/';

describe('User API', () => {
    context('GET /api/posts', () => {
        it('gets a list of posts', () => {

            cy.request('GET', `${apiPosts}`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.length).to.eq(100);
            });
        });
    });

    context('GET /api/posts/:postId', () => {
        it('get a post', () => {
            const postId = 2;
            cy.request('GET', `${apiPosts}/${postId}`).
                then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.deep.equal({
                        userId: 1,
                        id: postId,
                        title: 'qui est esse',
                        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
                    });
                });
        });
        it('Error when invalid postid', () => {
            cy.request({ method: 'GET', url: `${apiPosts}/1234`, failOnStatusCode: false }).
                then((response) => {
                    expect(response.status).to.eq(404);
                    expect(response.body).to.deep.equal({});
                });
        });

    });

    context('POST /posts/', () => {
        it('Add a post', () => {
            const newPost = {
                userId: 101,
                title: faker.lorem.sentences(),
                body: faker.lorem.text(),
            };

            cy.request('POST', apiPosts, newPost).
                then((response) => {
                    expect(response.status).to.eq(201);
                    expect(response.body).to.deep.equal({ id: 101, ...newPost });
                });
        });
        it('error with invalid fields sent', () => {
            const invalidPost = {
                notAPostField: 'not a post field'
            };

            cy.request({
                method: 'POST',
                url: apiPosts,
                failOnStatusCode: false,
                body: invalidPost
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.deep.equal({ id: 101, notAPostField: 'not a post field' });
            })
        });
    });
    //PATCH POST
    context('PATCH Post', () => {
        it('Edit a post with id=1', () => {
            const postId = 2;
            const editPost = {
                title: faker.lorem.sentences(),
                userId: 1,
                body: faker.lorem.text(),
            };

            cy.request('PATCH', `${apiPosts}/${postId}`, editPost).
                then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.deep.equal({ id: 2, ...editPost });
                    //console.log(response.body);
                });

        });
    });

    //Delete Post
    context('DELETE Post', () => {
        it('Delete post with id=2', () => {
            const postId = 2;

            cy.request('DELETE', `${apiPosts}${postId}`).
                then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.deep.equal({});
                });
        });
    });

    //GET Post Comments
    context('GET Post Comments', () => {
        it('get a post comment', () => {
            const postId = 1;
            cy.request('GET', `${apiPosts}${postId}/comments`).
                then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.be.a('Array');
                    //expect(response.body[0]).property('email').to.eq("Eliseo@gardner.biz");
                    expect(response.body[0]).to.deep.equal({
                        postId: 1,
                        id: postId,
                        name: 'id labore ex et quam laborum',
                        email: 'Eliseo@gardner.biz',
                        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
                    });
                });
        });
    });
});