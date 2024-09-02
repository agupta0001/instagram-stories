const mockUsers = [
  {
    id: "SDqolnwhpM6HsQhuD5eNr",
    name: "User 1",
    username: "User1",
    avatar: "https://avatars.githubusercontent.com/u/27469926",
    stories: [
      {
        id: "MZFgz1xL6w5p8IY5fb9fB",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        created: "2024-08-29T01:12:32.399Z",
        userId: "SDqolnwhpM6HsQhuD5eNr",
        type: "VID",
      },
      {
        id: "lxKJpRNg5XGYMkRdPY3Zt",
        url: "https://picsum.photos/seed/rzuY1PT/640/480",
        created: "2024-08-29T01:25:29.241Z",
        userId: "SDqolnwhpM6HsQhuD5eNr",
      },
    ],
  },
  {
    id: "dpBDTmmpkLccLQORUCQ13",
    name: "User 2",
    username: "User2",
    avatar: "https://avatars.githubusercontent.com/u/69004360",
    stories: [
      {
        id: "cSSDljPRGWQQVH6UcqkZy",
        url: "https://loremflickr.com/640/480?lock=5817403933982720",
        created: "2024-08-29T10:35:39.966Z",
        userId: "dpBDTmmpkLccLQORUCQ13",
      },
      {
        id: "hOx64b_yj8azUUqshNN6a",
        url: "https://loremflickr.com/640/480?lock=5812637132652544",
        created: "2024-08-28T23:54:20.312Z",
        userId: "dpBDTmmpkLccLQORUCQ13",
      },
    ],
  },
];

describe("Home Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/stories", {
      statusCode: 200,
      delay: 2000,
      body: mockUsers,
    }).as("getUsersAndStories");

    cy.visit("/");
  });

  it("should display loading state initially", () => {
    cy.contains("Loading...").should("be.visible");
  });

  it("should display user avatars when data is loaded", () => {
    cy.wait("@getUsersAndStories");

    cy.get('[data-testid="user-story-avatar"]').should("have.length", 2);
  });

  describe("Story View", () => {
    afterEach(() => {
      cy.wait(1000);

      cy.get('[data-testid="close-story"]').click();
    });

    it("should open the stories when a user avatar is clicked", () => {
      cy.wait("@getUsersAndStories");

      cy.get('[data-testid="user-story-avatar"]').first().click();
    });

    it("should show progress for stories of the user", () => {
      cy.wait("@getUsersAndStories");

      cy.get('[data-testid="user-story-avatar"]').first().click();

      cy.get('[data-testid="story-progress"]').should("have.length", 2);
    });

    it("should navigate through stories using next", () => {
      cy.wait("@getUsersAndStories");

      cy.get('[data-testid="user-story-avatar"]').first().click();

      cy.get(`[data-teststoryid="${mockUsers[0].stories[0].id}"]`)
        .should("be.visible")
        .click("right")
        .get(`[data-teststoryid="${mockUsers[0].stories[1].id}"]`)
        .should("be.visible");
    });

    it("should navigate through stories using prev", () => {
      cy.wait("@getUsersAndStories");

      cy.get('[data-testid="user-story-avatar"]').last().click();

      cy.get(`[data-teststoryid="${mockUsers[1].stories[0].id}"]`)
        .should("be.visible")
        .wait(500)
        .click("bottomLeft")
        .get(`[data-teststoryid="${mockUsers[0].stories[1].id}"]`)
        .should("be.visible");
    });
  });
});
