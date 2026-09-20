import type { BeliefPolarity } from './belief-statements';

export const PORTUGUESE_BR_BELIEVE_VERSION = 'pt-br-believe-2026.09-candidate-v1' as const;

type Pair = readonly [string, string];

const ptBr: Record<string, Pair> = {
  T01: ['O Estado deve garantir que todas as pessoas tenham acesso a serviços essenciais, como saúde e educação.', 'O Estado deve interferir menos e deixar mais espaço para opções privadas nos serviços essenciais.'],
  T02: ['O Estado deve usar impostos e benefícios para reduzir grandes diferenças entre ricos e pobres.', 'O Estado deve interferir menos nas diferenças de renda, mesmo que a distância entre ricos e pobres continue grande.'],
  T03: ['Trabalhadores, cooperativas ou o Estado deveriam ter uma participação maior na propriedade das grandes empresas.', 'As grandes empresas deveriam pertencer principalmente a proprietários privados, com leis que protejam os trabalhadores.'],
  T04: ['As regras devem mudar com relativa rapidez quando muita gente passa a apoiar uma nova forma de viver.', 'Regras antigas só devem mudar quando a nova ideia tiver apoio amplo e duradouro.'],
  T05: ['Adultos devem poder tomar decisões privadas livremente quando não causam dano a outras pessoas.', 'Algumas decisões privadas podem ser limitadas para proteger valores morais compartilhados.'],
  T06: ['O aborto deve ser legal de forma ampla, porque a decisão principal deve caber à pessoa grávida.', 'O aborto deve ter limites legais mais rígidos para proteger a vida antes do nascimento.'],
  T07: ['O Estado só deve restringir a liberdade diante de um perigo claro e grave.', 'O Estado pode restringir certas liberdades mais cedo quando houver risco real de distúrbios graves.'],
  T08: ['Mesmo um governo eleito deve ser limitado por tribunais, leis, oposição e imprensa livre.', 'Um governo eleito deve conseguir executar seu programa mesmo quando tribunais ou outras instituições tentam barrá-lo.'],
  T09: ['Os países devem aceitar regras internacionais obrigatórias quando um problema ultrapassa fronteiras.', 'Cada país deve manter a palavra final, mesmo que isso enfraqueça soluções conjuntas.'],
  T10: ['Uma pessoa naturalizada pode pertencer ao país tanto quanto alguém que é cidadão desde o nascimento.', 'Ser cidadão desde o nascimento deve pesar mais para definir quem pertence plenamente ao país.'],
  T11: ['Na política, geralmente existem vários grupos com interesses reais e diferentes.', 'A política costuma ser uma disputa entre o povo comum e uma elite poderosa que o ignora.'],
  T12: ['Proteger a natureza deve, às vezes, ter prioridade sobre o crescimento econômico.', 'O crescimento econômico deve ter prioridade e a proteção ambiental deve limitá-lo o mínimo possível.'],
  T13: ['A religião não deve ser usada para justificar leis que valem para pessoas de todas as religiões.', 'Valores religiosos podem justificar leis mesmo quando nem todas as pessoas compartilham daquela religião.'],
  T14: ['O governo nacional ou regional deve administrar serviços importantes quando isso for necessário para garantir acesso igual.', 'Tarefas importantes devem ficar o mais perto possível das comunidades e subir de nível apenas quando necessário.'],

  F01: ['Me preocupa mais que algumas pessoas não consigam pagar por serviços essenciais.', 'Me preocupa mais que serviços públicos reduzam escolha e autonomia.'],
  F02: ['Grandes diferenças de renda me preocupam mais do que os impostos usados para reduzi-las.', 'Impostos altos me preocupam mais do que grandes diferenças de renda.'],
  F03: ['Acho mais justo que trabalhadores ou entidades públicas tenham uma participação maior na propriedade das grandes empresas.', 'Acho mais justo que investidores privados mantenham a maior parte da propriedade, com leis que protejam os trabalhadores.'],
  F04: ['Me incomoda mais quando regras públicas demoram a acompanhar uma mudança que já tem apoio amplo.', 'Me incomoda mais quando regras antigas são alteradas antes de a nova ideia ter apoio amplo.'],
  F05: ['Me incomoda mais quando o Estado limita decisões privadas de adultos que não causam dano.', 'Me incomoda mais quando valores morais compartilhados não têm peso nas leis.'],
  F06: ['No tema do aborto, me preocupa mais retirar a decisão da pessoa grávida.', 'No tema do aborto, me preocupa mais não proteger suficientemente a vida antes do nascimento.'],
  F07: ['Em uma crise, me preocupa mais o Estado usar poder demais.', 'Em uma crise, me preocupa mais as autoridades não terem poder suficiente para manter a segurança.'],
  F08: ['Me preocupa mais uma maioria eleita enfraquecer tribunais ou outros freios institucionais.', 'Me preocupa mais instituições não eleitas bloquearem repetidamente um governo eleito.'],
  F09: ['Me incomoda mais quando países deixam problemas comuns sem solução porque rejeitam acordos obrigatórios.', 'Me incomoda mais quando acordos internacionais limitam as decisões do meu país.'],
  F10: ['Pessoas naturalizadas me parecem tão parte do país quanto cidadãos desde o nascimento.', 'Cidadãos desde o nascimento me parecem pertencer mais plenamente ao país do que pessoas naturalizadas.'],
  F11: ['Quando a política falha, penso primeiro em escolhas difíceis e interesses diferentes.', 'Quando a política falha, penso primeiro em uma elite poderosa que ignora as pessoas comuns.'],
  F12: ['Quando não dá para ter tudo, me preocupa mais o dano à natureza e ao clima.', 'Quando não dá para ter tudo, me preocupam mais o emprego e o padrão de vida.'],
  F13: ['Me incomoda mais quando valores religiosos determinam leis para todas as pessoas.', 'Me incomoda mais quando uma opinião é rejeitada apenas por ser religiosa.'],
  F14: ['Me sinto mais seguro quando o poder público garante padrões semelhantes em todo o território.', 'Me sinto mais confortável quando famílias e comunidades conseguem resolver essas tarefas por conta própria.'],

  A01: ['Se uma clínica local corresse risco de fechar, eu apoiaria recursos públicos para mantê-la aberta a todos.', 'Se uma clínica local corresse risco de fechar, eu procuraria primeiro uma solução privada antes de colocar mais recursos públicos.'],
  A02: ['Eu pagaria um pouco mais de impostos se isso ajudasse famílias de renda muito baixa.', 'Eu escolheria impostos menores mesmo que sobrasse menos dinheiro para apoiar famílias de renda muito baixa.'],
  A03: ['Em uma grande empresa, eu daria aos trabalhadores uma participação na propriedade e voz em decisões importantes.', 'Em uma grande empresa, eu deixaria a propriedade e as decisões importantes principalmente nas mãos de investidores privados.'],
  A04: ['Se uma regra antiga de uma escola já não combinasse com a vida da maioria, eu a mudaria com relativa rapidez.', 'Eu manteria uma regra antiga de uma escola até que a mudança tivesse apoio amplo e duradouro.'],
  A05: ['Mesmo desaprovando uma decisão privada de adultos, eu seria contra proibi-la se ela não causasse dano.', 'Eu poderia apoiar a proibição de uma decisão privada se ela contrariasse seriamente valores compartilhados.'],
  A06: ['Em uma votação, eu apoiaria um acesso legal mais amplo ao aborto.', 'Em uma votação, eu apoiaria limites legais mais rígidos ao aborto.'],
  A07: ['Durante distúrbios violentos, eu manteria limites legais rígidos ao poder da polícia.', 'Durante distúrbios violentos, eu daria mais poder à polícia por um período curto.'],
  A08: ['Se um tribunal barrasse uma política que eu apoio, eu continuaria defendendo a independência dele.', 'Se tribunais bloqueassem com frequência escolhas feitas pelos eleitores, eu poderia apoiar limites ao poder deles.'],
  A09: ['Eu cumpriria um acordo climático comum mesmo que ele limitasse algumas decisões do meu país.', 'Eu preservaria a liberdade de decisão do meu país mesmo que isso enfraquecesse um plano climático comum.'],
  A10: ['Para um emprego público, eu trataria da mesma forma dois cidadãos igualmente qualificados, independentemente de onde nasceram.', 'Para um emprego público, eu daria preferência ao cidadão nascido no país se os dois tivessem a mesma qualificação.'],
  A11: ['Eu desconfiaria de um candidato que culpa uma elite poderosa por quase todos os problemas.', 'Eu apoiaria um candidato que promete devolver ao povo comum o poder tomado por uma elite.'],
  A12: ['Eu aceitaria preços um pouco mais altos se um produto causasse dano ambiental grave.', 'Eu evitaria regras que elevassem preços e confiaria mais em tecnologia limpa para proteger o meio ambiente.'],
  A13: ['Eu rejeitaria políticos que justificassem leis para todos principalmente com base na própria religião.', 'Eu aceitaria que políticos justificassem leis para todos com base em valores religiosos.'],
  A14: ['Se as duas opções funcionassem, eu escolheria o poder público para garantir padrões semelhantes em todos os lugares.', 'Se as duas opções funcionassem, eu deixaria a tarefa com a comunidade local.'],
};

export function portugueseBrBeliefStatement(sourceItemId: string, polarity: BeliefPolarity) {
  const pair = ptBr[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const portugueseBrBeliefPairCount = Object.keys(ptBr).length;
