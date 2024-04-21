// This is going to tell clerk how to phone home when we get a token

export default {
    providers: [
      {
        domain: "https://allowing-panda-44.clerk.accounts.dev",
        applicationID: "convex",
      },
    ]
  };