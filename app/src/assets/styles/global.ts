export const screenTitleFontSize = function (screenWidth: number): number {
  return screenWidth < 400 ? 30 : 40;
}

export const containerStyles = function (width: number): any {
  return {
    flex: 1,
    backgroundColor: '#FFF1E6',
    padding: 16,
    paddingTop: 25,
    paddingBottom: 80,
  };
};

export const modalOverflowStyles = function (screenWidth: number): any {
  return {
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

export const addButtonReminderStyles = function (width: number): any {
  return {
    backgroundColor: '#E67E22',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  };
};

export const closeButtonReminderStyles = function (width: number): any {
  return {
    backgroundColor: 'red',
    width: 25,
    height: 25,
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

export const closeStyles = function (width: number): any {
  return {
    color: '#fff',
    fontSize: 10,
    lineHeight: 25,
  };
}

export const iconStyles = function (): any {
  return {
    height: 20,
    width: 15
  }
}

export const leadTableStyles = function (width: number): any {
  return {
    color: '#E67E22',
    fontSize: 18,
    fontWeight: 'bold'
  };
}

export const leadChartStyles = function (width: number): any {
  return {
    color: '#E67E22',
    fontSize: 14,
    fontWeight: 'thin',
    fontStyle: 'italic',
    textAlign: 'center',
  };
}

export const flexJustifyBetweenStyles = function (width: number): any {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  };
}

export const erroStyles = function (): any {
  return {

    color: 'red',
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',

  }
}

export const smallModalStyles = {
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

  header: (): any => ({
    fontSize: 30,
    marginBottom: 10,
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

  disableButton: (): any => ({
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
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

export const fullScreenModalStyles = {
  fullScreenModal: (): any => ({
    flex: 1,
    backgroundColor: '#FFF1E6',
    padding: 16,
  }),
  header: (width: number): any => ({
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
  }),
  input: (): any => ({
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  }),
  row: (): any => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }),
  column: (): any => ({
    flexDirection: 'column',
    marginBottom: 10,
  }),
  selectedButton: (): any => ({
    backgroundColor: '#D35400',
  }),
  buttonText: (): any => ({
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }),
  logo: (width: number): any => ({
    width: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  }),
  buttonTextSmall: (): any => ({
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }),
  columnButton: (): any => ({
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E67E22'
  }),
  rowButton: (): any => ({
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#E67E22'
  }),
  leftMargin: (): any => ({
    marginLeft: 5,
  }),
  rightMargin: (): any => ({
    marginRight: 5,
  }),
  addButton: (): any => {
    return {
      backgroundColor: '#E67E22',
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      marginTop: 5,
    };
  },
  plus: (): any => {
    return {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      lineHeight: 25,
    };
  },
  listHeight: (): any => {
    return {
      minHeight: 50,
      maxHeight: 260
    };
  }
};

export const redBackground = (): any => {
  return { backgroundColor: '#E74C3C' }
};

export const grayBackground = (): any => {
  return { backgroundColor: '#BDC3C7' }
}