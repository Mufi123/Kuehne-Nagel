const env = Cypress.env(`testEnvironment`).replace("cl-", "");
const common = require(`../../test/secrets/common.json`);
const portalSecret = require(`../../test/secrets/cl-portal.json`);
const devSecret = require(`../../test/secrets/cl-dev.json`);
const config = env === "portal" ? portalSecret : devSecret;
const auth0 = {
  accessTokenUrl: `https://hue-${env}.eu.auth0.com/api/v2/users`,
  clientUrl: `https://hue-${env}.eu.auth0.com/oauth/token`,
  hueClientUrl: `https://auth-${env}.meethue.com/oauth/token`,
  audience: `https://account-${env}.meethue.com`,
  baseUrl: `https://account-${env}.meethue.com`,
  tokenAudience: `https://hue-${env}.eu.auth0.com/api/v2/`,
  clientId: config.Auth0.clientid,
  clientSecret: config.Auth0.clientsecret,
};

Cypress.on("uncaught:exception", () => {
  return false;
});

cy.testHelper = {
  baseUrl: () => {
    return auth0.baseUrl;
  },

  handleRateLimit: () => {
    let authorization;
    env === "portal"
      ? (authorization = portalSecret["schrodingers-cat"].authorization)
      : (authorization = devSecret["schrodingers-cat"].authorization);

    cy.request({
      method: "POST",
      url: `https://services-${env}.meethue.com/tester/api/heimdall/flush-heimdall-redis`,
      headers: {
        "authorization": authorization,
        "content-type": "application/json",
      },
    });
  },

  createVerifiedAccount: (countryCode, emailAddress = ``, emailVerified = true) => {
    return cy.testHelper.createAccount(`registered`, emailVerified, true, false, emailAddress, countryCode);
  },

  createUnverifiedAccount(countryCode) {
    return cy.testHelper.createAccount("unverified", false, false, "", "", countryCode);
  },

  createAccount: (prefix, emailVerified, registered, isSocial, emailAddress, countryCode = `NL`) => {
    const accountInfo = cy.testHelper.createAccountInfo(prefix, isSocial);
    if (emailAddress) accountInfo.email = emailAddress;
    cy.testHelper
      .createAuth0User(
        accountInfo,
        countryCode,
        emailVerified,
        countryCode === `RU` ? `Russia` : `Username-Password-Authentication`,
      )
      .then((response) => {
        cy.log(response);
        accountInfo.userId = response.body.user_id;
        accountInfo.auth0Id = response.body.identities[0].user_id;
      });

    cy.testHelper.getAuth0Token(accountInfo.email, accountInfo.password, false, countryCode, []).then((response) => {
      accountInfo.accessToken = response.body.access_token;
      accountInfo.agreeTerms = true;
      accountInfo.language = "en-us";
      accountInfo.country = countryCode !== undefined ? countryCode : "NL";
    });
    return accountInfo;
  },

  createAccountInfo: (prefix, isSocial = false, password = common.defaultAuth0EmailPassword) => {
    cy.log("***Create Auth0 Account Info***");
    let email;
    const name = `hue.cloud.team+` + prefix + Date.now();
    if (isSocial) email = name + `@scoogle.q42.nl`;
    else email = name + `@gmail.com`;
    prefix = prefix || `ta`;
    return { name: name, email: email, password: password };
  },

  createAuth0User: (
    accountInfo,
    countryCode = `NL`,
    emailVerified = true,
    connection = `Username-Password-Authentication`,
  ) => {
    if (!accountInfo) {
      accountInfo = cy.testHelper.createAccountInfo();
    }

    return cy.testHelper.getAuth0Token(accountInfo.email, accountInfo.password, true, countryCode).then((response) => {
      const authorization = response.body.access_token;
      cy.request({
        method: `POST`,
        url: auth0.accessTokenUrl,
        headers: {
          "authorization": "Bearer " + authorization,
          "content-type": "application/json",
        },
        json: {
          email: accountInfo.email,
          password: accountInfo.password,
          connection: connection,
          email_verified: emailVerified,
        },
      });
    });
  },

  getAuth0Token: (email, password, user = false, countryCode = `NL`, extraScopes) => {
    let url;
    extraScopes = Array.isArray(extraScopes) ? extraScopes : [];
    const scopes = [
      ...extraScopes,
      `read:users`,
      `update:users`,
      `delete:users`,
      `read:users_app_metadata`,
      `update:users_app_metadata`,
      `create:users_app_metadata`,
    ];

    const NLJson = {
      grant_type: `password`,
      username: email,
      password: password,
      audience: auth0.audience,
      scope: scopes.join(` `),
      client_id: auth0.clientId,
      client_secret: auth0.clientSecret,
    };
    const RUJson = {
      realm: `Russia`,
      grant_type: `http://auth0.com/oauth/grant-type/password-realm`,
      username: email,
      password: password,
      audience: auth0.audience,
      scope: scopes.join(` `),
      client_id: auth0.clientId,
      client_secret: auth0.clientSecret,
    };
    let json = countryCode === `RU` ? RUJson : NLJson;

    if (!email) {
      throw new Error(`No email specified`);
    }

    if (user) {
      cy.log(`***Create Account Token***`);
      url = auth0.clientUrl;
      json = {
        client_id: auth0.clientId,
        client_secret: auth0.clientSecret,
        audience: auth0.tokenAudience,
        grant_type: "client_credentials",
        username: email,
        password: password,
      };
    } else {
      url = auth0.hueClientUrl;
    }
    return cy.request({
      method: `POST`,
      url: url,
      headers: {
        "content-type": "application/json",
      },
      json: json,
    });
  },

  deleteAccount: (email, auth0Id, countryCode) => {
    cy.testHelper.getAuth0Token(email, common.defaultEmailPassword, true, countryCode).then((responseAuthToken) => {
      cy.log("***Delete account from auth0***");
      cy.request({
        method: "DELETE",
        url: decodeURI(auth0.accessTokenUrl + "/" + auth0Id),
        headers: {
          "authorization": "Bearer " + responseAuthToken.body.access_token,
          "content-type": "application/json",
          "accept": "text/vnd.heimdall.v1+plain",
        },
        json: {
          email: email,
          password: common.defaultEmailPassword,
          connection: "Username-Password-Authentication",
        },
      });
    });
  },
};

cy.heimdallHelper = {
  login(email, password = common.defaultAuth0EmailPassword, emailObject = "#username", passwordObject = "#password") {
    this.type(emailObject, email);
    this.type(passwordObject, password);
    cy.get('*[name^="action"]').should("be.visible").click();
  },

  validateMessage(element, value) {
    cy.get(element)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq(value);
      });
  },

  navigate(url = auth0.baseUrl) {
    cy.testHelper.handleRateLimit();
    cy.visit(url);
  },

  isVisible(element, text) {
    cy.get(element).then(($icon) => {
      if ($icon.is(":visible")) {
        cy.log(`${text}`);
      }
    });
  },

  type(element, text) {
    cy.get(element).clear();
    cy.get(element).should("be.visible").type(text, { sensitive: true });
  },

  getText(element) {
    return cy.get(element).invoke("text");
  },

  click(element) {
    cy.get(element).should("be.visible");
    cy.get(element).then(($object) => {
      if ($object.is(":visible")) {
        $object.click();
      }
    });
  },
};
