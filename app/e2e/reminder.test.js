describe('Reminder', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to Reminder tab', async () => {
    await element(by.id('navigateToRegisterButton')).tap();
    await element(by.id('nameInput')).typeText('Test User');
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('registerButton')).tap();
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await element(by.id('iconeSino')).tap();
  });

  it('should create a history, edit it and delete it', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await element(by.id('iconeSino')).tap();
    await expect(element(by.id('reminderModal'))).toBeVisible();
    await element(by.id('plusButtonReminder')).tap();
    await element(by.id('date')).replaceText('2025-06-26');
    await element(by.id('hour')).replaceText('01:15');
    await element(by.id('saveButton2')).tap();
    await expect(element(by.id('reminderCard-1'))).toBeVisible();
    await element(by.id('reminderCard-1')).tap();
    await element(by.id('edit-1')).tap();
    await element(by.id('date')).replaceText('2025-06-25');
    await element(by.id('hour')).replaceText('01:50');
    await element(by.id('saveButton2')).tap();
    await expect(element(by.id('reminderCard-1'))).toBeVisible();
    await element(by.id('reminderCard-1')).tap();
    await element(by.id('remove-1')).tap();
  });
});