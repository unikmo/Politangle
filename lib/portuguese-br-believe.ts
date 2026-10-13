import type { BeliefPolarity } from './belief-statements';

export const PORTUGUESE_BR_BELIEVE_VERSION = 'pt-br-believe-2026.10-plain-v3' as const;

type Pair = readonly [string, string];

const ptBr: Record<string, Pair> = {
  T01: ["O Estado deve garantir que todos tenham acesso à escola e ao atendimento médico.", "Em serviços essenciais como a educação e a saúde, o Estado deve dar mais espaço a prestadores privados e à escolha pessoal."],
  T02: ["O Estado deve usar impostos e benefícios sociais para reduzir diferenças de renda muito grandes.", "O Estado deve aceitar grandes diferenças de renda em vez de tentar corrigi-las com impostos mais altos."],
  T03: ["Trabalhadores, cooperativas e o Estado devem ter participação maior na propriedade das grandes empresas.", "As grandes empresas devem pertencer principalmente a donos privados, com direitos trabalhistas protegidos por lei."],
  T04: ["As leis e regras públicas devem mudar com certa rapidez quando uma nova forma de pensar ou de viver ganha apoio amplo e duradouro.", "Leis consolidadas só devem mudar depois de um longo debate, mesmo que muita gente já apoie a reforma."],
  T05: ["Relações consensuais entre adultos devem ser permitidas mesmo quando outras pessoas as consideram imorais.", "A lei pode restringir certos comportamentos privados de adultos que consentiram, para defender valores morais compartilhados, mesmo sem dano direto a outras pessoas."],
  T06: ["O aborto deve, em geral, continuar legal, porque a pessoa grávida deve ter a decisão principal.", "O aborto deve ter limites legais mais rígidos para proteger a vida antes do nascimento."],
  T07: ["As liberdades só devem ser restringidas diante de um perigo concreto e grave.", "O governo pode restringir algumas liberdades antes de qualquer dano quando há risco real de distúrbios graves."],
  T08: ["Vencer uma eleição não deve acabar com os controles independentes sobre o poder, como os tribunais, a Constituição e os direitos da oposição.", "Um governo eleito deve poder executar seus planos mesmo quando tribunais independentes apresentam objeções."],
  T09: ["Os países devem aceitar regras internacionais obrigatórias quando um problema ultrapassa fronteiras.", "Cada país deve manter a palavra final sobre suas decisões, mesmo que isso torne a ação conjunta diante de problemas comuns menos eficaz."],
  T10: ["Quem se torna cidadão mais tarde pode pertencer à nação tão plenamente quanto quem é cidadão desde o nascimento.", "Ter cidadania desde o nascimento deveria ter mais peso no sentimento de pertencimento ao país."],
  T11: ["Conflitos políticos geralmente surgem porque grupos diferentes têm interesses legítimos distintos.", "As decisões políticas costumam dar influência demais a grupos bem relacionados e de menos a eleitores comuns."],
  T12: ["Quando proteger o meio ambiente e fazer a economia crescer entram claramente em conflito, proteger a natureza deve às vezes vir primeiro, mesmo que a economia cresça mais devagar.", "O crescimento econômico deve ter prioridade e a proteção ambiental deve limitá-lo o mínimo possível."],
  T13: ["O Estado não deve justificar leis que valem para todos apenas com crenças religiosas.", "Princípios morais religiosos podem ser razões legítimas para leis, mesmo que alguns cidadãos não compartilhem essa religião."],
  T14: ["O governo federal ou estadual deve assumir a responsabilidade por serviços importantes, como escolas e hospitais, quando essa for a melhor forma de garantir acesso e padrões iguais.", "Os municípios devem poder organizar suas escolas e hospitais quando conseguem fazer isso bem."],

  F01: ["Me preocupa quando pessoas ficam sem serviços essenciais porque o acesso depende demais do que elas podem pagar no setor privado.", "Me preocupa quando as pessoas têm poucas opções porque serviços essenciais ficam sob controle do Estado."],
  F02: ["Acho injustas as diferenças muito grandes de renda, mesmo que reduzi-las exija aumentar alguns impostos.", "Impostos altos me preocupam, mesmo quando o objetivo é reduzir diferenças de renda muito grandes."],
  F03: ["Acho justo que os trabalhadores ou o público tenham uma parte importante da propriedade das grandes empresas.", "Acho justo que investidores privados mantenham a maioria das ações, com direitos trabalhistas protegidos."],
  F04: ["Me incomoda quando leis antigas continuam valendo mesmo depois de amplo apoio a mudanças.", "Me incomoda quando regras antigas mudam antes de a maioria aceitar uma nova forma de pensar ou de viver."],
  F05: ["Me incomoda quando o governo restringe escolhas privadas de adultos que não prejudicam diretamente ninguém.", "Me incomoda quando as leis ignoram por completo valores morais compartilhados."],
  F06: ["Me preocupa quando uma pessoa grávida não pode decidir por si mesma sobre um aborto.", "Um acesso amplo ao aborto me preocupa, porque acredito que a vida antes do nascimento merece mais proteção."],
  F07: ["Em uma crise, me preocupa quando o governo usa mais poder do que o necessário.", "Me preocupa quando a polícia não tem poderes legais suficientes para proteger as pessoas numa crise grave."],
  F08: ["Me preocupa quando um governo pressiona juízes independentes por examinarem suas leis.", "Me preocupa quando tribunais independentes anulam repetidamente leis aprovadas por um parlamento eleito."],
  F09: ["Me incomoda quando problemas comuns continuam sem solução porque os países recusam acordos obrigatórios.", "Me preocupa quando tratados internacionais impõem decisões importantes ao meu país."],
  F10: ["Para mim, uma pessoa naturalizada pertence ao país tanto quanto alguém que tem a cidadania desde o nascimento.", "O fato de minha família viver há muito tempo no país pesa no meu sentimento de pertencer à nação."],
  F11: ["Quando a política me decepciona, costumo pensar que o motivo principal é que as escolhas são difíceis e cada grupo quer coisas diferentes.", "Quando a política me decepciona, suspeito que grupos influentes sejam mais ouvidos do que eleitores comuns."],
  F12: ["Me preocupa quando áreas naturais importantes são destruídas para aumentar o crescimento econômico.", "Me preocupa a perda de empregos e de padrão de vida quando limites ambientais reduzem muito o crescimento econômico."],
  F13: ["Me sinto desconfortável quando princípios morais religiosos são usados para justificar leis para pessoas que não compartilham essa fé.", "Me incomoda quando argumentos religiosos são excluídos de um debate apenas por serem religiosos."],
  F14: ["Me sinto mais seguro quando o Estado garante escolas e hospitais de qualidade semelhante em todo o país.", "Me sinto confiante quando autoridades locais competentes mantêm o controle, em vez de passar as decisões ao governo estadual ou nacional."],

  A01: ["Se um hospital da região estivesse prestes a fechar, eu apoiaria recursos públicos para mantê-lo aberto.", "Se um serviço local essencial, como um hospital, pudesse funcionar bem de qualquer jeito, eu preferiria um prestador privado a mais dinheiro público."],
  A02: ["Eu aceitaria um aumento moderado nos meus próprios impostos se isso reduzisse bastante diferenças de renda muito grandes.", "Eu votaria por impostos menores, mesmo que sobrasse menos dinheiro para famílias de baixa renda."],
  A03: ["Eu apoiaria trabalhadores que quisessem comprar uma parte de uma grande empresa.", "Se uma grande empresa estivesse indo bem, eu manteria a propriedade principalmente com acionistas privados, em vez de dar uma parte grande aos trabalhadores ou ao poder público."],
  A04: ["Se uma lei antiga já não combinasse com o que a maioria das pessoas aceita hoje, eu apoiaria mudá-la logo.", "Eu só mudaria leis sobre família depois de um apoio amplo e duradouro à mudança."],
  A05: ["Se adultos escolhessem livremente uma relação ou um estilo de vida que eu pessoalmente desaprovo, eu me oporia a uma proibição legal, a menos que isso prejudicasse diretamente alguém.", "Eu apoiaria limites legais a relações consensuais se contrariassem valores morais compartilhados."],
  A06: ["Em uma votação, eu apoiaria um acesso legal mais amplo ao aborto.", "Se a lei do aborto fosse decidida em votação, eu apoiaria limites legais mais rígidos."],
  A07: ["Durante distúrbios violentos, eu manteria limites legais rígidos ao poder da polícia.", "Durante distúrbios graves, eu permitiria poderes mais amplos e temporários ao governo, mesmo que algumas proteções legais fossem reduzidas."],
  A08: ["Se um tribunal independente anulasse uma lei que eu apoio, eu ainda assim respeitaria a decisão.", "Se tribunais anulassem repetidamente leis aprovadas por uma maioria parlamentar, eu apoiaria limitar algumas de suas atribuições."],
  A09: ["Eu cumpriria um acordo climático comum mesmo que ele limitasse algumas decisões do meu país.", "Eu manteria as decisões nas mãos do meu país, mesmo que isso tornasse menos eficaz uma resposta internacional conjunta."],
  A10: ["Eu apoiaria que pessoas que se tornaram cidadãs mais tarde possam ocupar os mesmos altos cargos eletivos que quem é cidadão desde o nascimento.", "Para alguns dos cargos políticos mais altos, eu daria preferência a cidadãos desde o nascimento."],
  A11: ["Prefiro candidatos que explicam abertamente os compromissos políticos, mesmo quando a mensagem agrada menos.", "Prefiro candidatos que prometam reduzir a influência de grupos bem relacionados e dar mais influência direta aos eleitores comuns."],
  A12: ["Eu apoiaria limites ambientais obrigatórios por lei, mesmo que desacelerassem um pouco o crescimento econômico.", "Eu evitaria regras que elevassem preços e confiaria mais em tecnologia limpa para proteger o meio ambiente."],
  A13: ["Eu rejeitaria leis para todos que fossem justificadas apenas por argumentos religiosos.", "Eu aceitaria que autoridades públicas apresentassem princípios morais religiosos como razão legítima para leis que valem para todos."],
  A14: ["Se serviços como as escolas tivessem qualidade muito diferente de uma região para outra, eu apoiaria padrões nacionais ou estaduais, mesmo que o controle local diminuísse.", "Se um município administrasse bem suas escolas, eu preferiria pouca interferência estadual ou nacional."],
};

export function portugueseBrBeliefStatement(sourceItemId: string, polarity: BeliefPolarity) {
  const pair = ptBr[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const portugueseBrBeliefPairCount = Object.keys(ptBr).length;
