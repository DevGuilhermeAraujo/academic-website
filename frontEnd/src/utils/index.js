// Função para validar e-mail
export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  
  // Função para validar senha
  export const validatePassword = (password) => {
    return (
      password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };
  
  // Função para validar CPF (básico, pode ser aprimorado)
  export const validateCPF = (cpf) => {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, "");
    return cleanCPF.length === 11; // Verifica se tem 11 dígitos
  };
  
  // Função para formatar CPF
  export const formatCPF = (cpf) => {
    let input = cpf.replace(/\D/g, "");
    let length = input.length;
  
    if (length > 11) {
      return input.slice(0, 11);
    }
  
    if (length >= 4 && length <= 6) {
      return input.slice(0, 3) + "." + input.slice(3);
    } else if (length >= 7 && length <= 9) {
      return input.slice(0, 3) + "." + input.slice(3, 6) + "." + input.slice(6);
    } else if (length >= 10) {
      return input.slice(0, 3) + "." + input.slice(3, 6) + "." + input.slice(6, 9) + "-" + input.slice(9);
    }
  
    return input;
  };
  