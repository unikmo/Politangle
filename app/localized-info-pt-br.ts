import type { InfoPageId, PageCopy } from './LocalizedInfoPage';

const verifiedContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? '';
const contactValue = verifiedContactEmail || 'Ainda não publicado';

export const ptBrInfoPages: Record<InfoPageId, PageCopy> = {
  method: {
    eyebrow:'MÉTODO',
    title:'Oito perguntas que a política costuma misturar.',
    intro:'O Politangle não presume que uma única linha entre esquerda e direita consiga descrever toda posição política. O modelo separa oito dilemas recorrentes para mostrar onde suas combinações são consistentes, mistas ou pouco usuais.',
    sections:[],
  },
  validation: {
    eyebrow:'VALIDAÇÃO E LIMITES',
    title:'Clareza sobre o que já foi demonstrado — e o que ainda não foi.',
    intro:'A lógica de pontuação é testada quanto à consistência técnica. Validade psicométrica, equivalência entre idiomas e adequação para sala de aula exigem evidências separadas.',
    sections:[
      { title:'Situação atual', status:'VERSÃO EM VALIDAÇÃO', paragraphs:['O sistema atual verifica consistência da pontuação, quantidade de perguntas, geração de resultados e regras de privacidade em sala de aula. Isso demonstra consistência de implementação, não validade psicométrica.'] },
      { title:'Ainda não estabelecido', bullets:['Normas representativas de população','Confiabilidade teste–reteste','Equivalência dos construtos entre idiomas e faixas etárias','Compreensão cognitiva com os públicos Junior e Youth','Validade preditiva para voto ou comportamento político'] },
      { title:'Não leia demais no resultado', paragraphs:['As pontuações são indicadores gerados pelo modelo atual. Um valor como 61/100 não significa uma probabilidade científica de alguém “ser” uma ideologia. Referências históricas ajudam a ilustrar tradições; não representam endosso nem equivalência.'] },
      { title:'Uso em escolas', callout:'O uso com estudantes reais menores de idade exige revisão jurídica qualificada, testes de acessibilidade e validação de conteúdo adequada à idade antes de ser habilitado.' },
    ],
  },
  privacy: {
    eyebrow:'PRIVACIDADE',
    title:'Coletar menos. Explicar com clareza. Proteger opiniões políticas.',
    intro:'Esta página descreve a arquitetura atual de privacidade. Alguns dados operacionais e uma revisão jurídica qualificada ainda precisam ser concluídos antes de um lançamento comercial ou uso real em escolas.',
    sections:[
      { title:'Status jurídico', status:'REQUIRES QUALIFIED LEGAL REVIEW', callout:'Politangle é um projeto da TSquare Ventures LLC, 30 N Gould St Ste R, Sheridan, WY 82801, USA. O contato público monitorado e os detalhes finais sobre hospedagem, transferências, retenção e direitos devem ser confirmados antes do lançamento.' },
      { title:'BELIEVE / Quick e Full', paragraphs:['As respostas políticas são usadas no navegador para calcular o resultado. A arquitetura pública atual não vincula deliberadamente as respostas BELIEVE nem o perfil político à conta.','Depois do primeiro Quick concluído, um cookie estritamente funcional pode lembrar apenas que já houve uma primeira tentativa, para exigir login em uma nova tentativa. Esse cookie não contém suas respostas nem seu resultado.'] },
      { title:'Conta', paragraphs:['Ao criar uma conta gratuita, o sistema processa e-mail, identificador de conta, status de verificação e dados de segurança e sessão. O cookie de sessão HTTP-only dura atualmente até cinco dias.'] },
      { title:'Certificação, escola e fornecedores', paragraphs:['A certificação processa os dados necessários da tentativa e do certificado e permanece sujeita às barreiras de validação publicadas. O modo escolar usa identificadores temporários e resultados agregados. Os fornecedores previstos incluem Netlify para hospedagem, Google Firebase para autenticação e dados de conta/certificação e Stripe apenas quando o pagamento de certificados for ativado.'] },
      { title:'Cookies, retenção e direitos', paragraphs:['Os cookies atuais são funcionais: sessão e registro de conclusão do primeiro Quick. O repositório não instala deliberadamente rastreamento publicitário ou analítico. Os demais prazos de retenção e os detalhes finais de direitos e autoridade supervisora devem ser definidos antes do lançamento.'] },
    ],
  },
  terms: {
    eyebrow:'TERMOS',
    title:'Termos de uso do Politangle.',
    intro:'O modelo previsto combina conta gratuita, avaliações e aprendizado gratuitos e um certificado pago separado após a aprovação na certificação.',
    sections:[
      { title:'Status jurídico', status:'REQUIRES QUALIFIED LEGAL REVIEW', callout:'O operador é a TSquare Ventures LLC. Lei aplicável, resolução de conflitos, contato eletrônico direto e condições comerciais finais ainda precisam ser concluídos e passar por revisão jurídica qualificada antes de qualquer serviço pago.' },
      { title:'Acesso e conta', paragraphs:['O primeiro Quick pode ser feito sem conta. Para iniciar um novo Quick independente depois do primeiro concluído, é necessária uma conta gratuita. A arquitetura atual não vincula deliberadamente as respostas BELIEVE à conta.'] },
      { title:'Prática, certificação e certificado', paragraphs:['Glossário, prática e tentativas certificadas são gratuitos dentro dos limites publicados. A certificação segue as regras de idade e validação publicadas. O certificado personalizado é um produto pago separado após aprovação; preço e condições precisam ser exibidos antes da compra.'] },
      { title:'Uso, mudanças e direitos', paragraphs:['Não é permitido falsificar identidade, contornar limites ou abusar do serviço ou dos certificados. O Politangle pode versionar e melhorar perguntas, explicações e métodos. Direitos obrigatórios do consumidor e responsabilidades que não possam ser excluídas continuam aplicáveis.'] },
    ],
  },
  about: {
    eyebrow:'SOBRE O POLITANGLE',
    title:'Compreensão política sem uma única caixinha.',
    intro:'O Politangle ajuda pessoas a explorar dilemas políticos, separar opinião de conhecimento e discutir divergências sem expor perfis políticos individuais em sala de aula.',
    sections:[
      { title:'O problema', paragraphs:['A linguagem política costuma comprimir combinações complexas de opiniões em um único rótulo. Isso esconde diferenças importantes e pode tornar a discordância mais tribal do que informativa.'] },
      { title:'A abordagem', paragraphs:['O Politangle mantém várias dimensões visíveis, separa BELIEVE de CLASSIFY e UNDERSTAND e trata incerteza como uma resposta legítima — não como falha de pontuação.'] },
      { title:'Nosso padrão', paragraphs:['Neutralidade não fica comprovada apenas porque vários pontos de vista aparecem na tela. Redação, pontuação, versões em diferentes idiomas e uso em sala de aula precisam continuar abertos a crítica, teste e revisão.'] },
    ],
  },
  contact: {
    eyebrow:'CONTATO',
    title:'Fale com o Politangle.',
    intro: verifiedContactEmail ? `Para suporte de conta, privacidade, escolas e comunicações legais: ${verifiedContactEmail}.` : 'Consultas sobre conta, privacidade, escolas e assuntos jurídicos devem ser encaminhadas pelo canal correto. Um contato público monitorado ainda precisa ser configurado.',
    sections:[
      { title:'Status', status: verifiedContactEmail ? 'CONTATO CONFIGURADO' : 'REQUIRES VERIFIED CONTACT', callout: verifiedContactEmail ? `Contato público monitorado: ${verifiedContactEmail}. A revisão jurídica qualificada dos avisos finais continua necessária.` : 'Ainda não existe um endereço público do Politangle verificado e monitorado em produção. Nenhum endereço será inventado.' },
      { title:'Operador e endereço postal', paragraphs:['Politangle é um projeto da TSquare Ventures LLC, 30 N Gould St Ste R, Sheridan, WY 82801, USA.', verifiedContactEmail ? `E-mail: ${verifiedContactEmail}. Nunca envie senhas ou tokens de autenticação.` : 'Um e-mail monitorado próprio do Politangle ainda precisa ser configurado. Nunca envie senhas ou tokens de autenticação.'] },
      { title:'Privacidade, jurídico e escolas', paragraphs:['O contato final precisa conseguir receber solicitações de direitos e notificações formais. Para assuntos escolares, use a rota do piloto e evite enviar nomes de estudantes, respostas políticas ou outros dados sensíveis desnecessários.'], link:{ href:'/school/pilot', label:'Informações sobre o piloto escolar →' } },
    ],
  },
  imprint: {
    eyebrow:'INFORMAÇÕES LEGAIS',
    title:'Informações do prestador.',
    intro:'Politangle é um projeto da TSquare Ventures LLC.',
    sections:[
      { title:'Status', status:'REQUIRES QUALIFIED LEGAL REVIEW', callout:'O operador e o endereço já estão identificados. Contato eletrônico direto e eventuais informações registrais, fiscais, de representação ou de solução de conflitos devem ser acrescentados somente a partir de documentos verificados e com revisão jurídica qualificada.' },
      { title:'Informações', table:[['Operador / prestador','TSquare Ventures LLC'],['Forma jurídica','Limited Liability Company (LLC)'],['Endereço físico','30 N Gould St Ste R, Sheridan, WY 82801, USA'],['Contato eletrônico direto',contactValue],['Representante autorizado','[SE APLICÁVEL]'],['Registro e número','[SE APLICÁVEL]'],['Identificação fiscal / VAT','[SE APLICÁVEL]'],['Autoridade / regras profissionais','[SE APLICÁVEL]'],['Resolução de conflitos de consumo','[A CONFIRMAR]']] },
    ],
  },
  'question-banks': {
    eyebrow:'VERSÕES DOS BANCOS DE PERGUNTAS',
    title:'Públicos diferentes. Formas separadas e rastreáveis.',
    intro:'Mudar o idioma não altera silenciosamente o contexto de país, os construtos de pontuação nem a avaliação adulta. Mudanças materiais recebem uma nova versão.',
    sections:[
      { title:'Adulto', table:[['Quick','26 perguntas'],['Full','42 perguntas no total'],['Status','A avaliação adulta continua sendo um formulário próprio']] },
      { title:'Youth 14–18', paragraphs:['Uma versão Youth em linguagem mais simples cobre os mesmos construtos centrais. Adequação à idade e equivalência dos construtos ainda exigem validação.'] },
      { title:'Junior 10–13', paragraphs:['Um banco Junior separado usa frases mais curtas e simples para sala de aula. Ele precisa ser testado com usuários da faixa etária antes do uso real em escolas.'] },
      { title:'Idiomas', paragraphs:['Inglês, alemão, espanhol, francês e português do Brasil são camadas de idioma — não perfis de país. Exemplos específicos de países, eleições, partidos ou campanhas exigem versões editoriais próprias.'] },
    ],
  },
  'school-pilot': {
    eyebrow:'PILOTO ESCOLAR CONTROLADO',
    title:'Quer testar o Politangle com educadores?',
    intro:'O piloto escolar é uma etapa controlada de pesquisa e validação, não uma liberação geral para uso com estudantes reais.',
    sections:[
      { title:'O que será testado', bullets:['Clareza das instruções e perguntas','Adequação por faixa etária','Compreensão das explicações','Fluxo do professor e do projetor','Privacidade e utilidade dos resultados agregados'] },
      { title:'Proteção do estudante', paragraphs:['O desenho evita listas de nomes e mapas entre estudante e resposta. Mesmo assim, uso real com menores exige revisão jurídica qualificada, acessibilidade e validação educacional antes da liberação.'] },
      { title:'Situação atual', status:'PILOTO EM PREPARAÇÃO', callout:'Manifestar interesse não autoriza uso com estudantes reais. A equipe deve liberar explicitamente o piloto após o cumprimento das barreiras de privacidade, jurídico e validação.' },
    ],
  },
};
