describe('TrainingSessions', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to Training Sessions tab', async () => {
    await element(by.label('Treinos')).tap();
    await expect(element(by.id('trainingSessionScreen'))).toBeVisible();
    await expect(element(by.id('trainingSessionList'))).toBeVisible();
  });

  it('should create a training session, edit it and delete it', async () => {
    await element(by.label('Treinos')).tap();
    await expect(element(by.id('trainingSessionScreen'))).toBeVisible();
    await expect(element(by.id('trainingSessionList'))).toBeVisible();
    await element(by.id('plusButton')).tap();
    await element(by.id('nameInput')).replaceText('Novo Treino');
    await element(by.id('dateInput')).replaceText('2025-06-15');
    await element(by.id('typeButton-hypertrophy')).tap();
    await element(by.id('saveButton')).tap();
    await expect(element(by.id('trainingSessionCard-1'))).toBeVisible();
    await element(by.id('trainingSessionCard-1')).tap();
    await element(by.id('nameInput')).replaceText('Treino Editado');
    await element(by.id('typeButton-strength')).tap();
    await element(by.id('saveButton')).tap();
    await expect(element(by.id('trainingSessionCard-1'))).toBeVisible();
    await element(by.id('trainingSessionCard-1')).tap();
    await expect(element(by.id('nameInput'))).toHaveText('Treino Editado');
    await element(by.id('deleteButton')).tap();
    await expect(element(by.id('trainingSessionCard-1'))).not.toBeVisible();
  });
});