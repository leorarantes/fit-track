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