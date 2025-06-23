describe('TrainingHistory', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to History tab', async () => {
    await element(by.label('Historico')).tap();
    await expect(element(by.id('trainingHistoryScreen'))).toBeVisible();
    await expect(element(by.id('historyList'))).toBeVisible();
  });

  it('should create a history, edit it and delete it', async () => {
    await element(by.label('Historico')).tap();
    await expect(element(by.id('trainingHistoryScreen'))).toBeVisible();
    await expect(element(by.id('historyList'))).toBeVisible();
    await element(by.id('plusButton')).tap();
    await element(by.id('dateBegInput')).replaceText('2025-01-01');
    await element(by.id('dateEndInput')).replaceText('2025-12-15');
    await element(by.id('saveButton')).tap();
    await expect(element(by.id('trainingHistoryCard-1'))).toBeVisible();
    await element(by.id('trainingHistoryCard-1')).tap();
    await element(by.id('dateBegInput2')).replaceText('2024-12-01');
    await element(by.id('dateEndInput2')).replaceText('2025-10-15');
    await element(by.id('saveButton2')).tap();
    await expect(element(by.id('trainingHistoryCard-1'))).toBeVisible();
    await element(by.id('trainingHistoryCard-1')).tap();
    await element(by.id('deleteButton')).tap();
    await expect(element(by.id('trainingHistoryCard-1'))).not.toBeVisible();
  });
});