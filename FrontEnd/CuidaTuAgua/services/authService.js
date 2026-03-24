export const loginUser = async ({ identifier, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    (identifier === '123456' || identifier === 'correo@cuidatuagua.com') &&
    password === '1234'
  ) {
    return {
      success: true,
      user: {
        id: 1,
        name: 'Diego Pedro Felix Messi',
        email: 'correo@cuidatuagua.com',
        document: '123456',
      },
      homes: [
        {
          id: 1,
          name: 'Hogar 1',
          address: 'Cra 3 Sur #29-137',
          stratum: 3,
          inhabitants: 4,
        },
      ],
    };
  }

  return {
    success: false,
    message: 'Credenciales inválidas',
  };
};

export const registerUser = async ({
  fullName,
  document,
  email,
  password,
  homeName,
  address,
  stratum,
  inhabitants,
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!fullName || !document || !email || !password) {
    return {
      success: false,
      message: 'Faltan datos obligatorios del usuario',
    };
  }

  if (!homeName || !address || !stratum || !inhabitants) {
    return {
      success: false,
      message: 'Faltan datos del hogar',
    };
  }

  return {
    success: true,
    message: 'Cuenta creada correctamente. Revisa tu correo para validarlo.',
    user: {
      id: Date.now(),
      name: fullName,
      email,
      document,
      emailVerified: false,
    },
    home: {
      id: Date.now() + 1,
      name: homeName,
      address,
      stratum,
      inhabitants,
    },
  };
};