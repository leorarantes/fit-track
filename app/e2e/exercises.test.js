describe('Exercises', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should display the list of exercises', async () => {
    await expect(element(by.id('exerciseList'))).toBeVisible();
  });

  it('should create an exercise, edit it and delete it', async () => {
    await element(by.id('plusButton')).tap();
    await element(by.id('nameInput')).replaceText('Novo Exercício');
    await expect(element(by.id('nameInput'))).toHaveText('Novo Exercício');
    await element(by.id('muscleButton-arms')).tap();
    await element(by.id('favoriteCheckbox')).tap();
    await element(by.id('saveButton')).tap();
    await expect(element(by.id('exerciseCard-1'))).toBeVisible();
    await element(by.id('exerciseCard-1')).tap();
    await element(by.id('nameInput')).replaceText('Exercício Editado');
    await expect(element(by.id('nameInput'))).toHaveText('Exercício Editado');
    await element(by.id('muscleButton-legs')).tap();
    await element(by.id('favoriteCheckbox')).tap();
    await element(by.id('saveButton')).tap();
    await expect(element(by.id('exerciseCard-1'))).toBeVisible();
    await element(by.id('exerciseCard-1')).tap();
    await expect(element(by.id('nameInput'))).toHaveText('Exercício Editado');
    await element(by.id('deleteButton')).tap();
    await expect(element(by.id('exerciseCard-1'))).not.toBeVisible();
  });
});