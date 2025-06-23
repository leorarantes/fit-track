describe('TrainingSessions', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to Training Sessions tab', async () => {
    await element(by.id('navigateToRegisterButton')).tap();
    await element(by.id('nameInput')).typeText('Test User');
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('registerButton')).tap();
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await element(by.label('Treinos')).tap();
    await expect(element(by.id('trainingSessionScreen'))).toBeVisible();
    await expect(element(by.id('trainingSessionList'))).toBeVisible();
  });

  it('should create a training session, try to create a training session exercise without creating an exercise and fail', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await element(by.label('Treinos')).tap();
    await expect(element(by.id('trainingSessionScreen'))).toBeVisible();
    await expect(element(by.id('trainingSessionList'))).toBeVisible();
    await element(by.id('plusButton')).tap();
    await element(by.id('nameInput')).replaceText('Novo Treino');
    await element(by.id('dateInput')).replaceText('2025-06-15');
    await element(by.id('trainingSessionTypeButton-hypertrophy')).tap();
    await element(by.id('observationsInput')).replaceText('Observações do treino');
    await element(by.id('saveTrainingSessionButton')).tap();
    await expect(element(by.id('trainingSessionCard-1'))).toBeVisible();
    await element(by.id('trainingSessionCard-1')).tap();
    await element(by.id('nameInput')).replaceText('Treino Editado');
    await element(by.id('addTrainingSessionXExerciseButton')).tap();
    await expect(element(by.text('Aviso'))).toBeVisible();
    await element(by.text('OK')).tap();
  });

  it('should create a training session, edit it, create a training session exercise, edit it and delete both', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await element(by.label('Exercicios')).tap();
    await expect(element(by.id('exercisesScreen'))).toBeVisible();
    await expect(element(by.id('exerciseList'))).toBeVisible();
    await element(by.id('plusButton')).tap();
    await element(by.id('nameInput')).replaceText('Novo Exercício');
    await element(by.id('muscleButton-arms')).tap();
    await element(by.id('favoriteCheckbox')).tap();
    await element(by.id('saveButton')).tap();
    await expect(element(by.id('exerciseCard-1'))).toBeVisible();
    await element(by.label('Treinos')).tap();
    await expect(element(by.id('trainingSessionScreen'))).toBeVisible();
    await expect(element(by.id('trainingSessionList'))).toBeVisible();
    await element(by.id('plusButton')).tap();
    await element(by.id('nameInput')).replaceText('Novo Treino');
    await element(by.id('dateInput')).replaceText('2025-06-15');
    await element(by.id('trainingSessionTypeButton-hypertrophy')).tap();
    await element(by.id('observationsInput')).replaceText('Observações do treino');
    await element(by.id('saveTrainingSessionButton')).tap();
    await expect(element(by.id('trainingSessionCard-1'))).toBeVisible();
    await element(by.id('trainingSessionCard-1')).tap();
    await element(by.id('nameInput')).replaceText('Treino Editado');
    await element(by.id('trainingSessionTypeButton-strength')).tap();
    await element(by.id('saveTrainingSessionButton')).tap();
    await expect(element(by.id('trainingSessionCard-1'))).toBeVisible();
    await element(by.id('trainingSessionCard-1')).tap();
    await expect(element(by.id('nameInput'))).toHaveText('Treino Editado');
    await element(by.id('addTrainingSessionXExerciseButton')).tap();
    await element(by.id('exerciseCard-1')).tap();
    await element(by.id('weightInput')).replaceText('10');
    await element(by.id('repsInput')).replaceText('12');
    await element(by.id('setsInput')).replaceText('3');
    await element(by.id('saveTrainingSessionXExerciseButton')).tap();
    await expect(element(by.id('trainingSessionXExerciseCard-1'))).toBeVisible();
    await element(by.id('trainingSessionXExerciseCard-1')).tap();
    await element(by.id('weightInput')).replaceText('15');
    await element(by.id('saveTrainingSessionXExerciseButton')).tap();
    await expect(element(by.id('trainingSessionXExerciseCard-1'))).toBeVisible();
    await element(by.id('trainingSessionXExerciseCard-1')).tap();
    await expect(element(by.id('weightInput'))).toHaveText('15');
    await element(by.id('deleteTrainingSessionXExerciseButton')).tap();
    await expect(element(by.id('trainingSessionXExerciseCard-1'))).not.toBeVisible();
    await element(by.id('deleteTrainingSessionButton')).tap();
    await expect(element(by.id('trainingSessionCard-1'))).not.toBeVisible();
  });
});