import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../pages/login.po';

describe('Login', () => {

  let loginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.navigateTo('/');
  });

  it('should show a login button', async () => {
    expect(loginPage.getHeader()).toMatch(/Welcome, Java Hipster/);
    expect(await loginPage.loginButton.isPresent());
  });

  it('should fail to login with bad password', async () => {
    await loginPage.signInButton.click();
    await loginPage.login('admin', 'foo');
    const error = element(by.css('.toast-message'));
    if (await error.isPresent()) {
      expect(await error.getText()).toMatch(/Unable to sign in/);
    }
  });

  it('should login successfully with admin account', async () => {
    await loginPage.signInButton.click();
    await loginPage.login('admin', 'admin'); // use process.env.E2E_USERNAME if you want to use env variables

    const welcome = /Welcome, Administrator/;
    await browser.wait(ec.visibilityOf(loginPage.logoutButton));
    expect(element.all(by.css('ion-title')).getText()).toMatch(welcome);
  });

  it('should logout successfully', async () => {
    if (await loginPage.logoutButton.isPresent()) {
      await loginPage.logout();
      await browser.wait(ec.urlContains('/'));
      expect(await loginPage.signInButton.isPresent());
    }
  });
});
