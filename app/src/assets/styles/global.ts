export const screenTitleFontSize = function(screenWidth: number): number {
  return screenWidth < 400 ? 30 : 40;
}

export const containerStyles = function (width: number): any {
  return {
    flex: 1,
    backgroundColor: '#FFF1E6',
    padding: 16,
    paddingBottom: 80,
  };
};

export const modalOverflowStyles = function(screenWidth: number) : any{
  return{
    height: '60%'
  }
}

export const logoStyles = function (width: number): any {
  return {
    width: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20
  };
};

export const headerStyles = function (width: number): any {
  return {
    fontSize: screenTitleFontSize(width),
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 2,
    borderColor: '#E67E22',
    borderRadius: 8,
    marginBottom: 16,
  };
};

export const cardStyles = function (width: number): any {
  return {
    backgroundColor: '#E67E22',
    padding: 14,
    marginVertical: 6,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  };
};

export const cardTitleStyles = function (width: number): any {
  return {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  };
};

export const cardSubtitleStyles = function (width: number): any {
  return {
    fontSize: 14,
    color: '#fff',
  };
};

export const addButtonStyles = function (width: number): any {
  return {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#E67E22',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  };
};

export const plusStyles = function (width: number): any {
  return {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
  };
}

export const leadTableStyles = function (width: number): any{
  return {
    color: '#E67E22',
    fontSize: 18,
    fontWeight: 'bold'
  };
}

export const leadChartStyles = function (width: number): any{
  return {
    color: '#E67E22',
    fontSize: 14,
    fontWeight: 'thin',
    fontStyle: 'italic',
    textAlign: 'center',
  };
}

export const flexJustifyBetweenStyles = function (width:number): any{
  return {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10
  };
}

export const modalStyles = {
  backdrop: (): any => ({
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  modal: (): any => ({
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  }),

  header: (width: number): any => ({
    fontSize: screenTitleFontSize(width),
    marginBottom: 20,
    color: '#E67E22',
    textAlign: 'center',
    fontWeight: 'bold',
  }),

  input: (): any => ({
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
    borderRadius: 5,
    marginVertical: 8,
  }),

  row: (): any => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 8,
  }),

  button: (width: number): any => ({
    width: '45%',
    marginVertical: 4,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#E67E22',
    alignItems: 'center',
  }),

  selectedButton: (): any => ({
    backgroundColor: '#D35400',
  }),

  buttonText: (): any => ({
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }),

  saveButton: (): any => ({
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#E67E22',
    alignItems: 'center',
  }),

  cancelButton: (): any => ({
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#999',
    alignItems: 'center',
  }),
};