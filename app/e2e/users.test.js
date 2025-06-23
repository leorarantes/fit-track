describe('Users', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create an user', async () => {
    await element(by.id('navigateToRegisterButton')).tap();
    await element(by.id('nameInput')).typeText('Test User');
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('registerButton')).tap();
  });

  it('should successfully login', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await element(by.label('Exercicios')).tap();
    await expect(element(by.id('exercisesScreen'))).toBeVisible();
    await expect(element(by.id('exerciseList'))).toBeVisible();
  });

  it('should try to login with incorrect password and fail', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('wrongpassword');
    await element(by.id('loginButton')).tap();
    await expect(element(by.text('Erro'))).toBeVisible();
  });
});