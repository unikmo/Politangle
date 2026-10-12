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
  T08: ["Tribunais independentes devem poder verificar se as leis do governo respeitam a Constituição.", "Um governo eleito deve poder executar seus planos mesmo quando tribunais independentes apresentam objeções."],
  T09: ['Os países devem aceitar regras internacionais obrigatórias quando um problema ultrapassa fronteiras.', 'Cada país deve manter a palavra final, mesmo que isso enfraqueça soluções conjuntas.'],
  T10: ['Uma pessoa naturalizada pode pertencer ao país tanto quanto alguém que é cidadão desde o nascimento.', 'Ser cidadão desde o nascimento deve pesar mais para definir quem pertence plenamente ao país.'],
  T11: ["Conflitos políticos geralmente surgem porque grupos diferentes têm interesses legítimos distintos.", "Muitas vezes existe uma vontade comum do povo que uma elite política ignora de propósito."],
  T12: ['Proteger a natureza deve, às vezes, ter prioridade sobre o crescimento econômico.', 'O crescimento econômico deve ter prioridade e a proteção ambiental deve limitá-lo o mínimo possível.'],
  T13: ['A religião não deve ser usada para justificar leis que valem para pessoas de todas as religiões.', 'Valores religiosos podem justificar leis mesmo quando nem todas as pessoas compartilham daquela religião.'],
  T14: ["Governos estaduais ou nacionais devem definir padrões mínimos comuns para escolas e hospitais.", "Os municípios devem poder organizar suas escolas e hospitais quando conseguem fazer isso bem."],

  F01: ["Me preocupa quando alguém deixa de receber atendimento médico porque não consegue pagar.", "Me preocupa quando as pessoas têm poucas opções porque serviços essenciais ficam sob controle do Estado."],
  F02: ["Acho injustas as diferenças muito grandes de renda, mesmo que reduzi-las exija aumentar alguns impostos.", "Me preocupa quando os impostos aumentam muito para reduzir as diferenças de renda."],
  F03: ["Acho justo que trabalhadores tenham uma parte da propriedade das grandes empresas onde trabalham.", "Acho justo que investidores privados mantenham a maioria das ações, com direitos trabalhistas protegidos."],
  F04: ["Me incomoda quando leis antigas continuam valendo mesmo depois de amplo apoio a mudanças.", "Me preocupa quando leis consolidadas mudam enquanto muitas pessoas ainda rejeitam as novas regras."],
  F05: ["Me incomoda quando a lei proíbe escolhas privadas de adultos que não prejudicam ninguém.", "Me incomoda quando as leis ignoram por completo valores morais compartilhados."],
  F06: ["Me preocupa quando uma pessoa grávida não pode decidir por si mesma sobre um aborto.", "Me preocupa quando a lei não protege suficientemente a vida antes do nascimento."],
  F07: ["Me preocupa quando o Estado restringe com facilidade excessiva as liberdades durante uma crise.", "Me preocupa quando a polícia não tem poderes legais suficientes para proteger as pessoas numa crise grave."],
  F08: ["Me preocupa quando um governo pressiona juízes independentes por examinarem suas leis.", "Me preocupa quando tribunais independentes anulam leis aprovadas por uma maioria parlamentar eleita."],
  F09: ["Me frustra quando países deixam problemas comuns sem solução porque rejeitam acordos obrigatórios.", "Me preocupa quando tratados internacionais impõem decisões importantes ao meu país."],
  F10: ["Para mim, uma pessoa naturalizada pertence ao país tanto quanto alguém que tem a cidadania desde o nascimento.", "Para mim, ter a cidadania desde o nascimento faz diferença no sentimento de pertencimento ao país."],
  F11: ["Me incomoda quando um político diz que só seus apoiadores são o 'povo de verdade'.", "Muitas vezes sinto que uma elite política ignora de propósito a vontade comum do povo."],
  F12: ["Me preocupa quando áreas naturais importantes são destruídas para aumentar o crescimento econômico.", "Me preocupa quando regras ambientais rigorosas colocam empregos e renda em risco."],
  F13: ["Me incomoda quando políticos justificam leis para todos principalmente com base na própria religião.", "Me incomoda quando argumentos religiosos são excluídos de um debate apenas por serem religiosos."],
  F14: ["Me sinto mais seguro quando o Estado garante escolas e hospitais de qualidade semelhante em todo o país.", "Me sinto mais seguro quando os municípios decidem como organizar suas escolas e hospitais."],

  A01: ['Se uma clínica local corresse risco de fechar, eu apoiaria recursos públicos para mantê-la aberta a todos.', 'Se uma clínica local corresse risco de fechar, eu procuraria primeiro uma solução privada antes de colocar mais recursos públicos.'],
  A02: ['Eu pagaria um pouco mais de impostos se isso ajudasse famílias de renda muito baixa.', 'Eu escolheria impostos menores mesmo que sobrasse menos dinheiro para apoiar famílias de renda muito baixa.'],
  A03: ['Em uma grande empresa, eu daria aos trabalhadores uma participação na propriedade e voz em decisões importantes.', 'Em uma grande empresa, eu deixaria a propriedade e as decisões importantes principalmente nas mãos de investidores privados.'],
  A04: ['Se uma regra antiga de uma escola já não combinasse com a vida da maioria, eu a mudaria com relativa rapidez.', 'Eu manteria uma regra antiga de uma escola até que a mudança tivesse apoio amplo e duradouro.'],
  A05: ['Mesmo desaprovando uma decisão privada de adultos, eu seria contra proibi-la se ela não causasse dano.', 'Eu poderia apoiar a proibição de uma decisão privada se ela contrariasse seriamente valores compartilhados.'],
  A06: ['Em uma votação, eu apoiaria um acesso legal mais amplo ao aborto.', 'Em uma votação, eu apoiaria limites legais mais rígidos ao aborto.'],
  A07: ['Durante distúrbios violentos, eu manteria limites legais rígidos ao poder da polícia.', 'Durante distúrbios violentos, eu daria mais poder à polícia por um período curto.'],
  A08: ["Se um tribunal independente anulasse uma lei que eu apoio, eu respeitaria sua decisão.", "Se tribunais anulassem repetidamente leis aprovadas por uma maioria parlamentar, eu apoiaria limitar algumas de suas atribuições."],
  A09: ['Eu cumpriria um acordo climático comum mesmo que ele limitasse algumas decisões do meu país.', 'Eu preservaria a liberdade de decisão do meu país mesmo que isso enfraquecesse um plano climático comum.'],
  A10: ['Para um emprego público, eu trataria da mesma forma dois cidadãos igualmente qualificados, independentemente de onde nasceram.', 'Para um emprego público, eu daria preferência ao cidadão nascido no país se os dois tivessem a mesma qualificação.'],
  A11: ["Eu desconfiaria de um candidato que diz que só seus apoiadores representam o 'povo de verdade'.", "Eu apoiaria um candidato que diz ser o único capaz de impor a vontade do povo contra a elite."],
  A12: ['Eu aceitaria preços um pouco mais altos se um produto causasse dano ambiental grave.', 'Eu evitaria regras que elevassem preços e confiaria mais em tecnologia limpa para proteger o meio ambiente.'],
  A13: ['Eu rejeitaria políticos que justificassem leis para todos principalmente com base na própria religião.', 'Eu aceitaria que políticos justificassem leis para todos com base em valores religiosos.'],
  A14: ["Se a qualidade das escolas variasse muito, eu apoiaria padrões mínimos comuns definidos pelo governo estadual.", "Se um município administrasse bem suas escolas, eu preferiria pouca interferência estadual ou nacional."],
};

export function portugueseBrBeliefStatement(sourceItemId: string, polarity: BeliefPolarity) {
  const pair = ptBr[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const portugueseBrBeliefPairCount = Object.keys(ptBr).length;
