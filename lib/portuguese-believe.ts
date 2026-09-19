import type { BeliefPolarity } from './belief-statements';

export const PORTUGUESE_BR_BELIEVE_VERSION = 'pt-br-believe-2026.09-candidate-v1' as const;

type Pair = readonly [string, string];

const ptBr: Record<string, Pair> = {
  T01: ['O Estado deve garantir que todas as pessoas tenham acesso a serviços essenciais, como saúde e educação.', 'O Estado deve intervir menos e deixar mais espaço para opções privadas nos serviços essenciais.'],
  T02: ['O Estado deve usar impostos e benefícios para reduzir grandes diferenças entre ricos e pobres.', 'O Estado deve interferir menos nas diferenças de renda, mesmo que a distância entre ricos e pobres continue grande.'],
  T03: ['Trabalhadores, cooperativas ou o poder público deveriam ter participação maior na propriedade de grandes empresas.', 'Grandes empresas deveriam pertencer principalmente a proprietários privados, com leis que protejam os trabalhadores.'],
  T04: ['Regras sociais devem mudar quando uma nova forma de viver passa a ter apoio amplo.', 'Regras antigas só devem mudar quando a nova ideia tiver apoio amplo e duradouro.'],
  T05: ['Adultos devem poder tomar livremente decisões privadas que não prejudiquem outras pessoas.', 'Algumas decisões privadas podem ser limitadas para proteger valores morais compartilhados.'],
  T06: ['O aborto deve ser legal de forma ampla, porque a decisão principal deve caber à pessoa grávida.', 'O aborto deve ter limites legais mais rígidos para proteger a vida antes do nascimento.'],
  T07: ['O Estado só deve limitar liberdades diante de um perigo claro e grave.', 'O Estado pode limitar algumas liberdades antes quando houver risco real de desordem grave.'],
  T08: ['Mesmo um governo eleito deve ser limitado por tribunais, leis, oposição e imprensa livre.', 'Um governo eleito deve conseguir executar seu programa mesmo quando tribunais ou outras instituições o dificultem.'],
  T09: ['Países devem cumprir regras internacionais obrigatórias quando um problema afeta vários países.', 'Cada país deve ter a palavra final, mesmo que isso enfraqueça soluções comuns.'],
  T10: ['Uma pessoa naturalizada pode pertencer ao país tanto quanto alguém que é cidadão desde o nascimento.', 'Ter cidadania desde o nascimento deve contar mais para definir quem pertence plenamente ao país.'],
  T11: ['Na política, normalmente existem vários grupos com interesses reais e diferentes.', 'A política costuma ser uma disputa entre pessoas comuns e uma elite poderosa que as ignora.'],
  T12: ['Proteger a natureza às vezes deve ter prioridade sobre o crescimento econômico.', 'O crescimento econômico deve ter prioridade, e a proteção ambiental deve atrapalhá-lo o mínimo possível.'],
  T13: ['A religião não deve ser usada para justificar leis que valem para pessoas de qualquer religião.', 'Valores religiosos podem justificar leis mesmo quando nem todos compartilham aquela religião.'],
  T14: ['O governo nacional ou regional deve administrar serviços importantes quando isso garante o mesmo acesso para todos.', 'Tarefas importantes devem ser resolvidas o mais perto possível das pessoas e subir de nível apenas quando necessário.'],

  F01: ['Eu me preocupo mais quando algumas pessoas não conseguem pagar por serviços essenciais.', 'Eu me preocupo mais quando serviços públicos reduzem a liberdade de escolha e a independência.'],
  F02: ['Grandes diferenças de renda me preocupam mais do que os impostos usados para reduzi-las.', 'Impostos altos me preocupam mais do que grandes diferenças de renda.'],
  F03: ['Parece mais justo que trabalhadores ou entidades públicas tenham uma parcela maior da propriedade de grandes empresas.', 'Parece mais justo que investidores privados mantenham a maior parte da propriedade, com leis que protejam os trabalhadores.'],
  F04: ['Me incomoda mais quando regras públicas ficam para trás diante de uma mudança amplamente aceita.', 'Me incomoda mais quando regras antigas mudam antes que a nova ideia seja amplamente aceita.'],
  F05: ['Me incomoda mais quando o Estado limita escolhas privadas de adultos que não prejudicam ninguém.', 'Me incomoda mais quando valores morais compartilhados não têm nenhum peso nas leis.'],
  F06: ['No tema do aborto, me preocupa mais tirar a decisão da pessoa grávida.', 'No tema do aborto, me preocupa mais não proteger suficientemente a vida antes do nascimento.'],
  F07: ['Em uma crise, me preocupa mais o Estado usar poder demais.', 'Em uma crise, me preocupa mais as autoridades não terem poder suficiente para manter a segurança.'],
  F08: ['Me preocupa mais uma maioria eleita enfraquecer tribunais ou outros controles.', 'Me preocupa mais instituições não eleitas bloquearem repetidamente um governo eleito.'],
  F09: ['Me incomoda mais quando países deixam de resolver problemas comuns porque rejeitam acordos obrigatórios.', 'Me incomoda mais quando acordos internacionais limitam as decisões do meu país.'],
  F10: ['Pessoas naturalizadas me parecem tão parte do país quanto cidadãos desde o nascimento.', 'Cidadãos desde o nascimento me parecem ter um vínculo maior com o país do que pessoas naturalizadas.'],
  F11: ['Quando a política falha, penso primeiro em escolhas difíceis e interesses diferentes.', 'Quando a política falha, penso primeiro em uma elite poderosa que ignora as pessoas comuns.'],
  F12: ['Quando não dá para conseguir tudo, me preocupa mais o dano à natureza e ao clima.', 'Quando não dá para conseguir tudo, me preocupam mais emprego e padrão de vida.'],
  F13: ['Me incomoda mais quando valores religiosos determinam leis para toda a população.', 'Me incomoda mais quando uma opinião é rejeitada apenas por ter fundamento religioso.'],
  F14: ['Me sinto mais seguro quando o poder público garante os mesmos padrões em todo lugar.', 'Me sinto melhor quando famílias e comunidades conseguem resolver tarefas por conta própria.'],

  A01: ['Se uma clínica local corresse risco de fechar, eu apoiaria recursos públicos para mantê-la aberta a todos.', 'Se uma clínica local corresse risco de fechar, eu buscaria primeiro uma solução privada antes de aumentar o financiamento público.'],
  A02: ['Eu pagaria um pouco mais de imposto se isso ajudasse famílias de renda muito baixa.', 'Eu escolheria impostos menores mesmo que sobrasse menos dinheiro para ajudar famílias de renda muito baixa.'],
  A03: ['Em uma grande empresa, eu daria aos trabalhadores uma participação na propriedade e voz em decisões importantes.', 'Em uma grande empresa, eu deixaria a propriedade e as decisões importantes principalmente com investidores privados.'],
  A04: ['Se uma regra escolar antiga já não combinasse com a vida da maioria, eu a mudaria logo.', 'Eu manteria uma regra escolar antiga até que a mudança tivesse apoio amplo e duradouro.'],
  A05: ['Mesmo desaprovando uma decisão privada de adultos, eu seria contra proibi-la se ela não causasse dano a outras pessoas.', 'Eu poderia apoiar a proibição de uma decisão privada se ela contrariasse seriamente valores compartilhados.'],
  A06: ['Em uma votação, eu apoiaria acesso legal mais amplo ao aborto.', 'Em uma votação, eu apoiaria limites legais mais rígidos ao aborto.'],
  A07: ['Durante distúrbios violentos, eu manteria limites legais rígidos sobre o poder da polícia.', 'Durante distúrbios violentos, eu daria mais poderes à polícia por um período curto.'],
  A08: ['Se um tribunal barrasse uma política que eu apoio, eu continuaria defendendo a independência desse tribunal.', 'Se tribunais bloqueassem com frequência escolhas dos eleitores, eu poderia apoiar limites ao poder deles.'],
  A09: ['Eu cumpriria um acordo climático comum mesmo que ele limitasse algumas decisões do meu país.', 'Eu manteria a liberdade de decisão do meu país mesmo que isso enfraquecesse um plano climático comum.'],
  A10: ['Para um emprego público, eu trataria da mesma forma dois cidadãos igualmente qualificados, independentemente de onde nasceram.', 'Para um emprego público, eu daria preferência ao cidadão nascido no país se os dois fossem igualmente qualificados.'],
  A11: ['Eu desconfiaria de um candidato que culpa uma elite poderosa por quase todos os problemas.', 'Eu apoiaria um candidato que promete devolver às pessoas comuns o poder tomado por uma elite.'],
  A12: ['Eu aceitaria preços um pouco mais altos se um produto causasse grave dano ambiental.', 'Eu evitaria regras que aumentem preços e apostaria mais em tecnologia limpa para proteger o meio ambiente.'],
  A13: ['Eu rejeitaria que políticos justificassem leis para toda a população principalmente com a própria religião.', 'Eu aceitaria que políticos justificassem leis para toda a população com valores religiosos.'],
  A14: ['Se as duas opções funcionassem, eu escolheria o poder público para garantir o mesmo padrão em todo lugar.', 'Se as duas opções funcionassem, eu deixaria a tarefa com a comunidade local.'],
};

export function portugueseBeliefStatement(sourceItemId: string, polarity: BeliefPolarity) {
  const pair = ptBr[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const portugueseBeliefPairCount = Object.keys(ptBr).length;
