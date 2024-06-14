export const msgsDict = (
  type?:
    | 'cnpj'
    | 'cpf'
    | 'network'
    | 'form'
    | 'date'
    | 'number'
    | 'numberMin'
    | 'unSelect'
    | 'select'
    | 'email'
    | 'password'
    | 'repeatPassword'
    | 'min'
    | 'minArray',
  num: number = 3,
): string => {
  switch (type) {
    case 'network':
      return 'Ocorreu um erro inesperado, Por Favor Tente novamente mais tarde';
    case 'form':
      return 'Preenchimento incorreto, por favor verifique os campos em destaque';
    case 'unSelect':
      return 'Seleção obrigatória';
    case 'min':
      return `Deve ter pelo menos ${num} caractere${num > 1 ? 's' : ''}`;
    case 'minArray':
      return `Deve ter pelo menos ${num} registro${num > 1 ? 's' : ''}`;
    case 'select':
      return 'Seleção inválida';
    case 'date':
      return 'Data inválida';
    case 'cnpj':
      return 'CNPJ inválido';
    case 'cpf':
      return 'CPF inválido';
    case 'password':
      return 'Senha insegura';
    case 'repeatPassword':
      return 'Senha e Confirmação devem ser iguais';
    case 'number':
      return 'Numero inválido';
    case 'numberMin':
      return `Deve ser maior ou igual ${num}`;
    case 'email':
      return 'Email inválido';
    default:
      return 'Preenchimento obrigatório';
  }
};
