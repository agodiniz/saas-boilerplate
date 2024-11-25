export const calculatePasswordStrength = (password: string) => {
  let score = 0;
  let message = "";

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 0:
    case 1:
      message = "Muito fraca";
      break;
    case 2:
      message = "Fraca";
      break;
    case 3:
      message = "Média";
      break;
    case 4:
      message = "Forte";
      break;
    case 5:
      message = "Muito forte";
      break;
  }

  return { score, message };
};
