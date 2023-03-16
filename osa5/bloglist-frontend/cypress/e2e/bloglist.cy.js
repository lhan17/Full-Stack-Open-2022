describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen',
        }
        const user1 = {
            name: 'Matti1 Luukkainen',
            username: 'mluukkai1',
            password: 'salainen1',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.request('POST', 'http://localhost:3003/api/users/', user1)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })
    describe('Login', function () {
        const name = 'Matti Luukkainen'
        it('succeeds with correct credentials', function () {
            cy.get('#loginUsername').type('mluukkai')
            cy.get('#loginPassword').type('salainen')
            cy.get('#loginButton').click()

            cy.contains(`${name} logged in`)
            cy.contains('logout')
        })

        it('fails with wrong credentials', function () {
            cy.get('#loginUsername').type('mluukkai')
            cy.get('#loginPassword').type('kukka')
            cy.get('#loginButton').click()

            cy.contains('wrong username or password')
            cy.contains('login')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#loginUsername').type('mluukkai')
            cy.get('#loginPassword').type('salainen')
            cy.get('#loginButton').click()
        })

        it('A blog can be created', function () {
            cy.contains('create').click()
            cy.get('#title-input').type('FSO2022')
            cy.get('#author-input').type('MLuukkai')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#createButton').click()

            cy.contains('FSO2022 MLuukkai')
        })

        it('A blog can be liked', function () {
            cy.contains('create').click()
            cy.get('#title-input').type('FSO2022')
            cy.get('#author-input').type('MLuukkai')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#createButton').click()

            cy.contains('FSO2022 MLuukkai')
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1')
        })

        it('A blog can be removed', function () {
            cy.contains('create').click()
            cy.get('#title-input').type('FSO2022')
            cy.get('#author-input').type('MLuukkai')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#createButton').click()

            cy.contains('FSO2022 MLuukkai')
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.contains('blog FSO2022 deleted')
        })

        it('Only the one that added the blog to the list can delete it', function () {
            cy.contains('create').click()
            cy.get('#title-input').type('FSO2022')
            cy.get('#author-input').type('MLuukkai')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#createButton').click()

            cy.contains('FSO2022 MLuukkai')
            cy.contains('view').click()
            cy.contains('remove')
            cy.contains('logout').click()

            cy.get('#loginUsername').type('mluukkai1')
            cy.get('#loginPassword').type('salainen1')
            cy.get('#loginButton').click()

            cy.contains('FSO2022 MLuukkai')
            cy.contains('view').click()
            cy.get('.blog').should('not.contain', 'remove')
        })

        it('BLoglist order is right', function () {
            //first liked
            cy.contains('create').click()
            cy.get('#title-input').type('First Liked')
            cy.get('#author-input').type('MLuukkai')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#createButton').click()
            //second liked
            cy.contains('create').click()
            cy.get('#title-input').type('Second Liked')
            cy.get('#author-input').type('MLuukkai')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#createButton').click()
            //third liked
            cy.contains('create').click()
            cy.get('#title-input').type('Third Liked')
            cy.get('#author-input').type('MLuukkai')
            cy.get('#url-input').type('www.testing.com')
            cy.get('#createButton').click()

            //The clickking of the like button
            cy.contains('view').click()
            cy.get('.likebutton').click()
            cy.contains('1')
            cy.get('.likebutton').click()
            cy.contains('2')
            cy.get('.likebutton').click()
            cy.contains('3')

            cy.contains('view').click()
            cy.get('.likebutton').eq(1).click()
            cy.contains('1')
            cy.get('.likebutton').eq(1).click()
            cy.contains('2')

            cy.contains('view').click()
            cy.get('.likebutton').eq(2).click()
            cy.contains('1')

            cy.get('.blog').eq(0).should('contain', 'First Liked')
            cy.get('.blog').eq(1).should('contain', 'Second Liked')
            cy.get('.blog').eq(2).should('contain', 'Third Liked')
        })
    })
})
