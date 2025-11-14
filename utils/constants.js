// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// Error Messages
const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'Usuário não encontrado',
  ARTICLE_NOT_FOUND: 'Artigo não encontrado',
  INVALID_CREDENTIALS: 'Email ou senha incorretos',
  EMAIL_ALREADY_EXISTS: 'Este email já está cadastrado',
  UNAUTHORIZED: 'Autorização necessária',
  FORBIDDEN: 'Acesso negado',
  VALIDATION_ERROR: 'Dados de validação inválidos',
  INTERNAL_ERROR: 'Erro interno do servidor',
  INVALID_ID: 'ID inválido',
};

// Success Messages
const SUCCESS_MESSAGES = {
  USER_CREATED: 'Usuário criado com sucesso',
  ARTICLE_SAVED: 'Artigo salvo com sucesso',
  ARTICLE_DELETED: 'Artigo removido com sucesso',
};

module.exports = {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
